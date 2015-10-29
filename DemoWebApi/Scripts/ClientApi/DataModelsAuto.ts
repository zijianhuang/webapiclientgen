namespace DemoWebApi_Models_Client {
    export interface ExternalLoginViewModel {
        Name?: string;
        Url?: string;
        State?: string;
    }

    export interface ManageInfoViewModel {
        LocalLoginProvider?: string;
        Email?: string;
        Logins?: void;
        ExternalLoginProviders?: void;
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

