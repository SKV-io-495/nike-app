import Card from '@/components/Card';

const placeholderShoes = [
  {
    id: 1,
    title: 'Nike Air Max 1',
    price: 150,
    image: '/shoes/shoe-1.jpg',
    subtitle: "Men's Shoes",
    meta: '1 Colour',
  },
  {
    id: 2,
    title: 'Nike Air Force 1 Mid Evo',
    price: 180,
    image: '/shoes/shoe-2.webp',
    subtitle: "Men's Shoes",
    meta: '2 Colours',
  },
  {
    id: 3,
    title: 'Nike Killshot 2',
    price: 120,
    image: '/shoes/shoe-3.webp',
    subtitle: "Women's Shoes",
    meta: '3 Colours',
  },
  {
    id: 4,
    title: 'Nike Cortez',
    price: 100,
    image: '/shoes/shoe-4.webp',
    subtitle: "Men's Shoes",
    meta: '1 Colour',
  },
];

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Latest Shoes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {placeholderShoes.map((shoe) => (
            <Card
              key={shoe.id}
              id={shoe.id}
              title={shoe.title}
              price={shoe.price}
              image={shoe.image}
              subtitle={shoe.subtitle}
              meta={shoe.meta}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
