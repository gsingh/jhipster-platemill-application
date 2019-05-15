import { Moment } from 'moment';
import { IShiftManager } from 'app/shared/model/shift-manager.model';

export const enum Shift {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface INormalising {
  id?: number;
  normalisingDate?: Moment;
  shift?: Shift;
  noOfPlates?: number;
  normalisedTonnage?: number;
  manager?: IShiftManager;
}

export class Normalising implements INormalising {
  constructor(
    public id?: number,
    public normalisingDate?: Moment,
    public shift?: Shift,
    public noOfPlates?: number,
    public normalisedTonnage?: number,
    public manager?: IShiftManager
  ) {}
}
