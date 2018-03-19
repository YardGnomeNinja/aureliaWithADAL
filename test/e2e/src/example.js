// Protractor Cheat Sheet: https://gist.github.com/javierarques/0c4c817d6c77b0877fda

describe('App', () => {

  beforeEach(() => {
    browser.loadAndWaitForAureliaPage('http://localhost:9000/');
  });

  it('should show the home page', () => {
    const title = browser.getTitle();

    expect(title).toEqual('Aurelia');
  });
});