import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

//import * as namespaces from './WebApiNG2ClientAuto';
import * as namespaces from './WebApiCoreNG2ClientAuto';
//const apiBaseUri = 'http://localhost:10965/'; // for DemoWebApi
const apiBaseUri = 'http://localhost:5000/'; //for DemoCoreWeb

export function valuesClientFactory(http: HttpClient) {
  return new namespaces.DemoWebApi_Controllers_Client.Values(apiBaseUri, http);
}

export function heroesClientFactory(http: HttpClient) {
  return new namespaces.DemoWebApi_Controllers_Client.Heroes(apiBaseUri, http);
}

export function entitiesClientFactory(http: HttpClient) {
  return new namespaces.DemoWebApi_Controllers_Client.Entities(apiBaseUri, http);
}

export function superDemoClientFactory(http: HttpClient) {
  return new namespaces.DemoWebApi_Controllers_Client.SuperDemo(apiBaseUri, http);
}

export function tupleClientFactory(http: HttpClient) {
  return new namespaces.DemoWebApi_Controllers_Client.Tuple(apiBaseUri, http);
}


export function errorResponseToString(error: HttpErrorResponse | any, ): string {
  let errMsg: string;
  if (error instanceof HttpErrorResponse) {
	if (error.status === 0) {
	  errMsg = 'No response from backend. Connection is unavailable.';
	} else {
	  if (error.message) {
		errMsg = `${error.status} - ${error.statusText}: ${error.message}`;
	  } else {
		errMsg = `${error.status} - ${error.statusText}`;
	  }
	}

	errMsg += error.error ? (' ' + JSON.stringify(error.error)) : '';
	return errMsg;
  } else {
	errMsg = error.message ? error.message : error.toString();
	return errMsg;
  }
}


