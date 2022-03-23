import { Injectable, NotFoundException } from '@nestjs/common';

import { CityEvent } from './cityevents.model';

@Injectable()
export class CityEventService {
  private cityevents: CityEvent[] = [
    {
      id: '1',
      eventTitle: 'Konzert in London',
      eventDate: new Date('03.05.2022 15:00'),
      eventCity: 'London',
    },
    {
      id: '2',
      eventTitle: 'Opera',
      eventDate: new Date('05.05.2022 12:00'),
      eventCity: 'Köln',
    },
  ];

  insertCityEvent(eventTitle: string, eventDate: Date, eventCity: string) {
    const eventId = Math.random().toString();
    const newCityEvent = new CityEvent(
      eventId,
      eventTitle,
      eventDate,
      eventCity,
    );
    this.cityevents.push(newCityEvent);
    return newCityEvent;
  }

  getCityEvents() {
    return [...this.cityevents];
  }

  getSingleCityEvent(cityeventId: string) {
    const cityevent = this.findCityEvent(cityeventId)[0];
    return { ...cityevent };
  }

  updateCityEvent(
    cityeventId: string,
    eventTitle: string,
    eventDate: Date,
    eventCity: string,
  ) {
    const [cityevent, index] = this.findCityEvent(cityeventId);
    const updatedCityEvent = { ...cityevent };
    if (eventTitle) {
      updatedCityEvent.eventTitle = eventTitle;
    }
    if (eventDate) {
      updatedCityEvent.eventDate = eventDate;
    }
    if (eventCity) {
      updatedCityEvent.eventCity = eventCity;
    }
    this.cityevents[index] = updatedCityEvent;
  }

  deleteCityEvent(eventId: string) {
    const index = this.findCityEvent(eventId)[1];
    this.cityevents.splice(index, 1);
  }

  private findCityEvent(id: string): [CityEvent, number] {
    const cityeventIndex = this.cityevents.findIndex(
      (cityevent) => cityevent.id === id,
    );
    const cityevent = this.cityevents[cityeventIndex];
    if (!cityevent) {
      throw new NotFoundException('Could not find cityevent.');
    }
    return [cityevent, cityeventIndex];
  }
}
