import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'production',
        loadChildren: './production/production.module#PlatemillProductionModule'
      },
      {
        path: 'event-of-plate-mill',
        loadChildren: './event-of-plate-mill/event-of-plate-mill.module#PlatemillEventOfPlateMillModule'
      },
      {
        path: 'picture-of-event',
        loadChildren: './picture-of-event/picture-of-event.module#PlatemillPictureOfEventModule'
      },
      {
        path: 'shift-manager',
        loadChildren: './shift-manager/shift-manager.module#PlatemillShiftManagerModule'
      },
      {
        path: 'heavy-plate-finished',
        loadChildren: './heavy-plate-finished/heavy-plate-finished.module#PlatemillHeavyPlateFinishedModule'
      },
      {
        path: 'normalising',
        loadChildren: './normalising/normalising.module#PlatemillNormalisingModule'
      },
      {
        path: 'shipping',
        loadChildren: './shipping/shipping.module#PlatemillShippingModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatemillEntityModule {}
