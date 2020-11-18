import { Module } from '@nestjs/common'
import { BreakdownController } from './breakdown.controller'
import { BreakdownService } from './breakdown.service'
import { LotsModule } from '../lots/lots.module'

@Module({
  imports: [LotsModule],
  controllers: [BreakdownController],
  providers: [BreakdownService],
})

export class BreakdownModule {}
