import { test, expect } from '@playwright/test';

test('кнопка в карточке товара правильного размера', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog/0'); // ?bug_id=9

  const m = page.locator('.ProductDetails-AddToCart');
  await m.waitFor();
  const button = page.getByText('Add to Cart');

  await expect(button).toHaveClass([
    'ProductDetails-AddToCart btn btn-primary btn-lg',
  ]);
});

test('сообщение об успешном чекауте корректного стиля', async ({ page }) => {
  const cartItemsMock = {
    key: 'example-store-cart',
    data: { 3: { name: 'Horse cart', count: 3, price: 900 } },
  };

  await page.goto('http://localhost:3000/hw/store/');

  await page.evaluate((cartItemsMock) => {
    window.localStorage.setItem(
      cartItemsMock.key,
      JSON.stringify(cartItemsMock.data)
    );
  }, cartItemsMock);

  await page.goto('http://localhost:3000/hw/store/cart'); // ?bug_id=8 , свалится и на 10

  const m = page.locator('.Form');
  await m.waitFor();

  await page.locator('#f-name').type('q');
  await page.locator('#f-phone').type('1234567890');
  await page.locator('#f-address').type('q');

  await page.getByRole('button', { name: 'Checkout' }).click();

  const successMsg = page.locator('.Cart-SuccessMessage');
  await successMsg.waitFor();

  await expect(successMsg).toHaveClass([
    'Cart-SuccessMessage alert alert-success',
  ]);
});
