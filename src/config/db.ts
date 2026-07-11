import { MongoClient, ServerApiVersion, Db } from "mongodb";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing in .env");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db;

export const connectDB = async () => {
  try {
    await client.connect();

    db = client.db("Aquatic_PlantoPedia");

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export { db };