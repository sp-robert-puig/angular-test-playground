# Angular test

Test types
* Isolated:
  * No rendering
  * Same as JS, smaller and easier to read, write, and maintain
  * Mock all deps
  * Isolated unit tests in pipes and services.
  * Test drive your components and test complex logic
  * instances directly with new
  * Substitute test doubles (stubs, spys, and mocks) for the real dependencies

* Shallow:
  * Isolated test plus (ng-for, ng-if...)
  * Render template without childrens
  * Test requires to render a component’s template
  * Shallow component tests with NO_ERRORS_SCHEMA greatly simplify unit testing of complex templates. However, the compiler no longer alerts you to mistakes such as misspelled or misused components and directives.
  * mocked up every single dependency of a component
  * schemas: [NO_ERRORS_SCHEMA]
  * declarations: [CurrentComponent]

* Integration
  * Render Components
  * Check correctness
  * Only mock browser capabilities
  * Verify that a group of components and services (e.g., the router) work together
  * imports: [Modules]
  * TestBed.get(Router);

* Host
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



## TestBed

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
        
        it('#getTimeoutValue should return timeout value',  (done: DoneFn) => {
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




# Jasmine
### Spies
toHaveBeenCalled matcher will return true if the spy was called.

toHaveBeenCalledTimes matcher will pass if the spy was called the specified number of times.

toHaveBeenCalledWith matcher will return true if the argument list matches any of the recorded calls to the spy.

# Protractor
### Control browser
browser.get('yoururl'); // Load address, can also use '#yourpage'

browser.navigate().back();

browser.navigate().forward();

browser.sleep(10000); // if your test is outrunning the browser

browser.waitForAngular(); // if your test is outrunning the browser

browser.getLocationAbsUrl() // get the current address

browser.ignoreSynchronization = true; // If true, Protractor will not attempt to synchronize with the page before performing actions

   
Here's a trick how to wait for something to become present/visible:

browser.wait(function() {
   return element(by.id('create')).isPresent();
}, 5000);
   
element(by.id('create')).click();

### Check visibility

element(by.id('create')).isPresent() // Be careful with this: element is often present while it's not displayed...

element(by.id('create')).isEnabled() //Enabled/disabled, as in ng-disabled...

element(by.id('create')).isDisplayed() //Is element currently visible/displayed?

### Find an element by id, model, binding, ...

element(by.id('user_name'))

element(by.css('#myItem'))

element(by.model('person.name')) // refers to ng-model directive

element(by.binding('person.concatName')); // refers to ng-bind directive

element(by.textarea('person.extraDetails'));

element (by.input( 'username' ));

element (by.input( 'username' )).clear();

element(by.buttonText('Save'));

element(by.partialButtonText('Save'));

element(by.linkText('Save'));

element(by.partialLinkText('Save'));

element(by.css('[ng-click="cancel()"]')); 

var dog = element(by.cssContainingText('.pet', 'Dog'));

var allOptions = element.all(by.options('c c in colors')); //When ng-options is used with selectbox

### Find collection of elements by css, repeater, xpath..

var list = element.all(by.css('.items));

var list2 = element.all(by.repeater('personhome.results'));

var list3 = element.all(by.xpath('//div

expect(list.count()).toBe(3);

expect(list.get(0).getText()).toBe('First’)

expect(list.get(1).getText()).toBe('Second’)

expect(list.first().getText()).toBe('First’)

expect(list.last().getText()).toBe('Last’)

### Send keystrokes, clear

element(by.id('user_name').sendKeys("user1");

sendKeys(protractor.Key.ENTER);

sendKeys(protractor.Key.TAB);

element(by.id('user_name')).clear()

### Position and size, also how to deal with promises:

element(by.id('item1')).getLocation().then(function(location) {
  var x = location.x;
  var y = location.y;
});

element(by.id('item1')).getSize().then(function(size) {
  var width = size.width;
  var height = size.height;
});

### Jasmine Matchers

to(N­ot)­Be( null | true | false )
to(N­ot)­Equ­al( value )
to(N­ot)­Mat­ch( regex | string )
toBe­Def­ine­d()
toBe­Und­efi­ned()
toBe­Nul­l()
toBe­Tru­thy()
toBe­Fal­sy()
to(N­ot)­Con­tain( string )
toBe­Les­sTh­an( number )
toBe­Gre­ate­rTh­an( number )
toBe­NaN()
toBe­Clo­seTo( number, precision )
toTh­row()

# AngularTestPlayground

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
