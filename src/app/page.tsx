import { db } from '@/db';
import { products } from '@/db/schema';

export default async function Home() {
  const allProducts = await db.select().from(products);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Nike Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <div className="aspect-square bg-gray-100 rounded-lg mb-2">
              {/* Placeholder for image */}
            </div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
