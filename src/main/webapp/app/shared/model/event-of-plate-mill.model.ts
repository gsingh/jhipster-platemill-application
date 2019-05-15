import { Moment } from 'moment';
import { IPictureOfEvent } from 'app/shared/model/picture-of-event.model';

export interface IEventOfPlateMill {
  id?: number;
  eventDate?: Moment;
  eventName?: string;
  pictureOfEvents?: IPictureOfEvent[];
}

export class EventOfPlateMill implements IEventOfPlateMill {
  constructor(public id?: number, public eventDate?: Moment, public eventName?: string, public pictureOfEvents?: IPictureOfEvent[]) {}
}
