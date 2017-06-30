import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularTestComponent } from './angular-test.component';

describe('AngularTestComponent', () => {
    let comp: AngularTestComponent;
    let fixture: ComponentFixture<AngularTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AngularTestComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent(AngularTestComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

});
