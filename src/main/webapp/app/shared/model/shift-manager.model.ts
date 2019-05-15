import { IProduction } from 'app/shared/model/production.model';
import { IHeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';
import { INormalising } from 'app/shared/model/normalising.model';
import { IShipping } from 'app/shared/model/shipping.model';

export interface IShiftManager {
  id?: number;
  name?: string;
  designation?: string;
  mobileNumber?: string;
  prods?: IProduction[];
  hpFinishes?: IHeavyPlateFinished[];
  normaliseds?: INormalising[];
  shippings?: IShipping[];
}

export class ShiftManager implements IShiftManager {
  constructor(
    public id?: number,
    public name?: string,
    public designation?: string,
    public mobileNumber?: string,
    public prods?: IProduction[],
    public hpFinishes?: IHeavyPlateFinished[],
    public normaliseds?: INormalising[],
    public shippings?: IShipping[]
  ) {}
}
