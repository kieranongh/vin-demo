import { Module } from '@nestjs/common';
import { BreakdownModule } from './breakdown/breakdown.module'
import { LotsModule } from './lots/lots.module';

@Module({
  imports: [BreakdownModule, LotsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
