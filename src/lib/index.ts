import { env } from '$env/dynamic/private';
import PocketBase from 'pocketbase';

const dbUrl = env.DB_URL;

export const pb = new PocketBase(dbUrl);