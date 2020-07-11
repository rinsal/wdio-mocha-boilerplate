describe('SAMPLE', () => {
  it('sample', () => {
    browser.url('http://google.com');
    browser.pause(1000);
    expect(browser.getTitle()).eq('Google');
  });
});