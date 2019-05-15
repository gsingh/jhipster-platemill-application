import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PlatemillSharedModule } from 'app/shared';
import {
  ShiftManagerComponent,
  ShiftManagerDetailComponent,
  ShiftManagerUpdateComponent,
  ShiftManagerDeletePopupComponent,
  ShiftManagerDeleteDialogComponent,
  shiftManagerRoute,
  shiftManagerPopupRoute
} from './';

const ENTITY_STATES = [...shiftManagerRoute, ...shiftManagerPopupRoute];

@NgModule({
  imports: [PlatemillSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ShiftManagerComponent,
    ShiftManagerDetailComponent,
    ShiftManagerUpdateComponent,
    ShiftManagerDeleteDialogComponent,
    ShiftManagerDeletePopupComponent
  ],
  entryComponents: [
    ShiftManagerComponent,
    ShiftManagerUpdateComponent,
    ShiftManagerDeleteDialogComponent,
    ShiftManagerDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatemillShiftManagerModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
