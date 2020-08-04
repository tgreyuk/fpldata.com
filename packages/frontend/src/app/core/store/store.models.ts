import { Entry } from '../api/api.types';
export interface StoreModel {
  routeId: string;
  entries: { [key: string]: Entry };
}
