import { Moment } from 'moment';
import { IEventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';

export interface IPictureOfEvent {
  id?: number;
  picDate?: Moment;
  imgFileContentType?: string;
  imgFile?: any;
  eventPM?: IEventOfPlateMill;
}

export class PictureOfEvent implements IPictureOfEvent {
  constructor(
    public id?: number,
    public picDate?: Moment,
    public imgFileContentType?: string,
    public imgFile?: any,
    public eventPM?: IEventOfPlateMill
  ) {}
}
