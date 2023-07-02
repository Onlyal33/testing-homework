import { AppMock } from '../helpers';

describe('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
  it('в шапке по названию магазина отображается ссылка на главную страницу', () => {
    const helper = new AppMock('/hw/store', [`/`]);
    const linkElement = helper.rendered.getByText('Example store') as HTMLLinkElement;
    expect((new URL(linkElement.href)).pathname).toEqual("/");
  });

  it('в шапке отображается ссылка на страницу /delivery', () => {
    const helper = new AppMock('/hw/store', [`/`]);
    const linkElement = helper.rendered.getByText('Delivery') as HTMLLinkElement;
    expect((new URL(linkElement.href)).pathname).toEqual("/delivery");
  });

  it('в шапке отображается ссылка на страницу /contacts', () => {
    const helper = new AppMock('/hw/store', [`/`]);
    const linkElement = helper.rendered.getByText('Contacts') as HTMLLinkElement;
    expect((new URL(linkElement.href)).pathname).toEqual("/contacts");
  });

  it('в шапке отображается ссылка на страницу /catalog', () => {
    const helper = new AppMock('/hw/store', [`/`]);
    const linkElement = helper.rendered.getByText('Catalog') as HTMLLinkElement;
    expect((new URL(linkElement.href)).pathname).toEqual("/catalog");
  });

  it('в шапке отображается ссылка на страницу /cart', () => {
    const helper = new AppMock('/hw/store', [`/`]);
    const linkElement = helper.rendered.getByText('Cart') as HTMLLinkElement;
    expect((new URL(linkElement.href)).pathname).toEqual("/cart");
  });
});