describe('Values API', () => {
  let service: namespaces.DemoWebApi_Controllers_Client.Values;

  beforeEach(async(() => {

	TestBed.configureTestingModule({
	  imports: [HttpClientModule],
	  providers: [
		{
		  provide: namespaces.DemoWebApi_Controllers_Client.Values,
		  useFactory: valuesClientFactory,
		  deps: [HttpClient],

		},

	  ]
	});

	service = TestBed.get(namespaces.DemoWebApi_Controllers_Client.Values);
  }));

  afterEach(function () {
  });

  it('get', (done) => {
	service.get().subscribe(
	  data => {
		console.debug(data.length);
		expect(data[1]).toBe('value2');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('getByIdAndName', (done) => {
	service.getByIdAndName(1, 'Abc').subscribe(
	  data => {
		console.debug(data.length);
		expect(data).toBe('Abc1');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('getByName', (done) => {
	service.getByName('Abc').subscribe(
	  data => {
		console.debug(data.length);
		expect(data).toBe('ABC');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('Post', (done) => {
	service.post('Abc').subscribe(
	  data => {
		console.debug(data.length);
		expect(data).toBe('ABC');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('getByIdAndChinese', (done) => {
	service.getByIdAndName(1, 'something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"').subscribe(
	  data => {
		console.debug(data.length);
		expect(data).toBe('something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"1');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );



});


describe('Heroes API', () => {
  let service: namespaces.DemoWebApi_Controllers_Client.Heroes;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
	  imports: [HttpClientModule],
	  providers: [
		{
		  provide: namespaces.DemoWebApi_Controllers_Client.Heroes,
		  useFactory: heroesClientFactory,
		  deps: [HttpClient],

		},

	  ]
	});

	service = TestBed.get(namespaces.DemoWebApi_Controllers_Client.Heroes);
  }));

	it('getAll', (done) => {
		service.getHeros().subscribe(
	  data => {
		console.debug(data.length);
		expect(data.length).toBeGreaterThan(0);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('Add', (done) => {
	service.post('somebody').subscribe(
	  data => {
		expect(data.name).toBe('somebody');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('PostWithQuery', (done) => {
	service.postWithQuery('somebodyqqq').subscribe(
	  data => {
		expect(data.name).toBe('somebodyqqq');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('search', (done) => {
	service.search('Torna').subscribe(
	  data => {
		console.debug(data.length);
		expect(data.length).toBe(1);
		expect(data[0].name).toBe('Tornado');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

});


describe('entities API', () => {
  let client: namespaces.DemoWebApi_Controllers_Client.Entities;

  beforeEach(async(() => {

	TestBed.configureTestingModule({
	  imports: [HttpClientModule],
	  providers: [
		{
		  provide: namespaces.DemoWebApi_Controllers_Client.Entities,
		  useFactory: entitiesClientFactory,
		  deps: [HttpClient],
		},

	  ]
	});

	client = TestBed.get(namespaces.DemoWebApi_Controllers_Client.Entities);
  }));

  // it('getPersonNotFound', (done) => {
  //    client.getPersonNotFound(123)
  //        .subscribe(
  //        data => {
  //            fail('That is bad. Should be 404.');
  //            done();
  //        },
  //        error => {
  //            expect(errorResponseToString(error)).toContain('404');
  //            done();
  //        }
  //        );
  // }
  // );

  it('add', (done) => {
	let id: number;
	const newPerson: namespaces.DemoWebApi_DemoData_Client.Person = {
	  name: 'John Smith' + Date.now().toString(),
	  givenName: 'John',
	  surname: 'Smith',
	  dob: new Date('1977-12-28')
	};

	client.createPerson(newPerson)
	  .subscribe(
	  data => {
		id = data;
		expect(data).toBeTruthy();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	  );

  }
  );

  it('mimsString', (done) => {
	let id: number;
	const c: namespaces.DemoWebApi_DemoData_Client.MimsPackage = {
	  tag: 'Hello',
	  result: {
		result: 123.45
	  }
	};

	client.getMims(c)
	  .subscribe(
	  data => {
		expect(data.message).toBe('Hello');
		expect(data.result).toBeCloseTo(123.45);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	  );

  }
  );

  it('myGenericPerson', (done) => {
	const newPerson: namespaces.DemoWebApi_DemoData_Client.Person = {
	  name: 'John Smith',
	  givenName: 'John',
	  surname: 'Smith',
	  dob: new Date('1977-12-28')
	};

	const c: namespaces.DemoWebApi_DemoData_Client.MyGeneric<string, number, namespaces.DemoWebApi_DemoData_Client.Person> = {
	  myK: 123.456,
	  myT: 'abc',
	  myU: newPerson,
	  status: 'OK',
	};

	client.getMyGenericPerson(c)
	  .subscribe(
	  data => {
		expect(data.myU.name).toBe('John Smith');
		expect(data.status).toBe('OK');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	  );

  }
  );


});


describe('SuperDemo API', () => {
  let service: namespaces.DemoWebApi_Controllers_Client.SuperDemo;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
	  imports: [HttpClientModule],
	  providers: [
		{
		  provide: namespaces.DemoWebApi_Controllers_Client.SuperDemo,
		  useFactory: superDemoClientFactory,
		  deps: [HttpClient],

		},

	  ]
	});

	service = TestBed.get(namespaces.DemoWebApi_Controllers_Client.SuperDemo);
  }));

  it('getBool', (done) => {
	service.getBool().subscribe(
	  data => {
		expect(data).toBeTruthy();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('GetNextHour', (done) => {
	const dt = new Date(Date.now());
	const h = dt.getHours();
	service.getNextHour(dt).subscribe(
	  data => {
		const dd = new Date(data);
		expect(dd.getHours()).toBe(h + 1);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('GetNextYear', (done) => {
	const dt = new Date(Date.now());
	const h = dt.getFullYear();
	service.getNextYear(dt).subscribe(
	  data => {
		const dd = new Date(data);
		expect(dd.getFullYear()).toBe(h + 1);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('PostNextYear', (done) => {
	const dt = new Date(Date.now());
	const h = dt.getFullYear();
	service.postNextYear(dt).subscribe(
	  data => {
		const dd = new Date(data);
		expect(dd.getFullYear()).toBe(h + 1);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );


  it('getFloatZero', (done) => {
	service.getFloatZero().subscribe(
	  data => {
		expect(data).toBeLessThan(0.000001);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getDoubleZero', (done) => {
	service.getDoubleZero().subscribe(
	  data => {
		expect(data).not.toBe(0);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getDecimalZero', (done) => {
	service.getDecimalZero().subscribe(
	  data => {
		expect(data).toBe(0);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getIntSquare', (done) => {
	service.getIntSquare(100).subscribe(
	  data => {
		expect(data).toBe(10000);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getDecimalSquare', (done) => {
	service.getDecimalSquare(100).subscribe(
	  data => {
		expect(data).toBe(10000);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getDateTime', (done) => {
	service.getDateTime(true).subscribe(
	  data => {
		expect(data).toBeDefined();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getDateTimeNull', (done) => {
	service.getDateTime(false).subscribe(
	  data => {
		expect(data).toBeNull();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getNullableDecimal', (done) => {
	service.getNullableDecimal(true).subscribe(
	  data => {
		expect(data).toBeGreaterThan(10);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getNullableDecimalNull', (done) => {
	service.getNullableDecimal(false).subscribe(
	  data => {
		expect(data).toBeNull();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getNullString', (done) => {
	service.getNullString().subscribe(
	  data => {
		expect(data).toBeNull();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getNullPerson', (done) => {
	service.getNullPerson().subscribe(
	  data => {
		expect(data).toBeNull();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getByteArray', (done) => {
	service.getByteArray().subscribe(
	  data => {
		expect(data.length).toBeGreaterThan(0);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getTextStream', (done) => {
	service.getTextStream().subscribe(
	  data => {
		expect(data.body.size).toBe(7);

		const reader = new FileReader();
		reader.onload = () => {
		  expect(reader.result).toBe('abcdefg');
		};
		reader.readAsText(data.body);

		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getActionResult', (done) => {
	service.getActionResult().subscribe(
	  data => {
		expect(data.status).toBe(200);
		expect(data.body).toBe('"abcdefg"');

		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getbyte', (done) => {
	service.getbyte().subscribe(
	  data => {
		expect(data).toEqual(255);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getActionStringResult', (done) => {
	service.getActionStringResult().subscribe(
	  data => {
		expect(data).toContain('abcdefg');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );


  it('getChar', (done) => {
	service.getChar().subscribe(
	  data => {
		expect(data).toBe('A');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );


  it('getDecimal', (done) => {
	service.getDecimal().subscribe(
	  data => {
		expect(data).toBe(79228162514264337593543950335);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );


  it('getdouble', (done) => {
	service.getdouble().subscribe(
	  data => {
		expect(data).toBe(-1.7976931348623e308);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getUint', (done) => {
	service.getUint().subscribe(
	  data => {
		expect(data).toBe(4294967295);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getulong', (done) => {
	service.getulong().subscribe(
	  data => {
		expect(data).toBe(18446744073709551615);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getInt2D', (done) => {
	service.getInt2D().subscribe(
	  data => {
		expect(data[0][0]).toBe(1);
		expect(data[0][3]).toBe(4);
		expect(data[1][0]).toBe(5);
		expect(data[1][3]).toBe(8);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );


  it('getInt2DJagged', (done) => {
	service.getInt2DJagged().subscribe(
	  data => {
		expect(data[0][0]).toBe(1);
		expect(data[0][3]).toBe(4);
		expect(data[1][0]).toBe(5);
		expect(data[1][3]).toBe(8);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );


  it('postInt2D', (done) => {
	service.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]]).subscribe(
	  data => {
		expect(data).toBeTruthy();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('postIntArray', (done) => {
	service.postIntArray([1, 2, 3, 4, 5, 6, 7, 8]).subscribe(
	  data => {
		expect(data).toBeTruthy();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

	it('postWithQueryButEmptyBody', (done) => {
		service.postWithQueryButEmptyBody('abc', 123).subscribe(
			data => {
				expect(data.item1).toBe('abc');
				expect(data.item2).toBe(123);
				done();
			},
			error => {
				fail(errorResponseToString(error));
				done();
			}
		);

	}
	);

	it('postGuids', (done) => {
		service.postGuids(["08d7be8b-4805-459e-849a-fcd5c64a33ee","08d7be8b-47fb-44a5-86a8-a6f4fe928fa9"]).subscribe(
			data => {
				expect(data.length).toBe(2);
				expect(data[0]).toBe("08d7be8b-4805-459e-849a-fcd5c64a33ee");
				done();
			},
			error => {
				fail(errorResponseToString(error));
				done();
			}
		);

	}
	);

  it('getDictionaryOfPeople', (done) => {
	service.getDictionaryOfPeople().subscribe(
	  data => {
		let p = data['spider Man']; // ASP.NET Web API with NewtonSoftJson made it camcel;
		if (!p) {
		  p = data['Spider Man']; // .NET Core is OK
		}
		expect(p.name).toBe('Peter Parker');
		expect(p.addresses[0].city).toBe('New York');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('PostDictionaryOfPeople', (done) => {
	service.postDictionary({
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
	}).subscribe(
	  data => {
		expect(data).toBe(2);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	  );

  }
  );

  it('getKeyhValuePair', (done) => {
	service.getKeyhValuePair().subscribe(
	  data => {
		expect(data.key).toBe('Spider Man');
		expect(data.value.addresses[0].city).toBe('New York');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getBool', (done) => {
	service.getBool().subscribe(
	  data => {
		expect(data).toBeTruthy();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getNextYearNullable', (done) => {
	const now = new Date(Date.now());
	service.getNextYearNullable(2, now).subscribe(
	  data => {
		const dt = new Date(data); // data is actually string, NG HttpClient does not translate it to Date
		expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getNextHourNullable', (done) => {
	const now = new Date(Date.now());
	service.getNextHourNullable(2, now).subscribe(
	  data => {
		const dt = new Date(data);
		expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getNextYearNullable2', (done) => {
	const now = new Date(Date.now());
	service.getNextYearNullable(2, undefined).subscribe(
	  data => {
		const dt = new Date(data);
		expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );

  it('getNextHourNullable2', (done) => {
	const now = new Date(Date.now());
	service.getNextHourNullable(2, null).subscribe(
	  data => {
		const dt = new Date(data);
		expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );


  it('searchDateRange', (done) => {
	const startDt = new Date(Date.now());
	const endDt = new Date(Date.now() + 100000);
	service.searchDateRange(startDt, endDt).subscribe(
	  data => {
		expect(new Date(data.item1)).toEqual(startDt);
		expect(new Date(data.item2)).toEqual(endDt);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );


  it('searchDateRangeEndUndefined', (done) => {
	const startDt = new Date(Date.now());
	const endDt = new Date(Date.now() + 100000);
	service.searchDateRange(startDt, undefined).subscribe(
	  data => {
		expect(new Date(data.item1)).toEqual(startDt);
		expect(data.item2).toBeNull(); // OK with null rather than undefined
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );


  it('searchDateRangeStartUndefined', (done) => {
	const startDt = new Date(Date.now());
	const endDt = new Date(Date.now() + 100000);
	service.searchDateRange(undefined, endDt).subscribe(
	  data => {
		// fail('The API should return http 400 error.'); in .net core 2.0, the service return status 400. Apparently this was a bug which was fixed in 2.1
		expect(data.item1).toBeNull();
		expect(new Date(data.item2)).toEqual(endDt);
		done();
	  },
	  error => {
		const errorText = errorResponseToString(error);
		if (errorText.indexOf('400') < 0) {
		  fail(errorText);
		}
		expect(true).toBeTruthy();
		done();
	  }
	);

  }
  );


  it('searchDateRangeBotNull', (done) => {
	const startDt = new Date(Date.now());
	const endDt = new Date(Date.now() + 100000);
	service.searchDateRange(null, undefined).subscribe(
	  data => {
		expect(data.item1).toBeNull();
		expect(data.item1).toBeNull();
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);

  }
  );








});

describe('Tuple API', () => {
  let service: namespaces.DemoWebApi_Controllers_Client.Tuple;

  beforeEach(async(() => {

	TestBed.configureTestingModule({
	  imports: [HttpClientModule],
	  providers: [
		{
		  provide: namespaces.DemoWebApi_Controllers_Client.Tuple,
		  useFactory: tupleClientFactory,
		  deps: [HttpClient],

		},

	  ]
	});

	service = TestBed.get(namespaces.DemoWebApi_Controllers_Client.Tuple);
  }));

  afterEach(function () {
  });

  it('getTuple2', (done) => {
	service.getTuple2().subscribe(
	  data => {
		expect(data.item1).toBe('Two');
		expect(data.item2).toBe(2);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('postTuple2', (done) => {
	service.postTuple2({ item1: 'One', item2: 2 }).subscribe(
	  data => {
		expect(data).toBe('One');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('getTuple7', (done) => {
	service.getTuple7().subscribe(
	  data => {
		expect(data.item1).toBe('Seven');
		expect(data.item7).toBe(7);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('getTuple2', (done) => {
	service.getTuple2().subscribe(
	  data => {
		expect(data.item1).toBe('Two');
		expect(data.item2).toBe(2);
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('postTuple7', (done) => {
	service.postTuple7({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: 33333, item7: 9 }).subscribe(
	  data => {
		expect(data).toBe('One');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('getTuple8', (done) => {
	service.getTuple8().subscribe(
	  data => {
		expect(data.item1).toBe('Nested');
		expect(data.rest.item1).toBe('nine');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('postTuple8', (done) => {
	service.postTuple8({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '', item7: '', rest: { item1: 'a', item2: 'b', item3: 'c' } }).subscribe(
	  data => {
		expect(data).toBe('a');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	);
  }
  );

  it('linkPersonCompany1', (done) => {
	service.linkPersonCompany1({
	  item1: {
		name: 'someone',
		surname: 'my',
		givenName: 'something',
	  },

	  item2: {
		name: 'Super',
		addresses: [{ city: 'New York', street1: 'Somewhere st' }]
	  }
	}).subscribe(
	  data => {
		expect(data.name).toBe('someone');
		done();
	  },
	  error => {
		fail(errorResponseToString(error));
		done();
	  }
	  );
  }
  );




});

