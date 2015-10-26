namespace DemoWebApi_DemoData_Client {
    export enum AddressType {Postal, Residential}

    export enum Days {Sat=1, Sun=2, Mon=3, Tue=4, Wed=5, Thu=6, Fri=7}

    export interface Address {
        Street1: string;
        Street2: string;
        City: string;
        State: string;
        PostalCode: string;
        Country: string;
        Type: DemoWebApi_DemoData_Client.AddressType;
        Location: DemoWebApi_DemoData_Another_Client.MyPoint;
    }

    export interface Entity {
        Id: number;
        Name: string;
        Addresses: Array<DemoWebApi_DemoData_Client.Address>;
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {
        Surname: string;
        GivenName: string;
        BirthDate?: Date;
        Id: number;
        Name: string;
        Addresses: Array<DemoWebApi_DemoData_Client.Address>;
    }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {
        BusinessNumber: string;
        BusinessNumberType: string;
        TextMatrix: Array<Array<string>>;
        Id: number;
        Name: string;
        Addresses: Array<DemoWebApi_DemoData_Client.Address>;
        Int3D: Array<Array<Array<number>>>;
    }

}

namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        X: number;
        Y: number;
    }

}

