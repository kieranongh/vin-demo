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
      console.log('Load data from file')
      lot = this.loadData(lotCode)
    } else {
      console.log('Cache hit')
    }
    return lot
  }

  getYearBreakdown(lotCode: string): object {
    return this.getBreakdown(lotCode, 'year')
  }

  getVarietyBreakdown(lotCode: string): object {
    return this.getBreakdown(lotCode, 'variety')
  }

  getRegionBreakdown(lotCode: string): object {
    return this.getBreakdown(lotCode, 'region')
  }
  
  getYearVarietyBreakdown(lotCode: string): object {
    return
  }

  getBreakdown(lotCode: string, key: string): object {
    const lot = this.getLot(lotCode)
    const { components } = lot
    const binned = components.reduce((acc, curr) => {
      let prevPercentage = 0
      if (acc[curr[key]]) {
        prevPercentage = acc[curr[key]].percentage
      }

      acc[curr[key]] = {
        percentage: prevPercentage + curr.percentage
      }

      return acc
    }, {})

    const result = Object.entries(binned).map(([key, value]) => ({ key, percentage: value['percentage'] }))
    const sorted = result.sort((a, b) => b.percentage - a.percentage)
    
    return {
      breakdownType: key,
      breakdown: sorted
    }
  }
}
