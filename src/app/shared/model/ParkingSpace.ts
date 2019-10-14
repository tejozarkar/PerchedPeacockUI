import { Address } from './Address';

export class ParkingSpace {

    id?: string;
    name: string;
    costPerHourTwoWheeler?: number;
    costPerHourFourWheeler?: number;
    twoWheelerParkingCount?: number;
    fourWheelerParkingCount?: number;
    address: Address;

    constructor(){}
}