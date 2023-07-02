import React, { useCallback } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppMock } from '../helpers';
import { CheckoutFormData } from '../../src/common/types';
import { checkout } from '../../src/client/store';

describe('корзина и заказ', () => {
  it('в корзину добавляется товар', async () => {
    const id = 1;
    const helper = new AppMock('/hw/store', [`/catalog/${id}`]);

    const user = userEvent.setup();
    await waitFor(() => {
      expect(helper.rendered.getByText('Add to Cart')).toBeTruthy();
    });

    const button = helper.rendered.getByText('Add to Cart') as HTMLButtonElement;
    const state = helper.store.getState().cart[id]?.count || 0;
    await user.click(button);
    const state2 = helper.store.getState().cart[id].count;
    expect(state2).toEqual(state + 1);
  });

  it('содержимое корзины должно сохраняться между перезагрузками страницы', async () => {
    const id = 2;
    const helper = new AppMock('/hw/store', [`/catalog/${id}`]);

    const user = userEvent.setup();
    await waitFor(() => {
      expect(helper.rendered.getByText('Add to Cart')).toBeTruthy();
    });

    const button = helper.rendered.getByText('Add to Cart') as HTMLButtonElement;
    await user.click(button);
    const expectedStorageState = helper.store.getState().cart;
    expect(helper.cartApi.getState()).toEqual(expectedStorageState);
  });

  it('происходит чекаут и возвращается номер заказа', async () => {
    const FakeButton = ({ onSubmit }) => {
      const onClick = useCallback(() => {
        onSubmit({
          name: 'test',
          phone: '1234567890',
          address: 'test',
        });
      }, [onSubmit]);

      return <button onClick={onClick}>Checkout</button>;
    };

    const id = 3;

    const helper = new AppMock('/hw/store', ['/cart'], {
      cart: { 3: { name: 'Horse cart', count: 3, price: 900 } },
    });

    const user = userEvent.setup();
    await waitFor(() => {
      expect(helper.rendered.getByTestId('checkoutForm')).toBeTruthy();
    });

    const onSubmit = (form: CheckoutFormData) => {
      helper.store.dispatch(checkout(form, {}));
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    helper.rendered.getByTestId('checkoutForm').innerHTML = render(
      <FakeButton onSubmit={onSubmit}></FakeButton>
    );

    const button = helper.rendered.getByText('Checkout') as HTMLButtonElement;

    await user.click(button);
    const state = helper.store.getState().cart;
    expect(state).toEqual({});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(helper.store.getState().latestOrderId).toEqual(helper.api.id + 1);
  });
});
