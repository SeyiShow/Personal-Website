import clientPromise from "./mongodb";

const DB_NAME = process.env.MONGODB_DB || "Oluwaseyi";

export async function getDatabase() {
    const client = await clientPromise;
    return client.db(DB_NAME);
}

export async function getCollection(collectionName) {
    const db = await getDatabase();
    return db.collection(collectionName);
}
