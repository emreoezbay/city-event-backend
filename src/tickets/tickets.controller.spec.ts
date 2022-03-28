import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

describe('TicketsController', () => {
  let ticketController: TicketsController;
  let ticketService: TicketsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [TicketsService],
    }).compile();

    ticketController = app.get<TicketsController>(TicketsController);
    ticketService = app.get<TicketsService>(TicketsService);
  });

  describe('getAllTickets', () => {
    it('should return an array of tickest', async () => {
      const result = [];
      jest.spyOn(ticketService, 'getTickets').mockImplementation(() => result);

      expect(await ticketController.getAllTickets()).toBe(result);
    });
  });
});
