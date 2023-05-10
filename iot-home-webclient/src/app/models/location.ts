import { Room } from './room';

export interface Location {
  id: string;
  name: string;
  rooms: Room[];
}
