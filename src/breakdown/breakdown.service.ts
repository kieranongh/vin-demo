import { Injectable } from '@nestjs/common';
import * as fs from 'fs'

@Injectable()
export class BreakdownService {
  lots = {}

  loadData(lotCode: string): object {
    const fileName = `data/${lotCode}.json`
    try {
      const rawdata = fs.readFileSync(fileName, 'utf8')
      const data = JSON.parse(rawdata)
      this.lots[lotCode] = data
      return data
    }
    catch (error) {
      console.log(`data load error => `, error)
      return {}
    }
  }

  getLot(lotCode: string) {
    let lot = this.lots[lotCode]
    if(!lot) {
      //
      console.log('Load data from file')
      lot = this.loadData(lotCode)
    } else {
      console.log('Cache hit')
    }
    return lot
  }

  getYearBreakdownByKey(lotCode: string, keys: string): object {
    const keySplit = keys.split('-')
    console.log(`keySplit => `, keySplit)
    let key = keySplit[0], key2 = null
    if (keySplit.length > 1) {
      key2 = keySplit[1]
    }
    return this.getBreakdown(lotCode, key, key2)
  }

  getBreakdownKey(cmp: object, key: string, key2?: string): string {
    if (!key2) {
      return cmp[key]
    } else {
      return `${cmp[key]}-${cmp[key2]}`
    }
  }

  getBreakdown(lotCode: string, key: string, key2?: string): object {
    const lot = this.getLot(lotCode)
    const { components } = lot
    
    // sorts components by key and accumulates the percentages
    const binned = components.reduce((acc, curr) => {
      let prevPercentage = 0
      if (acc[this.getBreakdownKey(curr, key, key2)]) {
        prevPercentage = acc[this.getBreakdownKey(curr, key, key2)].percentage
      }

      acc[this.getBreakdownKey(curr, key, key2)] = {
        percentage: prevPercentage + curr.percentage
      }

      return acc
    }, {})

    const result = Object.entries(binned).map(([key, value]) => ({ key, percentage: value['percentage'] }))
    const sorted = result.sort((a, b) => b.percentage - a.percentage)

    return {
      breakdownType: key2 ? `${key}-${key2}` : key,
      breakdown: sorted
    }
  }
}
