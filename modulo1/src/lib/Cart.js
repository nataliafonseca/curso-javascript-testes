import { find, remove } from 'lodash';

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
    if (find(this.items, { product })) {
      remove(this.items, { product });
    }
  }

  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  summary() {
    {
      return {
        total: this.getTotal(),
        items: this.items,
      };
    }
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}
