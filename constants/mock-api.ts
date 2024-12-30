////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

// Define the shape of User data

type Gender = 'male' | 'female';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude: number;
  latitude: number;
  gender: Gender;
  date_of_birth: string;
  job: string;
  profile_picture: string;
};

// Mock user data store
export const fakeUsers = {
  records: [] as User[], // Holds the list of user objects

  // Initialize with sample data
  initialize() {
    const sampleUsers: User[] = [];
    function generateRandomUserData(id: number): User {
      const genders = ['male', 'female'];
      const jobs = [
        'Software Engineer',
        'Data Scientist',
        'Marketing Manager',
        'Graphic Designer',
        'Sales Manager',
        'Product Manager'
      ];
      const cities = [
        'San Francisco',
        'New York City',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia',
        'San Antonio',
        'San Diego',
        'Dallas',
        'San Jose',
        'Austin',
        'Jacksonville'
      ];
      const states = [
        'California',
        'New York',
        'Texas',
        'Florida',
        'Illinois',
        'Pennsylvania',
        'Ohio',
        'Georgia',
        'North Carolina',
        'Michigan'
      ];

      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: `${faker.internet.email()}`,
        phone: `001-${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 10000)}`,
        street: `${Math.floor(
          Math.random() * 1000
        )} ${faker.location.street()}`,
        city: faker.helpers.arrayElement(cities),
        state: faker.helpers.arrayElement(states),
        country: 'USA',
        zipcode: faker.location.zipCode(),
        longitude: faker.location.longitude(),
        latitude: faker.location.latitude(),
        gender: faker.helpers.arrayElement(genders) as Gender,
        date_of_birth: faker.date
          .between({ from: '1980-01-01', to: '2000-01-01' })
          .toISOString()
          .split('T')[0],
        job: faker.helpers.arrayElement(jobs),
        profile_picture: `https://api.slingacademy.com/public/sample-users/${id}.png`
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleUsers.push(generateRandomUserData(i));
    }

    this.records = sampleUsers;
  },

  // Get all users with optional gender filtering and search
  async getAll({
    genders = [] as string[],
    search
  }: {
    genders?: string[];
    search?: string;
  }) {
    let users = [...this.records];

    // Filter users based on selected genders
    if (genders.length > 0) {
      users = users.filter((user) => genders.includes(user.gender));
    }

    // Search functionality across multiple fields
    if (search) {
      users = matchSorter(users, search, {
        keys: [
          'first_name',
          'last_name',
          'email',
          'job',
          'city',
          'street',
          'state',
          'country'
        ]
      });
    }

    return users;
  },

  // Get paginated results with optional gender filtering and search
  async getUsers({
    page = 1,
    limit = 10,
    genders,
    search
  }: {
    page?: number;
    limit?: number;
    genders?: string;
    search?: string;
  }) {
    const gendersArray = genders ? genders.split('.') : [];
    console.log('gendersArray', gendersArray);
    const allUsers = await this.getAll({ genders: gendersArray, search });
    const totalUsers = allUsers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers
    };
  }
};

// Initialize sample users
fakeUsers.initialize();

