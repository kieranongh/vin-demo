import { Module } from '@nestjs/common';
import { BreakdownModule } from './breakdown/breakdown.module'

@Module({
  imports: [BreakdownModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
