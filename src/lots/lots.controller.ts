import { Controller, Get, Query, Param } from '@nestjs/common'

import { LotsService } from './lots.service'
import { Lot } from './lot.interface'

const BASE = 'api'

@Controller(`/${BASE}/lots/`)
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Get(':lotCode')
  findOne(@Param('lotCode') lotCode: string): Lot {
    return this.lotsService.getLot(lotCode)
  }

  @Get('search')
  search(@Query() query: string): Lot {
    return this.lotsService.searchLot(query)
  }
}
