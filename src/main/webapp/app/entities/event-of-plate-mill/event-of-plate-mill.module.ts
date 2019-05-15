import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PlatemillSharedModule } from 'app/shared';
import {
  EventOfPlateMillComponent,
  EventOfPlateMillDetailComponent,
  EventOfPlateMillUpdateComponent,
  EventOfPlateMillDeletePopupComponent,
  EventOfPlateMillDeleteDialogComponent,
  eventOfPlateMillRoute,
  eventOfPlateMillPopupRoute
} from './';

const ENTITY_STATES = [...eventOfPlateMillRoute, ...eventOfPlateMillPopupRoute];

@NgModule({
  imports: [PlatemillSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EventOfPlateMillComponent,
    EventOfPlateMillDetailComponent,
    EventOfPlateMillUpdateComponent,
    EventOfPlateMillDeleteDialogComponent,
    EventOfPlateMillDeletePopupComponent
  ],
  entryComponents: [
    EventOfPlateMillComponent,
    EventOfPlateMillUpdateComponent,
    EventOfPlateMillDeleteDialogComponent,
    EventOfPlateMillDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatemillEventOfPlateMillModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
