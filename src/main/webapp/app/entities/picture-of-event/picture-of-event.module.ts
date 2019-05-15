import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PlatemillSharedModule } from 'app/shared';
import {
  PictureOfEventComponent,
  PictureOfEventDetailComponent,
  PictureOfEventUpdateComponent,
  PictureOfEventDeletePopupComponent,
  PictureOfEventDeleteDialogComponent,
  pictureOfEventRoute,
  pictureOfEventPopupRoute
} from './';

const ENTITY_STATES = [...pictureOfEventRoute, ...pictureOfEventPopupRoute];

@NgModule({
  imports: [PlatemillSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PictureOfEventComponent,
    PictureOfEventDetailComponent,
    PictureOfEventUpdateComponent,
    PictureOfEventDeleteDialogComponent,
    PictureOfEventDeletePopupComponent
  ],
  entryComponents: [
    PictureOfEventComponent,
    PictureOfEventUpdateComponent,
    PictureOfEventDeleteDialogComponent,
    PictureOfEventDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatemillPictureOfEventModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
