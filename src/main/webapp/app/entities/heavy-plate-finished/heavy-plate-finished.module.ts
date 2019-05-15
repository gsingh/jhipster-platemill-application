import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PlatemillSharedModule } from 'app/shared';
import {
  HeavyPlateFinishedComponent,
  HeavyPlateFinishedDetailComponent,
  HeavyPlateFinishedUpdateComponent,
  HeavyPlateFinishedDeletePopupComponent,
  HeavyPlateFinishedDeleteDialogComponent,
  heavyPlateFinishedRoute,
  heavyPlateFinishedPopupRoute
} from './';

const ENTITY_STATES = [...heavyPlateFinishedRoute, ...heavyPlateFinishedPopupRoute];

@NgModule({
  imports: [PlatemillSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    HeavyPlateFinishedComponent,
    HeavyPlateFinishedDetailComponent,
    HeavyPlateFinishedUpdateComponent,
    HeavyPlateFinishedDeleteDialogComponent,
    HeavyPlateFinishedDeletePopupComponent
  ],
  entryComponents: [
    HeavyPlateFinishedComponent,
    HeavyPlateFinishedUpdateComponent,
    HeavyPlateFinishedDeleteDialogComponent,
    HeavyPlateFinishedDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatemillHeavyPlateFinishedModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
