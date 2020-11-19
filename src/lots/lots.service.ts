import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs'
import { Lot } from './lot.interface'
import { SearchNode } from './searchNode.interface'

@Injectable()
export class LotsService {
  constructor() {
    this.loadDataToMemory()
  }

  lots = {}
  searchIndex: SearchNode[] = []

  loadDataToMemory(): void {
    const dir = 'data'
    fs.readdir(dir, (err, files) => {
      if (err) {
        throw err
      }
  
      files.forEach(fileName => {
        if(/.*.json/.test(fileName)) {
          try {
            const rawdata = fs.readFileSync(`${dir}/${fileName}`, 'utf8')
            const data = JSON.parse(rawdata) as Lot
            const lotCode = data.lotCode
            this.lots[lotCode] = data
            if (data.lotCode) {
              this.searchIndex.push({
                strToMatch: data.lotCode,
                type: 'lotCode',
                key: lotCode
              })
            }
            if (data.description) {
              this.searchIndex.push({
                strToMatch: data.description,
                type: 'description',
                key: lotCode
              })
            }
          } catch (err) {
            console.log(`Error loading file ${fileName}`)
          }
        }
      })
    })
  }

  loadData(lotCode: string): Lot {
    const data = this.lots[lotCode]
    if (data) {
      return data
    } else {
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `Cannot find Lot: ${lotCode}`,
        },
        HttpStatus.NOT_FOUND
      )
    }
  }

  getLot(lotCode: string): Lot {
    const lot = this.loadData(lotCode)
    return lot
  }

  searchLot({ query }: { query: string }): Lot[] {
    return this.searchIndex
      .filter((node) => {
        return node.strToMatch.includes(query)
      })
      .filter((node, index, self) => {
        // Make sure matches are unique
        // Ie. if a match is found in the description and lotCode, only add
        // the SearchNode once
        return self.findIndex((value) => value.key === node.key) === index
      })
      .map(match => this.getLot(match.key))
  }
}
