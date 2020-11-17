import { Test, TestingModule } from '@nestjs/testing';
import { BreakdownController } from './breakdown.controller';
import { BreakdownService } from './breakdown.service';

describe('BreakdownController', () => {
  let breakdownController: BreakdownController;

  beforeEach(async () => {
    const breakdownModule: TestingModule = await Test.createTestingModule({
      controllers: [BreakdownController],
      providers: [BreakdownService],
    }).compile();

    breakdownController = breakdownModule.get<BreakdownController>(BreakdownController);
  });

  describe('root', () => {
    it.skip('should return "Hello World!"', () => {
      expect(breakdownController.getHello()).toBe('Hello World!');
    });
  });
});
