import ProductCard from "../components/product-card";
import Search from "../components/search";

import { useFetchProducts } from "../hooks/use-fetch-products";

export default function Home() {
  const { products, error } = useFetchProducts();

  return (
    <main data-testid="product-list" className="my-8">
      <Search />
      <div className="container px-6 mx-auto">
        <h3 className="text-2xl font-medium text-gray-700">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">
          {products.length} Products
        </span>
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
