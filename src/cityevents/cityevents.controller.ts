import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { CityEventService } from './cityevents.services';

@Controller('cityevents')
export class CityEventsController {
  constructor(private readonly cityeventsService: CityEventService) {}

  @Post()
  addCityEvent(
    @Body('eventTitle') eventTitle: string,
    @Body('eventDate') eventDate: Date,
    @Body('eventCity') eventCity: string,
  ) {
    const newCityEvent = this.cityeventsService.insertCityEvent(
      eventTitle,
      eventDate,
      eventCity,
    );
    return newCityEvent;
  }

  @Get()
  getAllCityEvents() {
    return this.cityeventsService.getCityEvents();
  }

  @Get(':id')
  getCityEvent(@Param('id') eventId: string) {
    return this.cityeventsService.getSingleCityEvent(eventId);
  }

  @Patch(':id')
  updateCityEvent(
    @Param('id') eventId: string,
    @Body('eventTitle') eventTitle: string,
    @Body('eventDate') eventDate: Date,
    @Body('eventCity') eventCity: string,
  ) {
    this.cityeventsService.updateCityEvent(
      eventId,
      eventTitle,
      eventDate,
      eventCity,
    );
    return null;
  }

  @Delete(':id')
  removeCityEvent(@Param('id') eventId: string) {
    this.cityeventsService.deleteCityEvent(eventId);
    return null;
  }
}
