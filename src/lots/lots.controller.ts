import { Controller, Get, Query, Param } from '@nestjs/common'

import { LotsService } from './lots.service'
import { Lot } from './lot.interface'

const BASE = 'api'

@Controller(`/${BASE}/`)
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Get('search')
  search(@Query() query: { query: string }): Lot[] {
    return this.lotsService.searchLot(query)
  }
  
  @Get('lots/:lotCode')
  findOne(@Param('lotCode') lotCode: string): Lot {
    return this.lotsService.getLot(lotCode)
  }
}
