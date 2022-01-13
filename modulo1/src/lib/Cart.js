import Money from 'dinero.js';
import { find, remove } from 'lodash';
import { calculateDiscount } from './discount.utils';

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }

    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((total, { quantity, product, condition }) => {
      const amount = Money({ amount: product.price * quantity });
      let discount = Money({ amount: 0 });

      if (condition) {
        discount = calculateDiscount(amount, quantity, condition);
      }

      return total.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal();
    const formatted = total.setLocale('pt-br').toFormat();
    const items = this.items;

    return {
      total,
      formatted,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total: total.getAmount(),
      items,
    };
  }
}
