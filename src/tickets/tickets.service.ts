import { Injectable, NotFoundException } from '@nestjs/common';

import { Ticket } from './tickets.model';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];

  insertTicket(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newTicket = new Ticket(prodId, title, desc, price);
    this.tickets.push(newTicket);
    return prodId;
  }

  getTickets() {
    return [...this.tickets];
  }

  getSingleTicket(ticketId: string) {
    const ticket = this.findTicket(ticketId)[0];
    return { ...ticket };
  }

  updateTicket(ticketId: string, title: string, desc: string, price: number) {
    const [ticket, index] = this.findTicket(ticketId);
    const updatedTicket = { ...ticket };
    if (title) {
      updatedTicket.title = title;
    }
    if (desc) {
      updatedTicket.description = desc;
    }
    if (price) {
      updatedTicket.price = price;
    }
    this.tickets[index] = updatedTicket;
  }

  deleteTicket(prodId: string) {
    const index = this.findTicket(prodId)[1];
    this.tickets.splice(index, 1);
  }

  private findTicket(id: string): [Ticket, number] {
    const ticketIndex = this.tickets.findIndex((prod) => prod.id === id);
    const ticket = this.tickets[ticketIndex];
    if (!ticket) {
      throw new NotFoundException('Could not find ticket.');
    }
    return [ticket, ticketIndex];
  }
}
