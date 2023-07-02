describe('adaptive layout & static content', async function () {
  it('1920x1080, main page', async function ({ browser, currentTest }) {
    await browser.url('http://localhost:3000/hw/store');
    await browser.assertView('plain', 'body');
  });

  it('576x1080, contacts page', async function ({ browser, currentTest }) {
    await browser.setWindowSize(576, 1080);
    await browser.url('http://localhost:3000/hw/store/contacts');
    await browser.assertView('plain', 'body');
  });

  it('575x1080, delivery page, hamburger menu', async function ({
    browser,
    currentTest,
  }) {
    await browser.setWindowSize(575, 1080);
    await browser.url('http://localhost:3000/hw/store/');
    await browser.assertView('plain', 'body');
  });

  it('575x1080, delivery page, hamburger menu should collapse after click onto the menu element', async function ({
    browser,
    currentTest,
  }) {
    await browser.setWindowSize(575, 1080);
    await browser.url('http://localhost:3000/hw/store/delivery'); // ?bug_id=4
    await browser.$('button[aria-label="Toggle navigation"]').click();
    await browser.$('a[href="/hw/store/delivery"]').click();
    await browser.assertView('plain', 'body');
  });
});
