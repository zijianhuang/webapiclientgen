namespace DemoWebApi_DemoData_Client {
    export enum AddressType { Postal, Residential }

    export enum Days { Sat = 1, Sun = 2, Mon = 3, Tue = 4, Wed = 5, Thu = 6, Fri = 7 }

    export interface Address {
        id?: string;
        street1?: string;
        street2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
        type?: DemoWebApi_DemoData_Client.AddressType;
        location?: DemoWebApi_DemoData_Another_Client.MyPoint;
    }

    export interface Entity {
        id?: string;
        name: string;
        addresses?: Array<DemoWebApi_DemoData_Client.Address>;
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {
        surname?: string;
        givenName?: string;
        birthDate?: Date;
    }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {
        businessNumber?: string;
        businessNumberType?: string;
        textMatrix?: Array<Array<string>>;
        int2DJagged?: Array<Array<number>>;
        int2D?: number[][];
        lines?: Array<string>;
    }

    export interface MyPeopleDic {
        dic?: { [id: string]: DemoWebApi_DemoData_Client.Person };
        anotherDic?: { [id: string]: string };
        intDic?: { [id: number]: string };
    }

}

namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        x: number;
        y: number;
    }

}
