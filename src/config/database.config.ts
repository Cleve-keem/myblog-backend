import { MongoClient, Db, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

// Safety check
if (!DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in environment variables.");
}
if (!DATABASE_NAME) {
  throw new Error("❌ DATABASE_NAME is not defined in environment variables.");
}

// Create client instance
const client = new MongoClient(DATABASE_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 20000, // safer for cloud deployments
});

let database: Db | null = null;

// Connect function
export async function connectDB(): Promise<Db> {
  if (!database) {
    try {
      await client.connect();
      database = client.db(DATABASE_NAME);
      console.log("✅ Connected to MongoDB Atlas successfully");
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      throw error;
    }
  }

  return database;
}

// Getter
export function getDB(): Db {
  if (!database) {
    throw new Error("❌ Database not initialized. Call connectDB() first.");
  }
  return database;
}

// import { MongoClient, Db, ServerApiVersion } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config();

// const DATABASE_URL = process.env.DATABASE_URL;

// const client = new MongoClient(DATABASE_URL as string, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
//   timeoutMS: 10000,
// });

// let database: Db;

// export async function connectDB(): Promise<Db> {
//   if (!database) {
//     await client.connect();
//     database = client.db(process.env.DATABASE_NAME);
//     console.log("Connected to MongoDB");
//   }

//   return database;
// }

// export function getDB(): Db {
//   if (!database) {
//     throw new Error("Database not initialized. Call connectDB() first.");
//   }
//   return database;
// }
