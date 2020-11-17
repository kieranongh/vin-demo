import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common'
import { BreakdownService } from './breakdown.service'

const BASE = 'api'
const AVAILABLE_KEYS: Array<string> = [
  'year',
  'variety',
  'region',
  'year-variety'
]

@Controller(`/${BASE}/breakdown/`)
export class BreakdownController {
  constructor(private readonly breakdownService: BreakdownService) {}

  @Get(':keys/:lotCode')
  getYearBreakdown(
    @Param('lotCode') lotCode: string,
    @Param('keys') keys: string
  ): object {
    if (!AVAILABLE_KEYS.includes(keys)) {
      throw new HttpException({
        status: HttpStatus.NOT_IMPLEMENTED,
        error: `Breakdown not available for ${keys} yet`,
      }, HttpStatus.NOT_IMPLEMENTED)
    }
    return this.breakdownService.getYearBreakdownByKey(lotCode, keys)
  }
}
