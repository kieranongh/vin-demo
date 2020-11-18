import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs'
import { Lot } from './lot.interface'

@Injectable()
export class LotsService {
  lots = {}

  loadData(lotCode: string): Lot {
    const fileName = `data/${lotCode}.json`
    try {
      const rawdata = fs.readFileSync(fileName, 'utf8')
      const data = JSON.parse(rawdata) as Lot
      this.lots[lotCode] = data
      return data
    }
    catch (err) {
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `Cannot find Lot: ${lotCode}`,
        },
        HttpStatus.NOT_FOUND
      )
    }
  }

  getLot(lotCode: string): Lot {
    let lot = this.lots[lotCode]
    if(!lot) {
      //
      console.log(`Load lotCode ${lotCode} from file`)
      lot = this.loadData(lotCode)
    } else {
      console.log(`Cache hit for lot ${lotCode}`)
    }
    return lot
  }

  searchLot(query: string): Lot {
    return
  }
}
