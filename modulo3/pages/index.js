import ProductCard from "../components/product-card";
import Search from "../components/search";

export default function Home() {
  return (
    <main data-testid="home" className="my-8">
      <Search />
      <div className="container px-6 mx-auto">
        <h3 className="text-2xl font-medium text-gray-700">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">200+ Products</span>
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard />
        </div>
      </div>
    </main>
  );
}
