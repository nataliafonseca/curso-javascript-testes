import { Cart } from './Cart';

describe('Cart', () => {
  let cart;
  let product;
  let product2;

  beforeEach(() => {
    cart = new Cart();
    product = {
      title: 'Adidas running shoes - men',
      price: 35388, // 353.88 | R$ 353,88
    };
    product2 = {
      title: 'Adidas running shoes - women',
      price: 41872, // 418.72 | R$ 418,72
    };
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created cart', () => {
      expect(cart.getTotal()).toBe(0);
    });

    it('should multiply quantity and price and return the total amount', () => {
      cart.add({
        product,
        quantity: 2,
      });

      expect(cart.getTotal()).toBe(70776);
    });

    it('should ensure no more than one of the same item can be at the cart at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal()).toBe(35388);
    });

    it('should update total when a product gets removed', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal()).toBe(41872);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 5,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when sumary is called', () => {
      cart.add({
        product,
        quantity: 5,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal()).toBeGreaterThan(0);
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal()).toBe(0);
    });
  });
});
