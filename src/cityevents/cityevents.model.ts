import { Ticket } from 'src/tickets/tickets.model';

export class CityEvent {
  constructor(
    public id: string,
    public evetTitle: string,
    public eventDate: Date,
    public eventCity: string,
    public tickets: Ticket[],
  ) {}
}
