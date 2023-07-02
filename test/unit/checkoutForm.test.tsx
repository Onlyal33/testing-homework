import { render } from '@testing-library/react';
import { Form } from '../../src/client/components/Form';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Checkout form validation checks', () => {
  it('When inputs are valid form should submit', async () => {

    const fixture = { name: 'a', phone: '1234567890', address: 'zz '}
    const user = userEvent.setup();
    const onsubmit = jest.fn(() => fixture);
    const form = render(<Form onSubmit={onsubmit} />);

    const name = form.getByLabelText('Name') as HTMLInputElement;
    const phone = form.getByLabelText('Phone') as HTMLInputElement;
    const address = form.getByLabelText('Address') as HTMLInputElement;
    const button = form.getByText('Checkout');

    await user.type(name, fixture.name);
    await user.type(phone, fixture.phone);
    await user.type(address, fixture.address);
    await user.click(button);

    expect(onsubmit).toBeCalledTimes(1);
    expect(onsubmit).toHaveReturnedWith({ name: name.value, phone: phone.value, address: address.value});
  });

  it('When phone input is invalid form should not submit', async () => {
    const user = userEvent.setup();
    const onsubmit = jest.fn();
    const form = render(<Form onSubmit={onsubmit} />);

    const name = form.getByLabelText('Name') as HTMLInputElement;
    const phone = form.getByLabelText('Phone') as HTMLInputElement;
    const address = form.getByLabelText('Address') as HTMLInputElement;
    const button = form.getByText('Checkout');

    await user.type(name, 'a');
    await user.type(phone, '123456789');
    await user.type(address, 'z');
    await user.click(button);

    expect(onsubmit).not.toBeCalled();
  });

  it('When name input is invalid form should not submit', async () => {
    const user = userEvent.setup();
    const onsubmit = jest.fn();
    const form = render(<Form onSubmit={onsubmit} />);

    const phone = form.getByLabelText('Phone') as HTMLInputElement;
    const address = form.getByLabelText('Address') as HTMLInputElement;
    const button = form.getByText('Checkout');

    await user.type(phone, '1234567890');
    await user.type(address, 'z');
    await user.click(button);

    expect(onsubmit).not.toBeCalled();
  });

  it('When address input is invalid form should not submit', async () => {
    const user = userEvent.setup();
    const onsubmit = jest.fn();
    const form = render(<Form onSubmit={onsubmit} />);

    const name = form.getByLabelText('Name') as HTMLInputElement;
    const phone = form.getByLabelText('Phone') as HTMLInputElement;

    const button = form.getByText('Checkout');
    await user.type(name, 'a');
    await user.type(phone, '1234567890');
    await user.click(button);

    expect(onsubmit).not.toBeCalled();
  });
});
