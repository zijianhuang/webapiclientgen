module DemoWebApi.DemoData.Client{
    export enum AddressType {Postal, Residential}

    export enum Days {Sat=1, Sun=2, Mon=3, Tue=4, Wed=5, Thu=6, Fri=7}

    export interface Address {
        Street1: string;
        Street2: string;
        City: string;
        State: string;
        PostalCode: string;
        Country: string;
        Type: DemoWebApi.DemoData.Client.AddressType;
        Location: DemoWebApi.DemoData.Another.Client.MyPoint;
    }

    export interface Entity {
        Id: number;
        Name: string;
        Addresses: Array<DemoWebApi.DemoData.Client.Address>;
    }

    export interface Person extends DemoWebApi.DemoData.Client.Entity {
        Surname: string;
        GivenName: string;
        BirthDate?: Date;
        Id: number;
        Name: string;
        Addresses: Array<DemoWebApi.DemoData.Client.Address>;
    }

    export interface Company extends DemoWebApi.DemoData.Client.Entity {
        BusinessNumber: string;
        BusinessNumberType: string;
        TextMatrix: Array<Array<string>>;
        Id: number;
        Name: string;
        Addresses: Array<DemoWebApi.DemoData.Client.Address>;
        Int3D: Array<Array<Array<number>>>;
    }

}

module DemoWebApi.DemoData.Another.Client{
    export interface MyPoint {
        X: number;
        Y: number;
    }

}

