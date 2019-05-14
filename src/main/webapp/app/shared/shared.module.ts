import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlatemillSharedLibsModule, PlatemillSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [PlatemillSharedLibsModule, PlatemillSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [PlatemillSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatemillSharedModule {
  static forRoot() {
    return {
      ngModule: PlatemillSharedModule
    };
  }
}
