namespace DemoWebApi_DemoData_Client {
    export interface Constants {
    }

    export enum AddressType {Postal, Residential}

    export enum MyEnumType {First=1, Two=2}

    export enum Days {Sat=1, Sun=2, Mon=3, Tue=4, Wed=5, Thu=6, Fri=7}

    export interface Address {
        Id?: string;
        Entity?: DemoWebApi_DemoData_Client.Entity;
        EntityId?: string;
        Street1?: string;
        Street2?: string;
        City?: string;
        State?: string;
        PostalCode?: string;
        Country?: string;
        Type?: DemoWebApi_DemoData_Client.AddressType;
        Location?: DemoWebApi_DemoData_Another_Client.MyPoint;
    }

    export interface Entity {
        Id?: string;
        Name?: string;
        Addresses?: Array<DemoWebApi_DemoData_Client.Address>;
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {
        Surname?: string;
        GivenName?: string;
        BirthDate?: Date;
    }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {
        BusinessNumber?: string;
        BusinessNumberType?: string;
        TextMatrix?: Array<Array<string>>;
        Int3D?: Array<Array<Array<number>>>;
        Lines?: Array<string>;
    }

}

namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        X?: number;
        Y?: number;
    }

}

namespace DemoWebApi_Models_Client {
    export interface AddExternalLoginBindingModel {
        ExternalAccessToken?: string;
    }

    export interface ChangePasswordBindingModel {
        OldPassword?: string;
        NewPassword?: string;
        ConfirmPassword?: string;
    }

    export interface RegisterBindingModel {
        Email?: string;
        Password?: string;
        ConfirmPassword?: string;
    }

    export interface RegisterExternalBindingModel {
        Email?: string;
    }

    export interface RemoveLoginBindingModel {
        LoginProvider?: string;
        ProviderKey?: string;
    }

    export interface SetPasswordBindingModel {
        NewPassword?: string;
        ConfirmPassword?: string;
    }

    export interface ExternalLoginViewModel {
        Name?: string;
        Url?: string;
        State?: string;
    }

    export interface ManageInfoViewModel {
        LocalLoginProvider?: string;
        Email?: string;
        Logins?: Array<DemoWebApi_Models_Client.UserLoginInfoViewModel>;
        ExternalLoginProviders?: Array<DemoWebApi_Models_Client.ExternalLoginViewModel>;
    }

    export interface UserInfoViewModel {
        Email?: string;
        HasRegistered?: boolean;
        LoginProvider?: string;
    }

    export interface UserLoginInfoViewModel {
        LoginProvider?: string;
        ProviderKey?: string;
    }

}

