import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PlatemillSharedModule } from 'app/shared';
import {
  NormalisingComponent,
  NormalisingDetailComponent,
  NormalisingUpdateComponent,
  NormalisingDeletePopupComponent,
  NormalisingDeleteDialogComponent,
  normalisingRoute,
  normalisingPopupRoute
} from './';

const ENTITY_STATES = [...normalisingRoute, ...normalisingPopupRoute];

@NgModule({
  imports: [PlatemillSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NormalisingComponent,
    NormalisingDetailComponent,
    NormalisingUpdateComponent,
    NormalisingDeleteDialogComponent,
    NormalisingDeletePopupComponent
  ],
  entryComponents: [NormalisingComponent, NormalisingUpdateComponent, NormalisingDeleteDialogComponent, NormalisingDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatemillNormalisingModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
