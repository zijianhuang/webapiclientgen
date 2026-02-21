export namespace DebugWeb_Data_Client {
	export interface DotNetJsonType {
		description?: string | null;

		/**
		 * Required. Null or empty is invalid.
		 * JSON Required. Null or empty may be fine.
		 */
		doubleRequired: string;

		/**
		 * Required means the property is required and cannot be null or empty string.
		 * Required. Null or empty is invalid.
		 */
		location: string;

		/**
		 * JsonRequired means the property is required in JSON, but it can be null or empty string.
		 * JSON Required. Null or empty may be fine.
		 */
		name: string;
	}

}

export namespace DemoWebApi_DemoDataEx_Client {
	export interface TextJsonPerson {

		/** Required. Null or empty is invalid. */
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

