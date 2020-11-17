import { Module } from '@nestjs/common'
import { BreakdownController } from './breakdown.controller'
import { BreakdownService } from './breakdown.service'

@Module({
  imports: [],
  controllers: [BreakdownController],
  providers: [BreakdownService],
})
export class BreakdownModule {}
