<template>
  <main class="my-8">
    <div class="container px-6 mx-auto">
      <h3 class="text-2xl font-medium text-gray-700">Wrist Watch</h3>
      <span class="mt-3 text-sm text-gray-500">200+ Products</span>
      <div
        class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <product-card
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </main>
</template>

<script>
import ProductCard from '@/components/ProductCard';

export default {
  components: { ProductCard },
  data() {
    return { products: [] };
  },
  async created() {
    this.products = (await this.$axios.get('/api/products')).data.products;
    await this.$axios.get('/api/users');
  },
};
</script>
