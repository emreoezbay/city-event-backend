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
    @Body('barcode') barcode: string,
  ) {
    const generatedId = this.ticketsService.insertTicket(
      cityEventId,
      firstName,
      lastName,
      barcode,
    );
    return { id: generatedId };
  }

  @Get()
  getAllTickets() {
    return this.ticketsService.getTickets();
  }

  @Get(':id')
  getTicket(@Param('id') cityeventId: string) {
    return this.ticketsService.getSingleTicket(cityeventId);
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
    return null;
  }
}
