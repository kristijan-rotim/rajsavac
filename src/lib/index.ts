import { DB_URL } from '$env/static/private';
import PocketBase from 'pocketbase';

export const pb = new PocketBase(DB_URL);