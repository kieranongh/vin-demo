import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BreakdownModule } from './breakdown/breakdown.module'

@Module({
  imports: [BreakdownModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
