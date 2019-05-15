import { Moment } from 'moment';
import { IShiftManager } from 'app/shared/model/shift-manager.model';

export const enum Shift {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface IHeavyPlateFinished {
  id?: number;
  hPFinishedDate?: Moment;
  shift?: Shift;
  noOfPlates?: number;
  hPFinishedTonnage?: number;
  manager?: IShiftManager;
}

export class HeavyPlateFinished implements IHeavyPlateFinished {
  constructor(
    public id?: number,
    public hPFinishedDate?: Moment,
    public shift?: Shift,
    public noOfPlates?: number,
    public hPFinishedTonnage?: number,
    public manager?: IShiftManager
  ) {}
}
