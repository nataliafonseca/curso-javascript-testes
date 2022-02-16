import Cart from '@/components/Cart';
import CartItem from '@/components/CartItem';
import { CartManager } from '@/managers/CartManager';
import { makeServer } from '@/miragejs/server';
import { mount } from '@vue/test-utils';

describe('Cart', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  const mountCart = () => {
    const products = server.createList('product', 2);
    const cartManager = new CartManager();

    const wrapper = mount(Cart, {
      propsData: {
        products,
      },
      mocks: {
        $cart: cartManager,
      },
    });

    return { wrapper, products, cartManager };
  };

  it('should mount the component', () => {
    const { wrapper } = mountCart();

    expect(wrapper.vm).toBeDefined();
  });

  it('should mount cart even if no products are passed', () => {
    const { cartManager } = mountCart();

    const wrapper = mount(Cart, {
      mocks: {
        $cart: cartManager,
      },
    });

    expect(wrapper.vm).toBeDefined();
  });

  it('should emit close event when close button is clicked', async () => {
    const { wrapper } = mountCart();
    const button = wrapper.find('[data-testid="close-button"]');

    await button.trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  it('should hide the cart when no prop isOpen is passed', () => {
    const { wrapper } = mountCart();

    expect(wrapper.classes()).toContain('hidden');
  });

  it('should display the cart when prop isOpen is passed', async () => {
    const { wrapper } = mountCart();
    await wrapper.setProps({ isOpen: true });

    expect(wrapper.classes()).not.toContain('hidden');
  });

  it('should display "Cart is empty" when there are no products', async () => {
    const { wrapper } = mountCart();
    await wrapper.setProps({
      products: [],
    });

    expect(wrapper.text()).toContain('Cart is empty');
  });

  it('should display 2 instances of CartItem when 2 products are provided', () => {
    const { wrapper } = mountCart();

    expect(wrapper.findAllComponents(CartItem)).toHaveLength(2);
    expect(wrapper.text()).not.toContain('Cart is empty');
  });

  it('should display a button to clear cart', () => {
    const { wrapper } = mountCart();
    const button = wrapper.find('[data-testid="clear-cart-button"]');

    expect(button.exists()).toBe(true);
  });

  it('should not display empty cart button when there are no products', async () => {
    const { wrapper } = mountCart();
    await wrapper.setProps({
      products: [],
    });

    const button = wrapper.find('[data-testid="clear-cart-button"]');

    expect(button.exists()).toBe(false);
  });

  it('should call cart manager clearProducts() when button gets clicked', async () => {
    const { wrapper, cartManager } = mountCart();
    const button = wrapper.find('[data-testid="clear-cart-button"]');
    const spy = jest.spyOn(cartManager, 'clearProducts');
    await button.trigger('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
