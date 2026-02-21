export namespace DebugWeb_Data_Client {
	export interface DotNetJsonType {
		description?: string | null;
		location: string;
		name: string;
	}

}

export namespace DemoWebApi_DemoDataEx_Client {
	export interface TextJsonPerson {

		/** Required. Not null or empty. */
		givenName?: string | null;
		surname: string;
	}

	export interface Trust {
		trustee?: string | null;
	}

	export interface ZListCheck {
		bytesHashSet?: Array<number>;
		decimals?: Array<number>;
		numbers?: Array<number>;
		people2?: Array<DemoWebApi_DemoDataEx_Client.TextJsonPerson>;
		strings?: Array<string>;
		trusts?: Array<DemoWebApi_DemoDataEx_Client.Trust>;
	}

}

