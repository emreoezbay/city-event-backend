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
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.ticketsService.insertTicket(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllTickets() {
    return this.ticketsService.getTickets();
  }

  @Get(':id')
  getTicket(@Param('id') prodId: string) {
    return this.ticketsService.getSingleTicket(prodId);
  }

  @Patch(':id')
  updateTicket(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.ticketsService.updateTicket(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  removeTicket(@Param('id') prodId: string) {
    this.ticketsService.deleteTicket(prodId);
    return null;
  }
}
