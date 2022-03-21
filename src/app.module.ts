import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityEventsModule } from './cityevents/cityevents.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [TicketsModule, CityEventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
