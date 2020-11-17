import { Controller, Get, Param } from '@nestjs/common'
import { BreakdownService } from './breakdown.service'

const BASE = 'api'

@Controller(`/${BASE}/breakdown/`)
export class BreakdownController {
  constructor(private readonly breakdownService: BreakdownService) {}

  @Get('year/:lotCode')
  getYearBreakdown(@Param('lotCode') lotCode: string): object {
    return this.breakdownService.getYearBreakdown(lotCode)
  }

  @Get('variety/:lotCode')
  getVarietyBreakdown(@Param('lotCode') lotCode: string): object {
    return this.breakdownService.getVarietyBreakdown(lotCode)
  }

  @Get('region/:lotCode')
  getRegionBreakdown(@Param('lotCode') lotCode: string): object {
    return this.breakdownService.getRegionBreakdown(lotCode)
  }

  @Get('year-variety/:lotCode')
  getYearVarietyBreakdown(@Param('lotCode') lotCode: string): object {
    return this.breakdownService.getYearVarietyBreakdown(lotCode)
  }
}
