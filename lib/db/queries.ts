import 'server-only';

// import { genSaltSync, hashSync } from 'bcrypt-ts';
import { and, asc, desc, eq, gt, sql, isNull } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { auth } from '@/app/(auth)/auth';
// import { db } from './index';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(client, { schema });

import {
  user,
  type User,
  buyOrder,
  type BuyOrder,
  sellOrder,
  type SellOrder,
  location,
  type Location,
  supplier,
  type Supplier,
  fleet,
  type Fleet,
  tradingPair,
  type TradingPair,
  supplierTradingPair,
  type SupplierTradingPair,
  UserRole,
  product,
  type Product,
  type NewProduct,
} from './schema';

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// biome-ignore lint: Forbidden non-null assertion.
// const client = postgres(process.env.POSTGRES_URL!);
// const db = drizzle(client);

export async function getUser(phone: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.phone, phone));
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
}

export async function createUser(phone: string, otp: string) {
  // const salt = genSaltSync(10);
  // const hash = hashSync(password, salt);
  try {
    console.log('Creating user with role:', UserRole.CUSTOMER);
    return await db.insert(user).values({
      phone,
      // password: hash,
      otp,
      role: UserRole.CUSTOMER, // Use the enum value
      createdAt: new Date(),
      otpCreatedAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to create user in database:', error);
    throw error;
  }
}

export async function updateUser({
  phone,
  otp
}: {
  phone: string;
  otp: string;
}) {
  try {
    return await db.update(user).set({
      // id,
      otp,
      otpCreatedAt: new Date(),
    }).where(eq(user.phone, phone));
  } catch (error) {
    console.error('Failed to update user in database');
    throw error;
  }
}

export async function getBuyOrders(): Promise<Array<BuyOrder>> {
  try {
    // return await db.select().from(buyOrder).orderBy(asc(buyOrder.price), desc(buyOrder.createdAt));
    return await db.select().from(buyOrder).orderBy(desc(buyOrder.createdAt));
  } catch (error) {
    console.error('Failed to get buyOrder from database');
    throw error;
  }
}

export async function getBuyOrder(id: string): Promise<Array<BuyOrder>> {
  try {
    return await db.select().from(buyOrder).where(eq(buyOrder.id, id));
  } catch (error) {
    console.error('Failed to get buyOrder from database');
    throw error;
  }
}

export async function getBuyOrdersByUserId(userId: string): Promise<Array<BuyOrder>> {
  try {
    return await db.select().from(buyOrder).where(eq(buyOrder.userId, userId)).orderBy(desc(buyOrder.createdAt));
  } catch (error) {
    console.error('Failed to get orders by userId from database', error);
    throw error;
  }
}

export async function getSellOrders(): Promise<Array<SellOrder>> {
  try {
    return await db.select().from(sellOrder).orderBy(desc(sellOrder.createdAt));
  } catch (error) {
    console.error('Failed to get sellOrder from database');
    throw error;
  }
}

export async function getSellOrdersByUserId(userId: string): Promise<Array<SellOrder>> {
  try {
    // First get the supplier for this user
    const supplierResult = await db
      .select()
      .from(supplier)
      .where(
        and(
          eq(supplier.managerId, userId),
          eq(supplier.isDeleted, false)
        )
      );

    if (!supplierResult.length) {
      return [];
    }

    // Then get their sell orders
    return await db
      .select()
      .from(sellOrder)
      .where(eq(sellOrder.supplierId, supplierResult[0].id))
      .orderBy(desc(sellOrder.createdAt));
  } catch (error) {
    console.error('Failed to get sell orders by userId from database', error);
    throw error;
  }
}

// Function to find the best supplier based on buyer's location
export async function findBestsupplier(buyerLng: string, buyerLat: string) {
  try {
    const result = await db
      .select()
      .from(sellOrder)
      .where(
        and(
          eq(sellOrder.side, 's'), // Only select suppliers
          eq(sellOrder.status, 'پرداخت شده') // Optionally filter by status
        )
      )
      .orderBy(
        sql`6371 * acos(cos(radians(${buyerLat})) * cos(radians(${sellOrder.lat})) * 
        cos(radians(${sellOrder.lng}) - radians(${buyerLng})) + 
        sin(radians(${buyerLat})) * sin(radians(${sellOrder.lat}))) ASC`
      )
    // .limit(1); // Get only the closest supplier

    return result;
  } catch (error) {
    console.error('Failed to find the best supplier based on buyer location', error);
    throw error;
  }
}

export async function saveBuyOrder({
  // id,
  userId,
  tradingPairId,
  locationId,
  side,
  price,
  city,
  lng,
  lat,
  unit,
  volume,
  status,
  // title,
}: {
  // id: string;
  userId: string;
  tradingPairId: string;
  locationId: string;
  side: string;
  price: string;
  city: string;
  lng: string;
  lat: string;
  unit: string;
  volume: string;
  status: string;
  // title: string;
}) {
  try {
    return await db.insert(buyOrder).values({
      // id,
      userId,
      tradingPairId,
      locationId,
      side,
      price,
      city,
      lng,
      lat,
      unit,
      volume,
      status,
      createdAt: new Date(),
      // title,
    });
  } catch (error) {
    console.error('Failed to save chat in database');
    throw error;
  }
}

export async function getLocation(id: string): Promise<Array<Location>> {
  try {
    return await db.select().from(location).where(eq(location.id, id));
  } catch (error) {
    console.error('Failed to get location from database');
    throw error;
  }
}

export async function updateLocation({
  id,
  city,
  lng,
  lat,
}: {
  id: string;
  city: string;
  lng: string;
  lat: string;
}) {
  try {
    return await db.update(location).set({
      // id,
      city,
      lng,
      lat,
      // createdAt: new Date(),
    }).where(eq(location.id, id));
  } catch (error) {
    console.error('Failed to update location in database');
    throw error;
  }
}

export async function getSuppliers(): Promise<Array<Supplier & { manager: User | null }>> {
  try {
    const results = await db
      .select()
      .from(supplier)
      .leftJoin(user, eq(supplier.managerId, user.id))
      .where(eq(supplier.isDeleted, false))
      .orderBy(desc(supplier.createdAt));

    return results.map(row => ({
      ...row.Supplier,
      manager: row.User,
    }));
  } catch (error) {
    console.error('Failed to get suppliers from database');
    throw error;
  }
}

export async function getSupplier(id: string): Promise<Array<Supplier & { manager: User | null }>> {
  try {
    const results = await db
      .select()
      .from(supplier)
      .leftJoin(user, eq(supplier.managerId, user.id))
      .where(
        and(
          eq(supplier.id, id),
          eq(supplier.isDeleted, false)
        )
      );

    return results.map(row => ({
      ...row.Supplier,
      manager: row.User,
    }));
  } catch (error) {
    console.error('Failed to get supplier from database');
    throw error;
  }
}

export async function getUsers(): Promise<Array<User>> {
  try {
    return await db
      .select()
      .from(user)
      .orderBy(asc(user.phone));
  } catch (error) {
    console.error('Failed to get users from database');
    throw error;
  }
}

export async function createSupplier({
  name,
  email,
  phone,
  status,
  managerId,
  city,
  lng,
  lat,
}: {
  name: string;
  email: string;
  phone: string;
  status: string;
  managerId?: string;
  city?: string;
  lng?: string;
  lat?: string;
}): Promise<{ id: string }> {
  try {
    const [result] = await db
      .insert(supplier)
      .values({
        name,
        email,
        phone,
        status,
        managerId: managerId || null,
        city: city || null,
        lng: lng || null,
        lat: lat || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({ id: supplier.id });

    return { id: result.id };
  } catch (error) {
    console.error('Failed to create supplier in database');
    throw error;
  }
}

export async function updateSupplier({
  id,
  name,
  email,
  phone,
  status,
  managerId,
  city,
  lng,
  lat,
}: {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  managerId: string;
  city?: string;
  lng?: string;
  lat?: string;
}) {
  try {
    return await db
      .update(supplier)
      .set({
        name,
        email,
        phone,
        status,
        managerId,
        city: city || null,
        lng: lng || null,
        lat: lat || null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(supplier.id, id),
          eq(supplier.isDeleted, false)
        )
      );
  } catch (error) {
    console.error('Failed to update supplier in database');
    throw error;
  }
}

export async function deleteSupplier(id: string) {
  try {
    return await db
      .update(supplier)
      .set({
        isDeleted: true,
        updatedAt: new Date(),
      })
      .where(eq(supplier.id, id));
  } catch (error) {
    console.error('Failed to delete supplier from database');
    throw error;
  }
}

export async function getFleets(): Promise<Array<Fleet & { manager: User | null }>> {
  try {
    const results = await db
      .select()
      .from(fleet)
      .leftJoin(user, eq(fleet.managerId, user.id))
      .where(eq(fleet.isDeleted, false))
      .orderBy(desc(fleet.createdAt));

    return results.map(row => ({
      ...row.Fleet,
      manager: row.User,
    }));
  } catch (error) {
    console.error('Failed to get fleets from database');
    throw error;
  }
}

export async function getFleet(id: string): Promise<Array<Fleet & { manager: User | null }>> {
  try {
    const results = await db
      .select()
      .from(fleet)
      .leftJoin(user, eq(fleet.managerId, user.id))
      .where(
        and(
          eq(fleet.id, id),
          eq(fleet.isDeleted, false)
        )
      );

    return results.map(row => ({
      ...row.Fleet,
      manager: row.User,
    }));
  } catch (error) {
    console.error('Failed to get fleet from database');
    throw error;
  }
}

export async function createFleet({
  name,
  managerId,
}: {
  name: string;
  managerId: string;
}) {
  try {
    return await db.insert(fleet).values({
      name,
      managerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to create fleet in database');
    throw error;
  }
}

export async function updateFleet({
  id,
  name,
  status,
  managerId,
}: {
  id: string;
  name: string;
  status: string;
  managerId: string;
}) {
  try {
    return await db
      .update(fleet)
      .set({
        name,
        status,
        managerId,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(fleet.id, id),
          eq(fleet.isDeleted, false)
        )
      );
  } catch (error) {
    console.error('Failed to update fleet in database');
    throw error;
  }
}

export async function deleteFleet(id: string) {
  try {
    return await db
      .update(fleet)
      .set({
        isDeleted: true,
        updatedAt: new Date(),
      })
      .where(eq(fleet.id, id));
  } catch (error) {
    console.error('Failed to delete fleet from database');
    throw error;
  }
}

export async function getTradingPairs() {
  try {
    return await db.select().from(tradingPair);
  } catch (error) {
    console.error('Failed to get trading pairs from database');
    throw error;
  }
}

export async function getTradingPairById(id: string): Promise<TradingPair | null> {
  try {
    const result = await db.select().from(tradingPair).where(eq(tradingPair.id, id));
    return result[0] || null;
  } catch (error) {
    console.error('Failed to get trading pair from database');
    throw error;
  }
}

export async function getSupplierTradingPairs(supplierId: string): Promise<Array<TradingPair>> {
  try {
    const results = await db
      .select({
        id: tradingPair.id,
        baseCurrency: tradingPair.baseCurrency,
        price: tradingPair.price,
        type: tradingPair.type,
        unit: tradingPair.unit,
        imageUrl: tradingPair.imageUrl,
        createdAt: tradingPair.createdAt,
        updatedAt: tradingPair.updatedAt,
        isDeleted: tradingPair.isDeleted,
      })
      .from(supplierTradingPair)
      .innerJoin(tradingPair, eq(supplierTradingPair.tradingPairId, tradingPair.id))
      .where(
        and(
          eq(supplierTradingPair.supplierId, supplierId),
          eq(supplierTradingPair.isDeleted, false)
        )
      );

    return results;
  } catch (error) {
    console.error('Failed to get supplier trading pairs from database');
    throw error;
  }
}

export async function addSupplierTradingPair(supplierId: string, tradingPairId: string) {
  try {
    return await db.insert(supplierTradingPair).values({
      supplierId,
      tradingPairId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to add supplier trading pair to database');
    throw error;
  }
}

export async function removeSupplierTradingPair(supplierId: string, tradingPairId: string) {
  try {
    return await db
      .update(supplierTradingPair)
      .set({
        isDeleted: true,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(supplierTradingPair.supplierId, supplierId),
          eq(supplierTradingPair.tradingPairId, tradingPairId)
        )
      );
  } catch (error) {
    console.error('Failed to remove supplier trading pair from database');
    throw error;
  }
}

export async function updateSupplierTradingPairs(supplierId: string, tradingPairIds: string[]) {
  try {
    // First, mark all existing pairs as deleted
    await db
      .update(supplierTradingPair)
      .set({
        isDeleted: true,
        updatedAt: new Date(),
      })
      .where(eq(supplierTradingPair.supplierId, supplierId));

    // Then, add new pairs or update existing ones
    for (const tradingPairId of tradingPairIds) {
      const existingPair = await db
        .select()
        .from(supplierTradingPair)
        .where(
          and(
            eq(supplierTradingPair.supplierId, supplierId),
            eq(supplierTradingPair.tradingPairId, tradingPairId)
          )
        );

      if (existingPair.length > 0) {
        // Update existing pair
        await db
          .update(supplierTradingPair)
          .set({
            isDeleted: false,
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(supplierTradingPair.supplierId, supplierId),
              eq(supplierTradingPair.tradingPairId, tradingPairId)
            )
          );
      } else {
        // Insert new pair
        await db.insert(supplierTradingPair).values({
          supplierId,
          tradingPairId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
  } catch (error) {
    console.error('Failed to update supplier trading pairs in database');
    throw error;
  }
}

export async function createTradingPair({
  baseCurrency,
  price,
  type,
  unit,
  imageUrl,
}: {
  baseCurrency: string;
  price: string;
  type: string;
  unit: string;
  imageUrl?: string;
}) {
  try {
    await db.insert(tradingPair).values({
      baseCurrency,
      price,
      type,
      unit,
      imageUrl,
    });
  } catch (error) {
    console.error('Error creating trading pair:', error);
    throw error;
  }
}

export async function updateTradingPair({
  id,
  baseCurrency,
  price,
  type,
  unit,
  imageUrl,
}: {
  id: string;
  baseCurrency: string;
  price: string;
  type: string;
  unit: string;
  imageUrl?: string;
}) {
  try {
    await db
      .update(tradingPair)
      .set({
        baseCurrency,
        price,
        type,
        unit,
        imageUrl,
      })
      .where(eq(tradingPair.id, id));
  } catch (error) {
    console.error('Error updating trading pair:', error);
    throw error;
  }
}

export async function deleteTradingPair(id: string) {
  try {
    await db
      .update(tradingPair)
      .set({
        isDeleted: true,
      })
      .where(eq(tradingPair.id, id));
  } catch (error) {
    console.error('Error deleting trading pair:', error);
    throw error;
  }
}

export async function getAllUsers(): Promise<Array<User>> {
  try {
    return await db.select().from(user).orderBy(desc(user.createdAt));
  } catch (error) {
    console.error('Failed to get users from database');
    throw error;
  }
}

export async function updateUserRole({
  id,
  role
}: {
  id: string;
  role: UserRole;
}) {
  try {
    return await db.update(user).set({
      role,
    }).where(eq(user.id, id));
  } catch (error) {
    console.error('Failed to update user role in database');
    throw error;
  }
}

export async function getSupplierByManagerId(managerId: string) {
  const results = await db
    .select({
      supplier: supplier,
      tradingPair: tradingPair
    })
    .from(supplier)
    .leftJoin(
      supplierTradingPair,
      and(
        eq(supplier.id, supplierTradingPair.supplierId),
        eq(supplierTradingPair.isDeleted, false)
      )
    )
    .leftJoin(
      tradingPair,
      and(
        eq(supplierTradingPair.tradingPairId, tradingPair.id),
        eq(tradingPair.isDeleted, false)
      )
    )
    .where(
      and(
        eq(supplier.managerId, managerId),
        eq(supplier.isDeleted, false)
      )
    )

  if (!results.length) {
    return null
  }

  const supplierData = results[0].supplier
  const tradingPairs = results
    .filter(row => row.tradingPair)
    .map(row => row.tradingPair)

  return {
    supplier: supplierData,
    tradingPairs
  }
}

export async function createSupplierSellOrder(
  supplierId: string,
  tradingPairId: string,
  price: string,
  volume: string,
  unit: string,
  city?: string,
  lng?: number,
  lat?: number
): Promise<SellOrder> {
  try {
    const result = await db.insert(sellOrder).values({
      supplierId,
      tradingPairId,
      price,
      volume,
      unit,
      side: 'S',
      status: 'pending',
      createdAt: new Date(),
      city: city || null,
      lng: lng?.toString(),
      lat: lat?.toString()
    }).returning();

    return result[0];
  } catch (error) {
    console.error('Failed to create sell order in database', error);
    throw error;
  }
}

export async function createBuyOrder(
  userId: string,
  tradingPairId: string,
  price: string,
  volume: string,
  unit: string,
  city: string,
  lng: number,
  lat: number,
  authority?: string
): Promise<BuyOrder> {
  try {
    // First create a location
    const locationResult = await db.insert(location).values({
      city,
      lng: lng.toString(),
      lat: lat.toString(),
      createdAt: new Date()
    }).returning()

    const locationId = locationResult[0].id

    // Then create the buy order with the location ID
    const result = await db.insert(buyOrder).values({
      userId,
      tradingPairId,
      locationId,
      side: 'B',
      price: price.toString(),
      volume: volume.toString(),
      unit,
      city,
      lng: lng.toString(),
      lat: lat.toString(),
      status: 'pending',
      authority,
      createdAt: new Date()
    }).returning()

    return result[0]
  } catch (error) {
    console.error('Failed to create buy order:', error)
    throw error
  }
}

export async function getBuyOrderById(id: string): Promise<BuyOrder | null> {
  try {
    const result = await db
      .select()
      .from(buyOrder)
      .where(eq(buyOrder.id, id))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error('Failed to get buy order:', error)
    return null
  }
}

export async function getSellOrderById(id: string): Promise<SellOrder | null> {
  try {
    const result = await db
      .select()
      .from(sellOrder)
      .where(eq(sellOrder.id, id))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error('Failed to get sell order:', error)
    return null
  }
}

export async function getProducts(): Promise<Array<Product>> {
  try {
    return await db
      .select()
      .from(product)
      .where(eq(product.isDeleted, false))
      .orderBy(desc(product.createdAt));
  } catch (error) {
    console.error('Failed to get products from database');
    throw error;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await db
      .select()
      .from(product)
      .where(
        and(
          eq(product.slug, slug),
          eq(product.isDeleted, false)
        )
      );
    return products[0] || null;
  } catch (error) {
    console.error('Failed to get product by slug from database');
    throw error;
  }
}

export async function createProduct({
  name,
  description,
  price,
  imageUrl,
  slug,
}: {
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
  slug: string;
}): Promise<Product> {
  try {
    const newProduct: NewProduct = {
      name,
      description,
      price,
      imageUrl,
      slug,
    };
    
    const result = await db.insert(product).values(newProduct).returning();
    return result[0];
  } catch (error) {
    console.error('Failed to create product in database');
    throw error;
  }
}

export async function updateBuyOrderStatusByAuthority(authority: string, status: string) {
  try {
    return await db
      .update(buyOrder)
      .set({ 
        status,
        updatedAt: new Date()
      })
      .where(eq(buyOrder.authority, authority));
  } catch (error) {
    console.error('Failed to update buy order status:', error);
    throw error;
  }
}

export async function getBuyOrderByAuthority(authority: string): Promise<BuyOrder | null> {
  try {
    const result = await db
      .select()
      .from(buyOrder)
      .where(eq(buyOrder.authority, authority))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error('Failed to get buy order by authority:', error);
    throw error;
  }
}
