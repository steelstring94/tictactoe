import { TictactoePage } from './app.po';

describe('tictactoe App', () => {
  let page: TictactoePage;

  beforeEach(() => {
    page = new TictactoePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