export type Product = {
  photo_url: string;
  nama_mobil: string;
  plat_nomor: string;
  created_at: string;
  harga_sewa: number;
  deskripsi: string;
  profit: number;
  owner: string;
  id: number;
  updated_at: string;
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
        harga_sewa: parseFloat(
          faker.commerce.price({ min: 1000000, max: 5000000, dec: 0 })
        ),
        profit: parseFloat(
          faker.commerce.price({ min: 1000000, max: 5000000, dec: 0 })
        ),
        photo_url: '/Mercedes Car PNG.png',
        deskripsi: faker.vehicle.model(),
        owner: `${faker.person.firstName()} ${faker.person.lastName()}`,
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
    categories = [] as string[],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.plat_nomor)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ['plat_nomor']
      });
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
type Status = 'Confirmed' | 'Pending' | 'Cancelled';
// Define the shape of Booking data
export type Booking = {
  id: number;
  booking_date: string;
  booking_code: number;
  customer_name: string;
  car_model: string;
  isWithDriver: boolean;
  driver_name?: string;
  duration: number;
  status: Status;
  amount: number;
  payment_status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

// Mock booking data store
export const fakeBookings = {
  records: [] as Booking[], // Holds the list of booking objects

  // Initialize with sample data
  initialize() {
    const sampleBookings: Booking[] = [];
    function generateRandomBookingData(id: number): Booking {
      return {
        id,
        booking_date: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        customer_name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        car_model: faker.vehicle.model(),
        isWithDriver: faker.datatype.boolean(),
        booking_code: faker.number.int({ min: 1000, max: 9999 }),
        driver_name: faker.person.firstName(),
        duration: faker.number.int({ min: 1, max: 10 }),
        status: faker.helpers.arrayElement([
          'Pending',
          'Confirmed',
          'Cancelled'
        ]),
        amount: parseFloat(
          faker.commerce.price({ min: 100000, max: 1000000, dec: 0 })
        ),
        payment_status: faker.helpers.arrayElement(['Paid', 'Unpaid']),
        start_date: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        end_date: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        created_at: faker.date.recent().toISOString(),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleBookings.push(generateRandomBookingData(i));
    }

    this.records = sampleBookings;
  },

  // Get all bookings with optional status filtering and search
  async getAll({
    statuses = [],
    search
  }: {
    statuses?: string[];
    search?: string;
  }) {
    let bookings = [...this.records];

    // Filter bookings based on selected statuses
    if (statuses.length > 0) {
      console.log('Filtering bookings with statuses:', statuses);
      bookings = bookings.filter((booking) =>
        statuses.includes(booking.status)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      bookings = matchSorter(bookings, search, {
        keys: ['customer_name', 'car_model', 'driver_name']
      });
    }

    return bookings;
  },

  // Get paginated results with optional status filtering and search
  async getBookings({
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

    // Log the statuses being used for filtering
    if (statusesArray.length > 0) {
      console.log('Filtering bookings with statuses:', statusesArray);
    }

    const allBookings = await this.getAll({
      statuses: statusesArray,
      search
    });
    const totalBookings = allBookings.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedBookings = allBookings.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_bookings: totalBookings,
      offset,
      limit,
      bookings: paginatedBookings
    };
  },

  // Get a specific booking by its ID
  async getBookingById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the booking by its ID
    const booking = this.records.find((booking) => booking.id === id);

    if (!booking) {
      return {
        success: false,
        message: `Booking with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Booking with ID ${id} found`,
      booking
    };
  }
};

// Initialize sample bookings
fakeBookings.initialize();
// Mock service data store

export type Service = {
  id: number;
  car_name: string;
  description: string;
  date_start: string;
  date_end: string;
  status: string;
  location: string;
  fee: number;
  photo_url: string;
};

export const fakeServices = {
  records: [] as Service[], // Holds the list of service objects

  // Initialize with sample data
  initialize() {
    const sampleServices: Service[] = [];
    function generateRandomServiceData(id: number): Service {
      const locations = [
        'San Francisco',
        'New York City',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia'
      ];

      const descriptions = [
        'Oil Change',
        'Tire Rotation',
        'Engine Diagnostics',
        'Brake Replacement',
        'Battery Replacement',
        'AC Service',
        'Transmission Repair'
      ];

      const carNames = [
        'Toyota Corolla',
        'Honda Civic',
        'Ford Focus',
        'Chevrolet Malibu',
        'Nissan Altima',
        'Hyundai Elantra',
        'BMW 3 Series',
        'Audi A4',
        'Mercedes-Benz C-Class',
        'Volkswagen Passat'
      ];
      const statuses = ['Complete', 'On Service', 'Need Service'];
      return {
        id,
        car_name: faker.helpers.arrayElement(carNames),
        description: faker.helpers.arrayElement(descriptions),
        status: faker.helpers.arrayElement(statuses),
        date_start: faker.date
          .between({ from: '2023-01-01', to: '2023-12-01' })
          .toISOString()
          .split('T')[0],
        date_end: faker.date
          .between({ from: '2023-12-02', to: '2024-01-31' })
          .toISOString()
          .split('T')[0],
        location: faker.helpers.arrayElement(locations),
        fee: parseFloat(faker.commerce.price({ min: 50, max: 1000, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`
      };
    }

    // Generate sample service records
    for (let i = 1; i <= 20; i++) {
      sampleServices.push(generateRandomServiceData(i));
    }

    this.records = sampleServices;
  },

  // Get all services with optional filtering and search
  async getAll({ car_name, search }: { car_name?: string; search?: string }) {
    let services = [...this.records];

    // Filter services based on car name
    if (car_name) {
      services = services.filter((service) =>
        service.car_name.toLowerCase().includes(car_name.toLowerCase())
      );
    }

    // Search functionality across multiple fields
    if (search) {
      services = matchSorter(services, search, {
        keys: ['description', 'location', 'car_name']
      });
    }

    return services;
  },

  // Get paginated results with optional filtering and search
  async getServices({
    page = 1,
    limit = 10,
    car_name,
    search
  }: {
    page?: number;
    limit?: number;
    car_name?: string;
    search?: string;
  }) {
    const allServices = await this.getAll({ car_name, search });
    const totalServices = allServices.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedServices = allServices.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample service data for testing and learning purposes',
      total_services: totalServices,
      offset,
      limit,
      services: paginatedServices
    };
  },

  // Get a specific service by its ID
  async getServiceById(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    // Find the service by its ID
    const service = this.records.find((service) => service.id === id);

    if (!service) {
      return {
        success: false,
        message: `Service with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Service with ID ${id} found`,
      service
    };
  }
};

// Initialize sample services
fakeServices.initialize();
export type Client = {
  id: number;
  email: string;
  name: string;
  phone: string; // Changed to string to support phone formatting
  address: string;
  document: string; // e.g., could be a URL or document type
};

export const fakeClients = {
  records: [] as Client[], // Holds the list of client objects

  // Initialize with sample data
  initialize() {
    const sampleClients: Client[] = [];
    function generateRandomClientData(id: number): Client {
      const names = [
        'John Doe',
        'Jane Smith',
        'Michael Brown',
        'Emily Davis',
        'Chris Wilson',
        'Anna Johnson',
        'Robert White',
        'Sophia Miller',
        'Daniel Taylor',
        'Olivia Martin'
      ];
      const addresses = [
        '123 Main St, San Francisco, CA',
        '456 Elm St, New York, NY',
        '789 Pine St, Los Angeles, CA',
        '321 Maple St, Chicago, IL',
        '654 Oak St, Houston, TX',
        '987 Cedar St, Phoenix, AZ',
        '123 Birch St, Philadelphia, PA'
      ];
      const emails = [
        'contact@mainstreet.sf',
        'info@elmstreet.nyc',
        'support@pinestreet.la',
        'hello@maplestreet.chicago',
        'services@oakstreet.houston',
        'admin@cedarstreet.phoenix',
        'team@birchstreet.philly'
      ];
      const documents = ['KTP', 'SIM'];

      return {
        id,
        name: faker.helpers.arrayElement(names),
        email: faker.helpers.arrayElement(emails),
        phone: faker.phone.number({ style: 'national' }),
        address: faker.helpers.arrayElement(addresses),
        document: faker.helpers.arrayElement(documents)
      };
    }

    // Generate sample client records
    for (let i = 1; i <= 20; i++) {
      sampleClients.push(generateRandomClientData(i));
    }

    this.records = sampleClients;
  },

  // Get all clients with optional filtering and search
  async getAll({ name, search }: { name?: string; search?: string }) {
    let clients = [...this.records];

    // Filter clients based on name
    if (name) {
      clients = clients.filter((client) =>
        client.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Search functionality across multiple fields
    if (search) {
      clients = matchSorter(clients, search, {
        keys: ['name', 'address', 'phone']
      });
    }

    return clients;
  },

  // Get paginated results with optional filtering and search
  async getClients({
    page = 1,
    limit = 10,
    name,
    search
  }: {
    page?: number;
    limit?: number;
    name?: string;
    search?: string;
  }) {
    const allClients = await this.getAll({ name, search });
    const totalClients = allClients.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedClients = allClients.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample client data for testing and learning purposes',
      total_clients: totalClients,
      offset,
      limit,
      clients: paginatedClients
    };
  },

  // Get a specific client by its ID
  async getClientById(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    // Find the client by its ID
    const client = this.records.find((client) => client.id === id);

    if (!client) {
      return {
        success: false,
        message: `Client with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Client with ID ${id} found`,
      client
    };
  }
};

// Initialize sample clients
fakeClients.initialize();
export type Driver = {
  id: number;
  email: string;
  name: string;
  phone: string; // String to support phone formatting
  status: string; // Driver's status, e.g., Active, On Leave
};

export const fakeDriver = {
  records: [] as Driver[], // Holds the list of driver objects

  // Initialize with sample data
  initialize() {
    const sampleDrivers: Driver[] = [];
    function generateRandomDriverData(id: number): Driver {
      return {
        id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: 'national' }),
        status: faker.helpers.arrayElement(['Sakit', 'Aktif', 'Izin', 'Pasif'])
      };
    }

    // Generate sample driver records
    for (let i = 1; i <= 20; i++) {
      sampleDrivers.push(generateRandomDriverData(i));
    }

    this.records = sampleDrivers;
  },

  // Get all drivers with optional filtering and search
  async getAll({ name, search }: { name?: string; search?: string }) {
    let drivers = [...this.records];

    // Filter drivers based on name
    if (name) {
      drivers = drivers.filter((driver) =>
        driver.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Search functionality across multiple fields
    if (search) {
      drivers = matchSorter(drivers, search, {
        keys: ['name', 'email', 'phone', 'status']
      });
    }

    return drivers;
  },

  // Get paginated results with optional filtering and search
  async getDrivers({
    page = 1,
    limit = 10,
    name,
    search
  }: {
    page?: number;
    limit?: number;
    name?: string;
    search?: string;
  }) {
    const allDrivers = await this.getAll({ name, search });
    const totalDrivers = allDrivers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedDrivers = allDrivers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample driver data for testing and learning purposes',
      total_drivers: totalDrivers,
      offset,
      limit,
      drivers: paginatedDrivers
    };
  },

  // Get a specific driver by its ID
  async getDriverById(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    // Find the driver by its ID
    const driver = this.records.find((driver) => driver.id === id);

    if (!driver) {
      return {
        success: false,
        message: `Driver with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Driver with ID ${id} found`,
      driver
    };
  }
};

// Initialize sample drivers
fakeDriver.initialize();

export type Keuangan = {
  id: number;
  invoice_id: number;
  client_name: string;
  car_model: string;
  rate_per_day: number;
  rate: number;
  rental_period: string;
  amount: string;
  due_date: string;
  status: string; // Status, e.g., Paid, Unpaid, Pending
};

export const fakeKeuangan = {
  records: [] as Keuangan[],

  // Initialize with sample data
  initialize() {
    const carModels = [
      'Toyota Corolla',
      'Honda Civic',
      'Ford Focus',
      'Chevrolet Malibu',
      'Nissan Altima',
      'Hyundai Elantra',
      'Volkswagen Passat',
      'Subaru Impreza',
      'Mazda 3',
      'Kia Optima'
    ];
    const clientNames = ['Alice Johnson', 'John Doe', 'Petrus Sihomboing'];

    const statuses = ['Paid', 'Unpaid', 'Pending'];

    function generateRandomKeuanganData(id: number): Keuangan {
      return {
        id,
        invoice_id: faker.number.int({ min: 1000, max: 9999 }),
        car_model: faker.helpers.arrayElement(carModels),
        client_name: faker.helpers.arrayElement(clientNames),
        rate_per_day: faker.number.int({ min: 50, max: 300 }),
        rate: faker.number.int({ min: 200, max: 5000 }),
        rental_period: `${faker.number.int({
          min: 1,
          max: 30
        })} days`,
        amount: faker.finance.amount({ min: 100, max: 10000, dec: 2 }),
        due_date: faker.date.future().toISOString().split('T')[0],
        status: faker.helpers.arrayElement(statuses)
      };
    }

    // Generate sample records
    for (let i = 1; i <= 20; i++) {
      this.records.push(generateRandomKeuanganData(i));
    }
  },

  // Get all records with optional filtering and search
  async getAll({ search }: { search?: string }) {
    let records = [...this.records];

    // Search functionality across multiple fields
    if (search) {
      records = matchSorter(records, search, {
        keys: ['invoice_id', 'car_model', 'status']
      });
    }

    return records;
  },

  // Get paginated results with optional filtering and search
  async getKeuangan({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const allRecords = await this.getAll({ search });
    const totalRecords = allRecords.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedRecords = allRecords.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample financial data for testing and learning purposes',
      total_records: totalRecords,
      offset,
      limit,
      records: paginatedRecords
    };
  },

  // Get a specific record by its ID
  async getKeuanganById(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    // Find the record by its ID
    const record = this.records.find((record) => record.id === id);

    if (!record) {
      return {
        success: false,
        message: `Record with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Record with ID ${id} found`,
      record
    };
  }
};

// Initialize sample records
fakeKeuangan.initialize();
export type Cashflow = {
  id: number;
  expenses: string;
  category: string;
  quantity: string;
  amount: string;
  date: string;
  status: string; // e.g., Approved, Pending, Rejected
};

export const fakeCashflow = {
  records: [] as Cashflow[],

  // Initialize with sample data
  initialize() {
    const expenseTypes = [
      'Office Supplies',
      'Travel',
      'Entertainment',
      'Utilities',
      'Marketing',
      'Equipment'
    ];

    const categories = ['Operational', 'Capital', 'Administrative', 'Sales'];
    const statuses = ['Approved', 'Pending', 'Rejected'];

    function generateRandomCashflowData(id: number): Cashflow {
      return {
        id,
        expenses: faker.helpers.arrayElement(expenseTypes),
        category: faker.helpers.arrayElement(categories),
        quantity: faker.number.int({ min: 1, max: 100 }).toString(),
        amount: faker.finance.amount({ min: 10, max: 5000, dec: 2 }),
        date: faker.date.past().toISOString().split('T')[0],
        status: faker.helpers.arrayElement(statuses)
      };
    }

    // Generate sample records
    for (let i = 1; i <= 20; i++) {
      this.records.push(generateRandomCashflowData(i));
    }
  },

  // Get all records with optional filtering and search
  async getAll({ search }: { search?: string }) {
    let records = [...this.records];

    // Search functionality across multiple fields
    if (search) {
      records = matchSorter(records, search, {
        keys: ['expenses', 'category', 'status']
      });
    }

    return records;
  },

  // Get paginated results with optional filtering and search
  async getCashflow({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const allRecords = await this.getAll({ search });
    const totalRecords = allRecords.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedRecords = allRecords.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample cashflow data for testing and learning purposes',
      total_records: totalRecords,
      offset,
      limit,
      records: paginatedRecords
    };
  },

  // Get a specific record by its ID
  async getCashflowById(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    // Find the record by its ID
    const record = this.records.find((record) => record.id === id);

    if (!record) {
      return {
        success: false,
        message: `Record with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Record with ID ${id} found`,
      record
    };
  }
};
// Initialize sample records
fakeCashflow.initialize();
