import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  addTicket(
    @Body('cityEventId') cityEventId: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    const newTicket = this.ticketsService.insertTicket(
      cityEventId,
      firstName,
      lastName,
    );
    return { ...newTicket };
  }

  @Get()
  getAllTickets() {
    return this.ticketsService.getTickets();
  }

  @Get(':eventId')
  getEventTickets(@Param('eventId') eventId: string) {
    return this.ticketsService.getTickets(eventId);
  }

  @Patch(':id')
  updateTicket(
    @Param('ticketId') ticketId: string,
    @Body('cityEventId') cityEventId: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('barcode') barcode: string,
  ) {
    this.ticketsService.updateTicket(
      ticketId,
      cityEventId,
      firstName,
      lastName,
      barcode,
    );
    return null;
  }

  @Delete(':id')
  removeTicket(@Param('id') ticketId: string) {
    this.ticketsService.deleteTicket(ticketId);
    //return null;
  }
}
