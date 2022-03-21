import { Injectable, NotFoundException } from '@nestjs/common';

import { CityEvent } from './cityevents.model';

@Injectable()
export class CityEventService {
  private cityevents: CityEvent[] = [];

  insertCityEvent(evetTitle: string, eventDate: Date, eventCity: string) {
    const eventId = Math.random().toString();
    const newCityEvent = new CityEvent(
      eventId,
      evetTitle,
      eventDate,
      eventCity,
    );
    this.cityevents.push(newCityEvent);
    return eventId;
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
    evetTitle: string,
    eventDate: Date,
    eventCity: string,
  ) {
    const [cityevent, index] = this.findCityEvent(cityeventId);
    const updatedCityEvent = { ...cityevent };
    if (evetTitle) {
      updatedCityEvent.evetTitle = evetTitle;
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
    const cityeventIndex = this.cityevents.findIndex((prod) => prod.id === id);
    const cityevent = this.cityevents[cityeventIndex];
    if (!cityevent) {
      throw new NotFoundException('Could not find cityevent.');
    }
    return [cityevent, cityeventIndex];
  }
}
