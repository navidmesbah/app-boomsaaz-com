import type { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  char,
  varchar,
  timestamp,
  // json,
  uuid,
  text,
  // primaryKey,
  // foreignKey,
  // boolean,
  unique,
  numeric,
  boolean
} from 'drizzle-orm/pg-core';

// Define available roles
export const UserRole = {
  ADMIN: 'admin',
  STAFF: 'staff',
  SUPPLIER: 'supplier',
  DRIVER: 'driver',
  CUSTOMER: 'customer',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const user = pgTable('User', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }),
  phone: varchar('phone', { length: 12 }).notNull(),
  password: varchar('password', { length: 64 }),
  otp: varchar('otp', { length: 5 }),
  role: varchar('role', { length: 20 }).notNull().default(UserRole.CUSTOMER),
  createdAt: timestamp('createdAt').notNull(),
  otpCreatedAt: timestamp('otpCreatedAt').notNull(),
});

export type User = InferSelectModel<typeof user>;

export const location = pgTable(
  'Location',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    city: text().notNull(),
    lng: numeric().notNull(),
    lat: numeric().notNull(),
    createdAt: timestamp('createdAt').notNull(),
  }
);

export type Location = InferSelectModel<typeof location>;

export const tradingPair = pgTable('TradingPair', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  baseCurrency: varchar('baseCurrency').notNull(),
  price: varchar('price').notNull(),
  type: varchar('type').notNull(),
  unit: varchar('unit').notNull(),
  imageUrl: varchar('imageUrl'),
  createdAt: timestamp('createdAt', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).notNull().defaultNow(),
  isDeleted: boolean('isDeleted').notNull().default(false),
});

export type TradingPair = typeof tradingPair.$inferSelect;
export type NewTradingPair = typeof tradingPair.$inferInsert;

export const buyOrder = pgTable(
  'BuyOrder',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userId: uuid('userId')
      .notNull()
      .references(() => user.id),
    locationId: uuid('locationId')
      .notNull()
      .references(() => location.id),
    tradingPairId: uuid('tradingPairId').notNull(),
    side: char().notNull(),
    price: numeric().notNull(),
    city: text().notNull(),
    lng: numeric().notNull(),
    lat: numeric().notNull(),
    unit: text().notNull(),
    volume: numeric().notNull(),
    status: text().notNull(),
    authority: text(),
    createdAt: timestamp('createdAt').notNull(),
    updatedAt: timestamp('updatedAt'),
  }
);

export type BuyOrder = InferSelectModel<typeof buyOrder>;

export const sellOrder = pgTable(
  'SellOrder',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    supplierId: uuid('supplierId')
      .notNull()
      .references(() => supplier.id),
    tradingPairId: uuid('tradingPairId')
      .notNull()
      .references(() => tradingPair.id),
    side: char().notNull(),
    price: numeric().notNull(),
    unit: text().notNull(),
    volume: numeric().notNull(),
    status: text().notNull(),
    city: text(),
    lng: numeric(),
    lat: numeric(),
    createdAt: timestamp('createdAt').notNull(),
  }
);

export type SellOrder = InferSelectModel<typeof sellOrder>;

export const trade = pgTable(
  'Trade',
  {
    id: uuid('id').notNull().defaultRandom(),
    tradingPairId: uuid('tradingPairId').notNull(),
    buyOrderId: uuid('buyOrderId').notNull(),
    sellOrderId: uuid('sellOrderId').notNull(),
    price: numeric().notNull(),
    delta: numeric().notNull(),
  }
);

export type Trade = InferSelectModel<typeof trade>;

export const supplier = pgTable('Supplier', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  city: text('city'),
  lng: numeric('lng'),
  lat: numeric('lat'),
  managerId: uuid('managerId').references(() => user.id),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  isDeleted: boolean('isDeleted').notNull().default(false),
});

export type Supplier = InferSelectModel<typeof supplier>;

export const supplierTradingPair = pgTable('SupplierTradingPair', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  supplierId: uuid('supplierId')
    .notNull()
    .references(() => supplier.id),
  tradingPairId: uuid('tradingPairId')
    .notNull()
    .references(() => tradingPair.id),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  isDeleted: boolean('isDeleted').notNull().default(false),
}, (table) => ({
  supplierTradingPairUnique: unique().on(table.supplierId, table.tradingPairId),
}));

export type SupplierTradingPair = InferSelectModel<typeof supplierTradingPair>;

export const fleet = pgTable('Fleet', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  managerId: uuid('managerId').references(() => user.id).notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  isDeleted: boolean('isDeleted').notNull().default(false),
});

export type Fleet = InferSelectModel<typeof fleet>;

export const product = pgTable('Product', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: numeric('price').notNull(),
  imageUrl: text('imageUrl'),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  isDeleted: boolean('isDeleted').notNull().default(false),
});

export type Product = InferSelectModel<typeof product>;
export type NewProduct = typeof product.$inferInsert;
