[Types](#types) - [Methodolgies](#methodolgies) - [Angular Test Methods](#angular) - [Angular Test](#angular) - [Jasmine](#jasmine) - [Protractor](#protractor)

# <a name="types"></a>Test Types
Unit tests
* Focuses on a single “unit of code” – usually a function in an object or module.
* Test should be simple, quick to write, and quick to run, and isolate failures.
* Isolated from dependencies
* Functional tests of methods or functions. ex. get X input expect X output
* Giving X state should perform like X

Integration tests
* Verify the communication and the data flow between the modules are working properly or not
* Multiple pieces are tested together
* Help with wiring bugs, environment bugs
* Failures are harder to diagnose and the tests are harder to maintain

E2E tests / Acceptance Tests
* End to end tests can be written quickly without any knowledge of the codebase.
* Verify that a system meets external requirements and achieves its goals
* You shouldn’t try to make very fine grained functional tests, just testing common user interactions.
* Can easily become a nightmare to maintain.


Google often suggests a 70/20/10 split: 70% unit tests, 20% integration tests, and 10% end-to-end tests. The exact mix will be different for each team, but in general, it should retain that pyramid shape.

![test pyramid + UI](https://image.slidesharecdn.com/unitvsintegrationtests-150619070518-lva1-app6892/95/unit-vs-integration-tests-15-638.jpg?cb=1434697676)
![isolated vs integrated](https://image.slidesharecdn.com/unitvsintegrationtests-150619070518-lva1-app6892/95/unit-vs-integration-tests-5-638.jpg?cb=1434697676)

[Types](#types) - [Methodolgies](#methodolgies) - [Angular Test Methods](#angular) - [Angular Test](#angular) - [Jasmine](#jasmine) - [Protractor](#protractor)
# <a name="methodolgies"></a>Tests methodologies
TDD
* Start by writing a test
* Run the test and any other tests. At this point, your newly added test should fail. If it doesn’t fail here, it might not be testing the right thing and thus has a bug in it.
* Write the minimum amount of code required to make the test pass
* Run the tests to check the new test passes
* Optionally refactor your code
* Repeat from 1

BDD
* Set of best practices for writing great tests
* BDD can, and should be, used together with TDD and unit testing methods
* You should not test implementation, but instead behavior. 
* Instead of thinking of how the code is implemented, we spend a moment thinking of what the scenario is.

[Types](#types) - [Methodolgies](#methodolgies) - [Angular Test Methods](#angular) - [Angular Test](#angular) - [Jasmine](#jasmine) - [Protractor](#protractor)
# <a name="angular-tests"></a>Angular Test Methods
* Isolated:
  * No template, class only
  * Same as JS, smaller and easier to read, write, and maintain
  * Mock all deps
  * Best for pipes and services, but appropriate for components and directives too
  * Test drive your components and test complex logic
  * instances directly with new
  * Substitute test doubles (stubs, spys, and mocks) for the real dependencies

* Integrated Shallow:
  * Test component class and template only. (ng-for, ng-if...)
  * Render template without childrens. Mock or ignore related components and directives
  * Greatly simplify unit testing of complex templates. However, the compiler no longer alerts you to mistakes such as misspelled or misused components and directives.
  * Mock every single dependency of a component
  * schemas: [NO_ERRORS_SCHEMA] declarations: [CurrentComponent] | or | Fake all referenced components

* Integrated Deep
  * Test a component and all of its nested components, directives
  * Gives a better idea of how your app will actually run
  * Can be big and complicated and therefore break easily
  * Integration tests are only used to check the correctness.
  * Only mock browser capabilities
  * Verify that a group of components and services (e.g., the router) work together
  * imports: [Modules]

* Host (childs)
  * Test a component inside a test host component
  * Declares both the DashboardHeroComponent and the TestHostComponent
  * Creates the TestHostComponent instead of the DashboardHeroComponent

        beforeEach( async(() => {
          TestBed.configureTestingModule({
            declarations: [ DashboardHeroComponent, TestHostComponent ], // declare both
          }).compileComponents();
        }));

        beforeEach(() => {
          // create TestHostComponent instead of DashboardHeroComponent
          fixture  = TestBed.createComponent(TestHostComponent);
          testHost = fixture.componentInstance;
          heroEl   = fixture.debugElement.query(By.css('.hero')); // find hero
          fixture.detectChanges(); // trigger initial data binding
        });

[How to ...](https://vsavkin.com/three-ways-to-test-angular-2-components-dcea8e90bd8d)

[Types](#types) - [Methodolgies](#methodolgies) - [Angular Test Methods](#angular) - [Angular Test](#angular) - [Jasmine](#jasmine) - [Protractor](#protractor)
# <a name="angular"></a>Angular Tests

> __configureTestingModule__ *config ngModule declarations*

> __compileComponents()__ *compile template and css*

> __createComponent__ *Create instance of component, return <ComponentFixture>. Do not re-configure TestBed after calling createComponent.*

        debugElement: DebugElement
        componentInstance: T
        nativeElement: any
        elementRef: ElementRef
        changeDetectorRef: ChangeDetectorRef
        detectChanges(checkNoChanges?: boolean): void
        checkNoChanges(): void
        autoDetectChanges(autoDetect?: boolean)
        isStable(): boolean
        whenStable(): Promise<any>
        whenRenderingDone(): Promise<any>
        destroy(): void

> __fixture.detectChanges()__ *angular change detection*

> __fixture.autoDetectChanges()__ *angular auto detect changes*

        providers: [
          { provide: ComponentFixtureAutoDetect, useValue: true }
        ]

> __fixture.debugElement.injector.get(ComponentService)__ *get injected services in component*

> __TestBed.get(RootInjectorService)__ *get Root injector!*

> __inject__ *inject function has two parameters: An array of Angular dependency injection tokens. A test function whose parameters correspond exactly to each item in the injection token array. Do not configure the TestBed after calling inject.*

> __async(() => fixture.whenStable().then() )__ *wait for async, wait for the promises to resolve in the next turn of the JavaScript engine. Promise resolves when all pending asynchronous activities within this test complete*

> __fakeAsync(() => tick() )__ *wait for async, ... in a lineal way*

> __done()__ *jasmine async way*
        
        it('getTimeoutValue should return timeout value',  (done: DoneFn) => {
          service = new FancyService();
          service.getTimeoutValue().then(value => {
            expect(value).toBe('timeout value');
            done();
          });
        });

> __DebugElement.triggerEventHandler('click', payload)__ *can raise any data-bound event by its event name*

        // Click Helper
        /** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
        export const ButtonClickEvents = {
          left:  { button: 0 },
          right: { button: 2 }
        };

        /** Simulate element click. Defaults to mouse left-button click event. */
        export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
          if (el instanceof HTMLElement) {
            el.click();
          } else {
            el.triggerEventHandler('click', eventObj);
          }
        }

> __TestBed.overrideComponent()__ *can replace the component's providers with easy-to-manage test doubles*

        beforeEach( async(() => {
          TestBed.configureTestingModule({
            imports:   [ HeroModule ],
            providers: [
              { provide: ActivatedRoute, useValue: activatedRoute },
              { provide: Router,         useClass: RouterStub},
            ]
          })
          // Override component's own provider
          .overrideComponent(HeroDetailComponent, {
            set: {
              providers: [
                { provide: HeroDetailService, useClass: HeroDetailServiceSpy }
              ]
            }
          })
          .compileComponents();


### Test a dependency | Spy vs Fake service
* providers:    [ {provide: UserService, useValue: userServiceStub } ]
* userService = TestBed.get(UserService);
* Faking a service instance and spying on the real service are both great options.
* You can stub and spy at the same time.
* spy = spyOn(UserService, 'method').and.returnValue(Promise.resolve(mockMethod));
* 

### Test Router
* care only if the component navigates with the right address under the given conditions
* mock ActivatedRoute params and snapshot.params

### Page Class
* Page class that simplifies access to component properties and encapsulates the logic that sets them.
* important hooks for component manipulation and inspection are neatly organized and accessible from an instance of Page.

        class Page {
          gotoSpy:      jasmine.Spy;
          saveBtn:      DebugElement;
          constructor() {
            const router = TestBed.get(Router); // get router from root injector
            this.gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
            this.navSpy  = spyOn(router, 'navigate');
          }
          methods...
        }
        fixture = TestBed.createComponent(HeroDetailComponent);
        comp    = fixture.componentInstance;
        page    = new Page();

### Complex Components
* complex components often depend on other components, directives, pipes, and providers and these must be added to the testing module too.
* Create a SharedModule with commpon directives, pipes, providers (imports:[ SharedModule ])
* Or even better, import parent module that includes Shared Module, and just need to pass mocked providers

[Types](#types) - [Methodolgies](#methodolgies) - [Angular Test Methods](#angular) - [Angular Test](#angular) - [Jasmine](#jasmine) - [Protractor](#protractor)
# <a name="jasmine"></a>Jasmine
### Jasmine Matchers
> __to(N­ot)­Be( null | true | false )__

> __to(N­ot)­Equ­al( value )__

> __to(N­ot)­Mat­ch( regex | string )__

> __toBe­Def­ine­d()__

> __toBe­Und­efi­ned()__

> __toBe­Nul­l()__

> __toBe­Tru­thy()__

> __toBe­Fal­sy()__

> __to(N­ot)­Con­tain( string )__

> __toBe­Les­sTh­an( number )__

> __toBe­Gre­ate­rTh­an( number )__

> __toBe­NaN()__

> __toBe­Clo­seTo( number, precision )__

> __toTh­row()__

### Spies
> __toHaveBeenCalled()__ *matcher will return true if the spy was called.*

> __toHaveBeenCalledTimes()__ *matcher will pass if the spy was called the specified number of times.*

> __toHaveBeenCalledWith()__ *matcher will return true if the argument list matches any of the recorded calls to the spy.*

[Types](#types) - [Methodolgies](#methodolgies) - [Angular Test Methods](#angular) - [Angular Test](#angular) - [Jasmine](#jasmine) - [Protractor](#protractor)
# <a name="protractor"></a>Protractor
### Control browser
> __browser.get('yoururl')__ *Load address, can also use '#yourpage'*

> __browser.navigate().back()__

> __browser.navigate().forward()__

> __browser.sleep(10000)__ *if your test is outrunning the browser*

> __browser.waitForAngular()__ *if your test is outrunning the browser*

> __browser.getLocationAbsUrl()__ *get the current address*

> __browser.ignoreSynchronization = true__ *If true, Protractor will not attempt to synchronize with the page before performing actions*
 
> __browser.wait(function() {
   return element(by.id('create')).isPresent();
}, 5000)
element(by.id('create')).click()__ *Here's a trick how to wait for something to become present/visible*

### Check visibility
> __element(by.id('create')).isPresent()__ *Be careful with this: element is often present while it's not displayed...*

> __element(by.id('create')).isEnabled()__ *Enabled/disabled, as in ng-disabled...*

> __element(by.id('create')).isDisplayed()__ *Is element currently visible/displayed?*

### Find an element by id, model, binding, ...
> __element(by.id('user_name'))__

> __element(by.css('#myItem'))__

> __element(by.model('person.name'))__ *refers to ng-model directive*

> __element(by.binding('person.concatName'))__ *refers to ng-bind directive*

> __element(by.textarea('person.extraDetails'))__

> __element (by.input( 'username' ))__

> __element (by.input( 'username' )).clear()__

> __element(by.buttonText('Save'))__

> __element(by.partialButtonText('Save'))__

> __element(by.linkText('Save'))__

> __element(by.partialLinkText('Save'))__

> __element(by.css('[ng-click="cancel()"]'))__

> __var dog = element(by.cssContainingText('.pet', 'Dog'))__

> __var allOptions = element.all(by.options('c c in colors'))__ *When ng-options is used with selectbox*

### Find collection of elements by css, repeater, xpath..
> __var list = element.all(by.css('.items))__

> __var list2 = element.all(by.repeater('personhome.results'))__

> __var list3 = element.all(by.xpath('//div__

> __expect(list.count()).toBe(3)__

> __expect(list.get(0).getText()).toBe('First’)__

> __expect(list.get(1).getText()).toBe('Second’)__

> __expect(list.first().getText()).toBe('First’)__

> __expect(list.last().getText()).toBe('Last’)__

### Send keystrokes, clear
> __element(by.id('user_name').sendKeys("user1")__

> __sendKeys(protractor.Key.ENTER)__

> __sendKeys(protractor.Key.TAB)__

> __element(by.id('user_name')).clear()__

### Position and size, also how to deal with promises:
> __element(by.id('item1')).getLocation().then(function(location) {
  var x = location.x;
  var y = location.y;
})__

> __element(by.id('item1')).getSize().then(function(size) {
  var width = size.width;
  var height = size.height;
})__

[Types](#types) - [Methodolgies](#methodolgies) - [Angular Test Methods](#angular) - [Angular Test](#angular) - [Jasmine](#jasmine) - [Protractor](#protractor)
