import { Injectable, NotFoundException } from '@nestjs/common';

import { Ticket } from './tickets.model';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [
    {
      id: '1',
      cityEventId: '1',
      firstName: 'Emre',
      lastName: 'Özbay',
      barcode: '12345678',
    },
    {
      id: '2',
      cityEventId: '1',
      firstName: 'Gamze',
      lastName: 'Özbay',
      barcode: '12345678',
    },
  ];

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

  getTickets(cityEventId?: string | undefined) {
    if (typeof cityEventId !== 'undefined') {
      return [...this.tickets.filter((t) => t.cityEventId === cityEventId)];
    } else {
      return [...this.tickets];
    }
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
