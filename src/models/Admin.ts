import { hash, compare } from 'bcryptjs';
import { ObjectId } from 'mongodb';

export interface Admin {
  _id?: ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
} 