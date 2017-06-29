# Angular test

Test types
* Isolated:
  * No rendering
  * Same as JS
  * Mock all deps
  * Isolated unit tests in pipes and services.
  * Test drive your components and test complex logic

* Shallow:
  * Isolated test plus (ng-for, ng-if...)
  * Render template without childrens
  * Test requires to render a component’s template
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
  * 


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

> __async(() => fixture.whenStable().then() )__ *wait for async, wait for the promises to resolve in the next turn of the JavaScript engine*

> __fakeAsync(() => tick() )__ *wait for async, ... in a lineal way*

> __DebugElement.triggerEventHandler('click', payload)__ *can raise any data-bound event by its event name*


the inject function



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
