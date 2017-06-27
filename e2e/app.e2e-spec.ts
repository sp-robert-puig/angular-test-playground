import { AngularTestPlaygroundPage } from './app.po';

describe('angular-test-playground App', () => {
  let page: AngularTestPlaygroundPage;

  beforeEach(() => {
    page = new AngularTestPlaygroundPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
