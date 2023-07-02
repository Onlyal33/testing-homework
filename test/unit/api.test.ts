/**
 * @jest-environment node
 */

import { ExampleApi } from '../../src/client/api';
import { Product, ProductShortInfo } from '../../src/common/types';

const getApi = (path = 'http://localhost:3000/hw/store') =>
  new ExampleApi(path);

describe('api сервера возвращает консистентные данные верного типа', () => {
  it('api сервера getProducts возвращает данные верного типа', async () => {
    const api = getApi();
    const { data } = await api.getProducts();

    const expected: ProductShortInfo = {
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
    };

    expect(data.every((item) => expect(item).toMatchObject(expected)));
  });

  it('api сервера getProductById возвращает данные верного типа', async () => {
    const api = getApi();

    const { data } = await api.getProductById(0);

    const expected: Product = {
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
      material: expect.any(String),
      color: expect.any(String),
    };

    expect(data).toMatchObject(expected);
  });

  it('api сервера getProductById и getProducts возвращает консистентные данные', async () => {
    const api = getApi();
    const { data } = await api.getProducts();
    const results = (
      await Promise.all(data.map(({ id }) => api.getProductById(id)))
    ).map(({ data }) => data);

    expect(results).toMatchObject(data);
  });

  it('api сервера checkout возвращает корректные номнра заказов', async () => {
    const api = getApi();

    const checkoutFormData = {
      name: 'string',
      phone: '1234567890',
      address: 'string',
    };

    const {
      data: { id },
    } = await api.checkout(checkoutFormData, {});

    const {
      data: { id: id2 },
    } = await api.checkout(checkoutFormData, {});

    expect(id2).toEqual(id + 1);
  });
});
