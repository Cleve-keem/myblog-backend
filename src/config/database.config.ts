import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const client = new MongoClient(DATABASE_URL as string);

let database: Db;

export async function connectDB(): Promise<Db> {
  if (!database) {
    await client.connect();
    database = client.db(process.env.DATABASE_NAME);
    console.log("Connected to MongoDB");
  }

  return database;
}

export function getDB(): Db {
  if (!database) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return database;
}


