import { Injectable } from '@nestjs/common';
import * as fs from 'fs'

import { LotsService } from '../lots/lots.service'
import { Lot } from '../lots/lot.interface'

@Injectable()
export class BreakdownService {
  constructor(private readonly lotsService: LotsService) {}
  
  getYearBreakdownByKey(lotCode: string, keys: string): object {
    const keySplit = keys.split('-')
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
    const lot: Lot = this.lotsService.getLot(lotCode)
    console.log(`lot => `, lot)
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
