import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PlatemillSharedModule } from 'app/shared';
import {
  ProductionComponent,
  ProductionDetailComponent,
  ProductionUpdateComponent,
  ProductionDeletePopupComponent,
  ProductionDeleteDialogComponent,
  productionRoute,
  productionPopupRoute
} from './';

const ENTITY_STATES = [...productionRoute, ...productionPopupRoute];

@NgModule({
  imports: [PlatemillSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductionComponent,
    ProductionDetailComponent,
    ProductionUpdateComponent,
    ProductionDeleteDialogComponent,
    ProductionDeletePopupComponent
  ],
  entryComponents: [ProductionComponent, ProductionUpdateComponent, ProductionDeleteDialogComponent, ProductionDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatemillProductionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
