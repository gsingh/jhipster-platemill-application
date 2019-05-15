/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlatemillTestModule } from '../../../test.module';
import { ShiftManagerComponent } from 'app/entities/shift-manager/shift-manager.component';
import { ShiftManagerService } from 'app/entities/shift-manager/shift-manager.service';
import { ShiftManager } from 'app/shared/model/shift-manager.model';

describe('Component Tests', () => {
  describe('ShiftManager Management Component', () => {
    let comp: ShiftManagerComponent;
    let fixture: ComponentFixture<ShiftManagerComponent>;
    let service: ShiftManagerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [ShiftManagerComponent],
        providers: []
      })
        .overrideTemplate(ShiftManagerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShiftManagerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShiftManagerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ShiftManager(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shiftManagers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
