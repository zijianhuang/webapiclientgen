import { DemoWebApi_Controllers_Client, DemoWebApi_DemoData_Client, DemoWebApi_DemoData_Base_Client } from './clientapi/WebApiFetchClientAuto';
import { APIConfigConstants } from './testSettings';
import { describe, it, expect } from 'vitest'

export async function errorResponseToString(error: Response | any): Promise<string> {
	let errMsg: string;
	if (error instanceof Response) {
		if (error.status === 0) {
			errMsg = 'No response from backend. Connection is unavailable.';
		} else {
			const text = await error.text();
			if (text) {
				errMsg = `${error.status} - ${error.statusText}: ${text}`;
			} else {
				errMsg = `${error.status} - ${error.statusText}`;
			}
		}

		return errMsg;
	} else {
		errMsg = error.message ? error.message : JSON.stringify(error);
		return errMsg;
	}
}

describe('Basic', () => {
	it('simple 1', () => {
		expect(true).toBeTruthy();
	});

	it('simple 2', () => {
		expect(true).toBeTruthy();
	});
});

const apiBaseUri = APIConfigConstants.apiBaseUri;
console.info('Back apiBaseUri: ' + apiBaseUri);

describe('Values API', () => {
	const service = new DemoWebApi_Controllers_Client.Values(apiBaseUri);

	it('get', () => {
		return service.get().then(
			data => {
				console.debug(data.length);
				expect(data[1]).toBe('value2');
			},
			async error => {
				throw new Error(await errorResponseToString(error));
			}
		);
	});

	it('getByIdAndName', async () => {
		try {
			const data = await service.getByIdOfInt32AndNameOfString(1, 'Abc');
			console.debug(data.length);
			expect(data).toBe('Abc1');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getByName', async () => {
		try {
			const data = await service.getByNameOfString('Abc');
			console.debug(data.length);
			expect(data).toBe('ABC');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('Post', async () => {
		try {
			const data = await service.post('Abc');
			console.debug(data.length);
			expect(data).toBe('ABC');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getByIdAndChinese', async () => {
		try {
			const data = await service.getByIdOfInt32AndNameOfString(1, 'something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"');
			console.debug(data.length);
			expect(data).toBe('something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"1');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});


});


describe('Heroes API', () => {
	const service = new DemoWebApi_Controllers_Client.Heroes(apiBaseUri);

	it('getAll', async () => {
		try {
			const data = await service.getHeroes();
			console.debug(data.length);
			expect(data.length).toBeGreaterThan(0);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('Add', async () => {
		try {
			const data = await service.post('somebody');
			expect(data.name).toBe('somebody');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('PostWithQuery', async () => {
		try {
			const data = await service.postWithQuery('somebodyqqq');
			expect(data.name).toBe('somebodyqqq');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('search', async () => {
		try {
			const data = await service.search('Torna');
			console.debug(data.length);
			expect(data.length).toBe(1);
			expect(data[0].name).toBe('Tornado');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});
});

describe('entities API', () => {
	const client = new DemoWebApi_Controllers_Client.Entities(apiBaseUri);

	it('add', async () => {
		const newPerson: DemoWebApi_DemoData_Client.Person = {
			name: 'John Smith' + Date.now().toString(),
			givenName: 'John',
			surname: 'Smith',
			dob: new Date('1977-12-28')
		};
		try {
			const data = await client.createPerson(newPerson);
			expect(data).toBeTruthy();
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('addWthHeadersHandling', async () => {
		const newPerson: DemoWebApi_DemoData_Client.Person = {
			name: 'John Smith' + Date.now().toString(),
			givenName: 'John',
			surname: 'Smith',
			dob: new Date('1977-12-28')
		};
		try {
			const data = await client.createPerson3(newPerson, () => { return { middle: 'Hey' }; });
			expect(data.givenName).toBe('Hey');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('myGenericPerson', async () => {
		const newPerson: DemoWebApi_DemoData_Client.Person = {
			name: 'John Smith',
			givenName: 'John',
			surname: 'Smith',
			dob: new Date('1977-12-28')
		};
		const c: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person> = {
			myK: 123.456,
			myT: 'abc',
			myU: newPerson,
			status: 'OK',
		};
		try {
			const data = await client.getMyGenericPerson(c);
			expect(data.myU?.name).toBe('John Smith');
			expect(data.status).toBe('OK');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});
});

describe('StringData API', () => {
	const service = new DemoWebApi_Controllers_Client.StringData(apiBaseUri);

	it('TestAthletheSearch', async () => {
		try {
			const data = await service.athletheSearch(32, 0, null, null, null);
			expect(data).toBe('"320"');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('TestAthletheSearch2', async () => {
		try {
			const data = await service.athletheSearch(32, 0, null, null, "Search");
			expect(data).toBe('"320Search"');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('TestAthletheSearch3', async () => {
		try {
			const data = await service.athletheSearch(32, 0, null, "Sort", "Search");
			expect(data).toBe('"320SortSearch"');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('TestAthletheSearch4', async () => {
		try {
			const data = await service.athletheSearch(32, 0, "Order", "Sort", "Search");
			expect(data).toBe('"320OrderSortSearch"');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('TestAthletheSearch5', async () => {
		try {
			const data = await service.athletheSearch(32, 0, "Order", null, "Search");
			expect(data).toBe('"320OrderSearch"');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('TestAthletheSearch6', async () => {
		try {
			const data = await service.athletheSearch(32, 0, "Order", "", "Search");
			expect(data).toBe('"320OrderSearch"');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getABCDE', async () => {
		try {
			const data = await service.getABCDE();
			expect(data).toBe('"ABCDE"');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getEmptyString', async () => {
		try {
			const data = await service.getEmptyString();
			expect(data).toBe('""');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});
});

describe('TextData API', () => {
	const service = new DemoWebApi_Controllers_Client.TextData(apiBaseUri);

	it('TestAthletheSearch', async () => {
		try {
			const data = await service.athletheSearch(32, 0, null, null, null);
			expect(data).toBe('320'); // somehow data is number rather than string. AxiosResponse.data is too smart?
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('TestAthletheSearch2', async () => {
		try {
			const data = await service.athletheSearch(32, 0, null, null, 'Search');
			expect(data).toBe('320Search');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getABCDE', async () => {
		try {
			const data = await service.getABCDE();
			expect(data).toBe('ABCDE');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getEmptyString', async () => {
		try {
			const data = await service.getEmptyString();
			expect(data).toBe('');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getNullString', async () => {
		try {
			const data = await service.getNullString();
			expect(data).toBe(null);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});
});

describe('SuperDemo API', () => {
	const service = new DemoWebApi_Controllers_Client.SuperDemo(apiBaseUri);

	it('getBool', async () => {
		try {
			const data = await service.getBool();
			expect(data).toBeTruthy();
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getFloatZero', async () => {
		try {
			const data = await service.getFloatZero();
			expect(data).toBeLessThan(0.000001);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getDoubleZero', async () => {
		try {
			const data = await service.getDoubleZero();
			expect(data).not.toBe(0);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getDecimalZero', async () => {
		try {
			const data = await service.getDecimalZero();
			expect(data).toBe(0);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getIntSquare', async () => {
		try {
			const data = await service.getIntSquare(100);
			expect(data).toBe(10000);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getDecimalSquare', async () => {
		try {
			const data = await service.getDecimalSquare(100);
			expect(data).toBe(10000);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getNullableDecimal', async () => {
		try {
			const data = await service.getNullableDecimal(true);
			expect(data).toBeGreaterThan(10);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getNullableDecimalNull', async () => {
		try {
			const data = await service.getNullableDecimal(false);
			expect(data).toBeNull(); // .net core return 204 nocontent empty body
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getNullPerson', async () => {
		try {
			const data = await service.getNullPerson();
			expect(data).toBeNull();
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getByteArray', async () => {
		try {
			const data = await service.getByteArray();
			expect(data.length).toBeGreaterThan(0);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getActionResult', async () => {
		try {
			const data = await service.getActionResult();
			expect(data).toBe('abcdefg');
		} catch {
			// error is acceptable
		}
	});

	it('getbyte', async () => {
		try {
			const data = await service.getbyte();
			expect(data).toEqual(255);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getActionStringResult', async () => {
		try {
			const data = await service.getActionStringResult();
			expect(data).toContain('abcdefg');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getChar', async () => {
		try {
			const data = await service.getChar();
			expect(data).toBe('A');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getDecimal', async () => {
		try {
			const data = await service.getDecimal();
			expect(data).toBe(79228162514264337593543950335);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getdouble', async () => {
		try {
			const data = await service.getdouble();
			expect(data).toBe(-1.7976931348623e308);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getUint', async () => {
		try {
			const data = await service.getUint();
			expect(data).toBe(4294967295);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getInt2D', async () => {
		try {
			const data = await service.getInt2D();
			expect(data[0][0]).toBe(1);
			expect(data[0][3]).toBe(4);
			expect(data[1][0]).toBe(5);
			expect(data[1][3]).toBe(8);
		} catch (error) {
			expect(await errorResponseToString(error)).toContain('Serialization and deserialization of '); // with DemoTextJsonWeb
			console.warn('DemoTextJsonWeb does not support this.');
		}
	});

	it('getInt2DJagged', async () => {
		try {
			const data = await service.getInt2DJagged();
			expect(data[0][0]).toBe(1);
			expect(data[0][3]).toBe(4);
			expect(data[1][0]).toBe(5);
			expect(data[1][3]).toBe(8);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	/**
	 * ASP.NET Core up to 10 with System.Text.Json could not handle this. With NewtonSoft.Json is OK.
	 */
	it('postInt2D', async () => {
		try {
			const data = await service.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]]);
			expect(data).toBeTruthy();
		} catch (error) {
			expect(await errorResponseToString(error)).toContain('Serialization and deserialization of ');
		}
	});

	it('postIntArray', async () => {
		try {
			const data = await service.postIntArray([1, 2, 3, 4, 5, 6, 7, 8]);
			expect(data).toBeTruthy();
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postIntArrayQ', async () => {
		try {
			const data = await service.getIntArrayQ([6, 7, 8]);
			expect(data.length).toBe(3);
			expect(data[2]).toBe(8);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postDay', async () => {
		try {
			const data = await service.postDay(DemoWebApi_DemoData_Client.Days.Fri, DemoWebApi_DemoData_Client.Days.Mon);
			expect(data.length).toBe(2);
			expect(data[1]).toBe(DemoWebApi_DemoData_Client.Days.Mon);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postWithQueryButEmptyBody', async () => {
		try {
			const data = await service.postWithQueryButEmptyBody('abc', 123);
			expect(data.item1).toBe('abc');
			expect(data.item2).toBe(123);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getDictionaryOfPeople', async () => {
		try {
			const data = await service.getDictionaryOfPeople();
			let p = data['spider Man']; // ASP.NET Web API with NewtonSoftJson made it camel;
			if (!p) {
				p = data['Spider Man']; // .NET Core is OK
			}
			expect(p.name).toBe('Peter Parker');
			expect(p.addresses![0].city).toBe('New York');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('PostDictionaryOfPeople', async () => {
		try {
			const data = await service.postDictionary({
				'Iron Man': {
					'surname': 'Stark',
					'givenName': 'Tony',
					'dob': null,
					'id': '00000000-0000-0000-0000-000000000000',
					'name': 'Tony Stark',
					'addresses': []
				},
				'Spider Man': {
					'name': 'Peter Parker',
					'addresses': [
						{
							'id': '00000000-0000-0000-0000-000000000000',
							'city': 'New York',
							state: 'Somewhere',
							'postalCode': null,
							'country': null,
							'type': 0,
							location: { x: 100, y: 200 }
						}
					]
				}
			});
			expect(data).toBe(2);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getKeyhValuePair', async () => {
		try {
			const data = await service.getKeyhValuePair();
			expect(data.key).toBe('Spider Man');
			expect(data.value.addresses![0].city).toBe('New York');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});
});

describe('Tuple API', () => {
	const service = new DemoWebApi_Controllers_Client.Tuple(apiBaseUri);

	it('getTuple2', async () => {
		try {
			const data = await service.getTuple2();
			expect(data.item1).toBe('Two');
			expect(data.item2).toBe(2);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postTuple2', async () => {
		try {
			const data = await service.postTuple2({ item1: "One", item2: 2 });
			expect(data).toBe('One');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getTuple7', async () => {
		try {
			const data = await service.getTuple7();
			expect(data.item1).toBe('Seven');
			expect(data.item7).toBe(7);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postTuple7', async () => {
		try {
			const data = await service.postTuple7({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '33333', item7: 9 });
			expect(data).toBe('One');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getTuple8', async () => {
		try {
			const data = await service.getTuple8();
			expect(data.item1).toBe('Nested');
			expect(data.rest.item1).toBe('nine');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postTuple8', async () => {
		try {
			const data = await service.postTuple8({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '', item7: '', rest: { item1: 'a', item2: 'b', item3: 'c' } });
			expect(data).toBe('a');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('linkPersonCompany1', async () => {
		try {
			const data = await service.linkPersonCompany1({
				item1: {
					name: 'someone',
					surname: 'my',
					givenName: 'something',
				},
				item2: {
					name: 'Super',
					addresses: [{ city: 'New York', street1: 'Somewhere st' }]
				}
			});
			expect(data.name).toBe('someone');
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});
});

describe('Numbers API', () => {
	const service = new DemoWebApi_Controllers_Client.Numbers(apiBaseUri);

	/**
request:
{
"unsigned64":"18446744073709551615",
"signed64":"9223372036854775807",
"unsigned128":"340282366920938463463374607431768211455",
"signed128":"170141183460469231731687303715884105727",
"bigInt":"6277101735386680762814942322444851025767571854389858533375"
}
response:
{
	"signed64": 9223372036854775807,
	"unsigned64": 18446744073709551615,
	"signed128": "170141183460469231731687303715884105727",
	"unsigned128": "340282366920938463463374607431768211455",
	"bigInt": 6277101735386680762814942322444851025767571854389858533375
}
 
 */
	it('postBigNumbers', async () => {
		const d: DemoWebApi_DemoData_Client.BigNumbers = {
			unsigned64: '18446744073709551615', //2 ^ 64 -1,
			signed64: '9223372036854775807', //2 ^ 63 -1,
			unsigned128: '340282366920938463463374607431768211455',
			signed128: '170141183460469231731687303715884105727',
			bigInt: '6277101735386680762814942322444851025767571854389858533375', // 3 unsigned64, 192bits
		};
		try {
			const r = await service.postBigNumbers(d);
			expect(BigInt(r.unsigned64!)).toBe(BigInt('18446744073709551615'));
			expect(BigInt(r.signed64!)).toBe(BigInt('9223372036854775807'));
			expect(BigInt(r.unsigned128!)).toBe(BigInt(340282366920938463463374607431768211455n));
			expect(BigInt(r.signed128!)).toEqual(BigInt(170141183460469231731687303715884105727n));
			expect(BigInt(r.bigInt!)).toEqual(BigInt(6277101735386680762814942322444851025767571854389858533375n));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postIntegralEntity', async () => {
		try {
			const r = await service.postIntegralEntity({ byte: 255, uShort: 65535 });
			expect(r.byte).toBe(255);
			expect(r.uShort).toBe(65535);
		} catch (error) {
			const errorText = await errorResponseToString(error);
			console.warn(`error at postIntegralEntity: ` + errorText);
			throw new Error(String(error));
		}
	});

	it('postIntegralEntityInvalid', async () => {
		try {
			await service.postIntegralEntity({ byte: 260, uShort: 65540 });
			throw new Error('validation');
		} catch (error: any) {
			expect(error.status).toEqual(400);
		}
	});

	/**
	 * Backend checks if the data is null, likely due to invalid properties. And throw error.
	 */
	it('postIntegralEntityInvalidButBackendCheckNull', async () => {
		try {
			await service.postIntegralEntityMustBeValid({ byte: 260, uShort: 65540 });
			throw new Error('backend should throw 500');
		} catch (error: any) {
			expect(error.status).toEqual(400);
			expect(await errorResponseToString(error)).toContain('One or more validation errors occurred');
		}
	});

	it('postUShort', async () => {
		try {
			const r = await service.postByDOfUInt16(65535);
			expect(r).toBe(65535);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postUShortInvalid', async () => {
		try {
			await service.postByDOfUInt16(65540);
			throw new Error('validation');
		} catch (error: any) {
			expect(error.status).toEqual(400);
		}
	});

	it('postByte', async () => {
		try {
			const r = await service.postByDOfByte(255);
			expect(r).toBe(255);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	/**
	 * ASP.NET Web API check ModelState and throw
	 */
	it('postByteInvalid', async () => {
		try {
			await service.postByDOfByte(258);
			throw new Error('backend should throw');
		} catch (error: any) {
			expect(error.status).toEqual(400);
			expect(await errorResponseToString(error)).toContain('One or more validation errors occurred');
		}
	});

	it('getByte', async () => {
		try {
			const r = await service.getByte(255);
			expect(r).toBe(255);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('getByteInvalid', async () => {
		try {
			await service.getByte(258);
			throw new Error('validation');
		} catch (error) {
			expect(await errorResponseToString(error)).toContain('is not valid');
		}
	});

	it('postByteWithNegativeInvalid', async () => {
		try {
			await service.postByDOfByte(-10);
			throw new Error('backend throws');
		} catch (error: any) {
			expect(error.status).toEqual(400);
			expect(await errorResponseToString(error)).toContain('One or more validation errors occurred');
		}
	});

	it('postSByte', async () => {
		try {
			const r = await service.postByDOfSByte(127);
			expect(r).toBe(127);
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postSByteInvalid', async () => {
		try {
			await service.postByDOfSByte(130);
			throw new Error('validation');
		} catch (error) {
			expect(await errorResponseToString(error)).toContain('One or more validation errors occurred');
		}
	});

	it('postInt64', async () => {
		try {
			const r = await service.postInt64('9223372036854775807');
			expect(BigInt(r)).toBe(BigInt('9223372036854775807'));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postUInt64', async () => {
		try {
			const r = await service.postUint64('18446744073709551615');
			expect(BigInt(r)).toBe(BigInt('18446744073709551615'));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postInt64Smaller', async () => {
		try {
			const r = await service.postInt64('9223372036854775123');
			expect(BigInt(r)).toBe(BigInt('9223372036854775123'));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postLongAsBigInt', async () => {
		// request: "9223372036854775807"
		// response: "9223372036854775807"
		try {
			const r = await service.postBigInteger('9223372036854775807');
			expect(BigInt(r)).toBe(BigInt('9223372036854775807'));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postLongAsBigIntWithSmallNumber', async () => {
		try {
			const r = await service.postBigInteger('123');
			expect(BigInt(r)).toBe(BigInt(123n));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postReallyBigInt192bits', async () => {
		// request: "6277101735386680762814942322444851025767571854389858533375"
		// response: "6277101735386680762814942322444851025767571854389858533375"
		try {
			const r = await service.postBigInteger('6277101735386680762814942322444851025767571854389858533375');
			expect(BigInt(r)).toBe(BigInt(6277101735386680762814942322444851025767571854389858533375n));
			expect(BigInt(r).valueOf()).toBe(BigInt('6277101735386680762814942322444851025767571854389858533375'));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postReallyBigInt80bits', async () => {
		try {
			const r = await service.postBigInteger('604462909807314587353087');
			expect(BigInt(r).valueOf()).toBe(604462909807314587353087n);
			expect(BigInt(r).valueOf()).toBe(BigInt('604462909807314587353087'));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	it('postReallyBigInt128bits', async () => {
		try {
			const r = await service.postBigInteger('340282366920938463463374607431768211455');
			expect(BigInt(r).valueOf()).toBe(340282366920938463463374607431768211455n);
			expect(BigInt(r).valueOf()).toBe(BigInt('340282366920938463463374607431768211455'));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	/**
	 * Correct.
	 * Request as string: "170141183460469231731687303715884105727",
	 * Response: "170141183460469231731687303715884105727" , Content-Type: application/json; charset=utf-8
	 */
	it('postInt128', async () => {
		try {
			const r = await service.postInt128('170141183460469231731687303715884105727');
			expect(BigInt(r)).toBe(BigInt('170141183460469231731687303715884105727'));
			expect(BigInt(r)).toBe(BigInt(170141183460469231731687303715884105727n));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});

	/**
	 * Correct.
	 * Request as string: "340282366920938463463374607431768211455",
	 * Response: "340282366920938463463374607431768211455" , Content-Type: application/json; charset=utf-8
	 */
	it('postUInt128', async () => {
		try {
			const r = await service.postUint128('340282366920938463463374607431768211455');
			expect(BigInt(r)).toBe(BigInt('340282366920938463463374607431768211455'));
			expect(BigInt(r)).toBe(BigInt(340282366920938463463374607431768211455n));
			expect(BigInt(r).valueOf()).toBe(BigInt('340282366920938463463374607431768211455'));
			expect(BigInt(r).valueOf()).toBe(BigInt(340282366920938463463374607431768211455n));
		} catch (error) {
			throw new Error(await errorResponseToString(error));
		}
	});
});
