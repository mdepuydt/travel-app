import { TravelPage } from './app.po';

describe('travel App', () => {
  let page: TravelPage;

  beforeEach(() => {
    page = new TravelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
