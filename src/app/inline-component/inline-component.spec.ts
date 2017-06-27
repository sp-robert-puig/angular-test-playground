import { async, TestBed, ComponentFixture } from '@angular/core/testing'
import { InlineComponent } from './inline-component.component'
import { DebugElement } from '@angular/core'

let comp: InlineComponent;
let fixture: ComponentFixture<InlineComponent>;
let debugEl: DebugElement;
describe('Inline Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [InlineComponent]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
    })
    it('has to load component', () => {
        expect(debugEl.componentInstance).toBeTruthy()
    })
    it('has to have a title', async(() => {
        fixture.detectChanges();
        expect(comp.title).toEqual('hello inline comp!', 'has comp.title');
        expect(debugEl.nativeElement.querySelector('h1').textContent).toContain('hello inline comp!');
        expect(comp).toEqual(debugEl.componentInstance)
        debugger;
    }))
})

