import { Entry } from '../api/api.types';
export interface StoreModel {
  entries: { [key: string]: Entry };
}
