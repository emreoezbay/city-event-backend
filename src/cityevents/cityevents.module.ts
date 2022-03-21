import { Module } from '@nestjs/common';

import { CityEventsController } from './cityevents.controller';
import { CityEventService } from './cityevents.services';

@Module({
  controllers: [CityEventsController],
  providers: [CityEventService],
})
export class CityEventsModule {}
