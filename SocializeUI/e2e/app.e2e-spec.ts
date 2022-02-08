import { SocializeUIPage } from './app.po';

describe('socialize-ui App', () => {
  let page: SocializeUIPage;

  beforeEach(() => {
    page = new SocializeUIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
