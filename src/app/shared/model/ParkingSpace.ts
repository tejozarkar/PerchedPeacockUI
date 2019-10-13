import { Address } from './Address';

export class ParkingSpace {

    id?: string;
    name: string;
    costPerHour?: number;
    twoWheelerParkingCount?: number;
    fourWheelerParkingCount?: number;
    address: Address;

    constructor(){}
}