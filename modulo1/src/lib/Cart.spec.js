import { Cart } from './Cart';

describe('Cart', () => {
  let cart;
  let product;

  beforeEach(() => {
    cart = new Cart();
    product = {
      title: 'Adidas running shoes -men',
      price: 35388, // 353.88 | R$ 353,88
    };
  });

  it('should return 0 when getTotal() is executed in a newly created cart', () => {
    expect(cart.getTotal()).toBe(0);
  });

  it('should multiply quantity and price and return the total amount', () => {
    cart.add({
      product,
      quantity: 2,
    });

    expect(cart.getTotal()).toEqual(70776);
  });
});
