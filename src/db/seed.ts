import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { products } from './schema';

dotenv.config({
  path: '.env.local',
});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const main = async () => {
  try {
    console.log('Seeding database...');

    await db.delete(products);

    await db.insert(products).values([
      {
        name: 'Nike Air Max 97',
        description: 'A classic sneaker with a futuristic look.',
        price: '170.00',
        image: '/images/air-max-97.png',
      },
      {
        name: 'Nike Air Force 1',
        description: 'An iconic sneaker that transcends generations.',
        price: '100.00',
        image: '/images/air-force-1.png',
      },
      {
        name: 'Nike Blazer Mid 77',
        description: 'A vintage-inspired sneaker with a timeless design.',
        price: '100.00',
        image: '/images/blazer-mid-77.png',
      },
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

main();
