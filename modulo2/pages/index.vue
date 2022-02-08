<template>
  <main class="my-8">
    <search />
    <div v-if="errorMessage === ''" class="container px-6 mx-auto">
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
    <h3 v-else class="text-2xl text-center">{{ errorMessage }}</h3>
  </main>
</template>

<script>
import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';

export default {
  components: { ProductCard, Search },
  data() {
    return { products: [], errorMessage: '' };
  },
  async created() {
    try {
      this.products = (await this.$axios.get('/api/products')).data.products;
    } catch (error) {
      this.errorMessage = 'Problema ao carregar a lista de produtos.';
    }
  },
};
</script>
