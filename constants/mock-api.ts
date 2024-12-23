////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Product data
export type Product = {
  photo_url: string;
  nama_mobil: string;
  plat_nomor: string;
  created_at: string;
  harga_sewa: number;
  deskripsi: string;
  profit: number;
  id: number;
  updated_at: string;
  tahun_mobil?: number;
  kondisi_lecet?: boolean;
  merk?: string;
  warna?: string;
  nama_pemilik?: string;
  jenis_transmisi?: string;
  jenis_bbm?: string;
};

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      return {
        id,
        nama_mobil: faker.vehicle.manufacturer(),
        plat_nomor: `${faker.string
          .alpha()
          .toUpperCase()} ${faker.string.numeric({ length: 4 })} ${faker.string
          .alpha()
          .toUpperCase()}`,
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        harga_sewa:
          Math.floor(Math.random() * (18 - 1 + 1) + 1) * 25000 + 250000,
        profit: Math.floor(Math.random() * (19 - 2 + 1) + 2) * 5000,
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        deskripsi: faker.vehicle.model(),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      console.log('Filtering products by categories:', categories);
      products = products.filter((product) =>
        categories.includes(product.plat_nomor)
      );
      console.log('Filtered products:', products);
    }

    // Search functionality across multiple fields
    if (search) {
      console.log('Searching products with search term:', search);
      products = matchSorter(products, search, {
        keys: ['plat_nomor']
      });
      console.log('Searched products:', products);
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  // Get a specific product by its ID
  async getProductById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product
    };
  }
};

// Initialize sample products
fakeProducts.initialize();

// Define the shape of Transaction data
export type Transaction = {
  id: number;
  customer_name: string;
  car_model: string;
  rental_date: string;
  rental_time: string;
  return_date: string;
  return_time: string;
  total_amount: number;
  status: string;
  duration: number;
};

// Mock transaction data store
export const fakeTransactions = {
  records: [] as Transaction[], // Holds the list of transaction objects

  // Initialize with sample data
  initialize() {
    const sampleTransactions: Transaction[] = [];
    function generateRandomTransactionData(id: number): Transaction {
      return {
        id,
        customer_name: faker.person.fullName(),
        car_model: faker.vehicle.model(),
        rental_date: faker.date.past().toISOString().split('T')[0],
        rental_time: faker.date
          .past()
          .toISOString()
          .split('T')[1]
          .split('.')[0],
        return_date: faker.date.future().toISOString().split('T')[0],
        return_time: faker.date
          .future()
          .toISOString()
          .split('T')[1]
          .split('.')[0],
        total_amount: faker.number.int({ min: 100000, max: 1000000 }),
        status: faker.helpers.arrayElement([
          'Pending',
          'Completed',
          'Cancelled'
        ]),
        duration: faker.number.int({ min: 1, max: 7 })
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleTransactions.push(generateRandomTransactionData(i));
    }

    this.records = sampleTransactions;
  },

  // Get all transactions with optional status filtering and search
  async getAll({
    statuses = [],
    search
  }: {
    statuses?: string[];
    search?: string;
  }) {
    let transactions = [...this.records];

    // Filter transactions based on selected statuses
    if (statuses.length > 0) {
      console.log('Filtering transactions by statuses:', statuses);
      transactions = transactions.filter((transaction) =>
        statuses.includes(transaction.status)
      );
      console.log('Filtered transactions:', transactions);
    }

    // Search functionality across multiple fields
    if (search) {
      console.log('Searching transactions with search term:', search);
      transactions = matchSorter(transactions, search, {
        keys: ['customer_name', 'car_model', 'status']
      });
      console.log('Searched transactions:', transactions);
    }

    return transactions;
  },

  // Get paginated results with optional status filtering and search
  async getTransactions({
    page = 1,
    limit = 10,
    statuses,
    search
  }: {
    page?: number;
    limit?: number;
    statuses?: string;
    search?: string;
  }) {
    await delay(1000);
    const statusesArray = statuses ? statuses.split('.') : [];
    const allTransactions = await this.getAll({
      statuses: statusesArray,
      search
    });
    const totalTransactions = allTransactions.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedTransactions = allTransactions.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_transactions: totalTransactions,
      offset,
      limit,
      transactions: paginatedTransactions
    };
  },

  // Get a specific transaction by its ID
  async getTransactionById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the transaction by its ID
    const transaction = this.records.find(
      (transaction) => transaction.id === id
    );

    if (!transaction) {
      return {
        success: false,
        message: `Transaction with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Transaction with ID ${id} found`,
      transaction
    };
  }
};

// Initialize sample transactions
fakeTransactions.initialize();
