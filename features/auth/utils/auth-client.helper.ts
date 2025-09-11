import { ADMIN } from '../constants/config';

export const isAdmin = (role: string) => role === ADMIN;
