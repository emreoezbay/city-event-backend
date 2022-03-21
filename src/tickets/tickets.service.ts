import { Injectable, NotFoundException } from '@nestjs/common';

import { Ticket } from './tickets.model';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];

  insertTicket(
    cityEventId: string,
    firstName: string,
    lastName: string,
    barcode: string,
  ) {
    const ticketId = Math.random().toString();
    const newTicket = new Ticket(
      ticketId,
      cityEventId,
      firstName,
      lastName,
      barcode,
    );
    this.tickets.push(newTicket);
    return ticketId;
  }

  getTickets() {
    return [...this.tickets];
  }

  getSingleTicket(ticketId: string) {
    const ticket = this.findTicket(ticketId)[0];
    return { ...ticket };
  }

  updateTicket(
    ticketId: string,
    cityEventId: string,
    firstName: string,
    lastName: string,
    barcode: string,
  ) {
    const [ticket, index] = this.findTicket(ticketId);
    const updatedTicket = { ...ticket };
    if (cityEventId) {
      updatedTicket.cityEventId = cityEventId;
    }
    if (firstName) {
      updatedTicket.firstName = firstName;
    }
    if (lastName) {
      updatedTicket.lastName = lastName;
    }
    if (barcode) {
      updatedTicket.barcode = barcode;
    }
    this.tickets[index] = updatedTicket;
  }

  deleteTicket(ticketId: string) {
    const index = this.findTicket(ticketId)[1];
    this.tickets.splice(index, 1);
  }

  private findTicket(id: string): [Ticket, number] {
    const ticketIndex = this.tickets.findIndex((ticket) => ticket.id === id);
    const ticket = this.tickets[ticketIndex];
    if (!ticket) {
      throw new NotFoundException('Could not find ticket.');
    }
    return [ticket, ticketIndex];
  }
}
