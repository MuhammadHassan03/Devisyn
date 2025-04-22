import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'devisyn';

async function setupAdmin() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const adminCollection = db.collection('Admin');

    // Check if admin already exists
    const existingAdmin = await adminCollection.findOne({ email: 'admin@devisyn.com' });
    
    if (!existingAdmin) {
      // Create new admin
      const hashedPassword = await hash('admin123', 10);
      
      await adminCollection.insertOne({
        email: 'admin@devisyn.com',
        password: hashedPassword,
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error setting up admin:', error);
  } finally {
    await client.close();
  }
}

setupAdmin(); 