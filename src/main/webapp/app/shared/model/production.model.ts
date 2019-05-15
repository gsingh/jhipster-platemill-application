import { Moment } from 'moment';
import { IShiftManager } from 'app/shared/model/shift-manager.model';

export const enum Shift {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface IProduction {
  id?: number;
  prodDate?: Moment;
  shift?: Shift;
  noOfPlates?: number;
  prodTonnage?: number;
  manager?: IShiftManager;
}

export class Production implements IProduction {
  constructor(
    public id?: number,
    public prodDate?: Moment,
    public shift?: Shift,
    public noOfPlates?: number,
    public prodTonnage?: number,
    public manager?: IShiftManager
  ) {}
}
