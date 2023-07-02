import React from 'react';
import { Store, applyMiddleware, createStore } from 'redux';
import { RenderResult, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';

import { Action, ApplicationState, EpicDeps, createRootReducer, rootEpic } from '../src/client/store';
import { CartApi, ExampleApi } from '../src/client/api';
import { Application } from '../src/client/Application';
import { CartState } from '../src/common/types';

const products = [
  {
    id: 0,
    name: 'Intelligent Chicken',
    description:
      'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    price: 689,
    color: 'fuchsia',
    material: 'Soft',
  },
  {
    id: 1,
    name: 'Tasty Shoes',
    description:
      'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    price: 744,
    color: 'gold',
    material: 'Frozen',
  },
  {
    id: 2,
    name: 'Small Hat',
    description:
      'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    price: 833,
    color: 'teal',
    material: 'Metal',
  },
  {
    id: 3,
    name: 'Rustic Cheese',
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    price: 782,
    color: 'black',
    material: 'Plastic',
  },
  {
    id: 4,
    name: 'Awesome Fish',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    price: 309,
    color: 'mint green',
    material: 'Frozen',
  },
  {
    id: 5,
    name: 'Incredible Salad',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    price: 15,
    color: 'white',
    material: 'Concrete',
  },
  {
    id: 6,
    name: 'Unbranded Bacon',
    description:
      'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    price: 67,
    color: 'indigo',
    material: 'Frozen',
  },
  {
    id: 7,
    name: 'Unbranded Cheese',
    description:
      'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    price: 582,
    color: 'green',
    material: 'Steel',
  },
  {
    id: 8,
    name: 'Tasty Table',
    description:
      'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    price: 51,
    color: 'orchid',
    material: 'Plastic',
  },
  {
    id: 9,
    name: 'Rustic Shirt',
    description:
      'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    price: 4,
    color: 'maroon',
    material: 'Frozen',
  },
  {
    id: 10,
    name: 'Ergonomic Computer',
    description:
      'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    price: 560,
    color: 'sky blue',
    material: 'Frozen',
  },
  {
    id: 11,
    name: 'Practical Pants',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    price: 183,
    color: 'blue',
    material: 'Concrete',
  },
  {
    id: 12,
    name: 'Ergonomic Sausages',
    description:
      'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    price: 289,
    color: 'salmon',
    material: 'Steel',
  },
  {
    id: 13,
    name: 'Rustic Keyboard',
    description:
      'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    price: 211,
    color: 'ivory',
    material: 'Plastic',
  },
  {
    id: 14,
    name: 'Gorgeous Shirt',
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    price: 305,
    color: 'cyan',
    material: 'Frozen',
  },
  {
    id: 15,
    name: 'Refined Pants',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    price: 208,
    color: 'violet',
    material: 'Metal',
  },
  {
    id: 16,
    name: 'Ergonomic Cheese',
    description:
      'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    price: 271,
    color: 'magenta',
    material: 'Fresh',
  },
  {
    id: 17,
    name: 'Intelligent Ball',
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    price: 777,
    color: 'pink',
    material: 'Granite',
  },
  {
    id: 18,
    name: 'Incredible Mouse',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    price: 704,
    color: 'orchid',
    material: 'Concrete',
  },
  {
    id: 19,
    name: 'Generic Pants',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    price: 574,
    color: 'maroon',
    material: 'Cotton',
  },
  {
    id: 20,
    name: 'Refined Keyboard',
    description:
      'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    price: 687,
    color: 'silver',
    material: 'Steel',
  },
  {
    id: 21,
    name: 'Tasty Salad',
    description:
      'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    price: 613,
    color: 'orange',
    material: 'Steel',
  },
  {
    id: 22,
    name: 'Incredible Shoes',
    description:
      'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    price: 591,
    color: 'maroon',
    material: 'Frozen',
  },
  {
    id: 23,
    name: 'Gorgeous Cheese',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    price: 230,
    color: 'orchid',
    material: 'Concrete',
  },
  {
    id: 24,
    name: 'Sleek Computer',
    description:
      'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
    price: 632,
    color: 'purple',
    material: 'Concrete',
  },
  {
    id: 25,
    name: 'Ergonomic Tuna',
    description:
      'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    price: 633,
    color: 'white',
    material: 'Concrete',
  },
  {
    id: 26,
    name: 'Generic Shoes',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    price: 680,
    color: 'mint green',
    material: 'Fresh',
  },
];

export class ExampleApiStub {
  id: number;
  constructor(basename) {
    this.id = 0;
  }

  async getProducts() {
    return {
      data: products.map(({ id, name, price }) => ({
        id,
        name,
        price,
      })),
      status: 200,
      statusText: 'OK',
      headers: { foo: 'bar' },
      config: {},
    };
  }

  async getProductById(id) {
    return {
      data: products[id],
      status: 200,
      statusText: 'OK',
      headers: { foo: 'bar' },
      config: {},
    };
  }

  async checkout(form, cart) {
    const id = this.id + 1;
    return {
      data: { id },
      status: 200,
      statusText: 'OK',
      headers: { foo: 'bar' },
      config: {},
    };
  }
}

export class CartApiStub {
  state: CartState;

  constructor() {
    this.state = {};
  }

  getState(): CartState {
    return this.state || {};
  }

  setState(cart: CartState) {
    this.state = cart;
  }
}

export function mockInitStore(api: ExampleApi, cart: CartApi, initialState?) {
  const rootReducer = createRootReducer(initialState || {
      cart: cart.getState()
  });

  const epicMiddleware = createEpicMiddleware<Action, Action, ApplicationState, EpicDeps>({
      dependencies: { api, cart }
  });

  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
}

export class AppMock {
  basename: string;
  api: ExampleApi;
  cartApi: CartApi;
  store: Store;
  rendered: RenderResult;

  constructor(basename, initialEntries, initialState?) {
    this.basename = basename;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.api = new ExampleApiStub(this.basename);
    this.cartApi = new CartApiStub();
    this.store = mockInitStore(this.api, this.cartApi, initialState);
    this.rendered = render(
      <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
        <Provider store={this.store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );
  }
}