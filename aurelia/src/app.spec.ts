import { HttpClient } from 'aurelia-fetch-client';
import { initialize } from 'aurelia-pal-browser';
import * as moment from 'moment';
import { DemoWebApi_Controllers_Client, DemoWebApi_DemoData_Client } from './clientapi/WebApiCoreAureliaClientAuto';
import { describe, it, expect } from 'vitest';
import 'reflect-metadata';

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

initialize(); // as described at https://discourse.aurelia.io/t/problem-with-unit-testing-and-mocking-api-call/2405

describe('Basic', () => {
  it('simple 1', done => {
    expect(true).toBeTruthy();

  });

  it('simple 2', done => {

    expect(true).toBeTruthy();

  });

});

const forDotNetCore = true;
const apiBaseUri = forDotNetCore ? 'http://localhost:5000/' : 'http://localhost:10965/';
const http = new HttpClient();
http.baseUrl = apiBaseUri;

describe('Values', () => {
  const api = new DemoWebApi_Controllers_Client.Values(http);

  it('getById', () => {
    api.getByIdOfInt32(3).then(
      d => {
        expect(d).toBe('3');

      }
    );
  });

  it('get', () => {
    api.get().then(
      data => {
        console.debug(data.length);
        expect(data[1]).toBe('value2');

      },
      error => {
        // 

      }
    );
  }
  );

  it('Post', () => {
    api.post('Abc').then(
      data => {
        console.debug(data.length);
        expect(data).toBe('ABC');

      },
      error => {
        //  

      }
    );
  }
  );
});

describe('Heroes API', () => {
  const service = new DemoWebApi_Controllers_Client.Heroes(http);

  it('getAll', () => {
    service.getHeroes().then(
      data => {
        console.debug(data.length);
        expect(data.length).toBeGreaterThan(0);

      },
      error => {


      }
    );

  }
  );

  it('Add', () => {
    service.post('somebody').then(
      data => {
        console.info('Add hero: ' + JSON.stringify(data));
        expect(data.name).toBe('somebody');

      },
      error => {


      }
    );

  }
  );

  it('PostWithQuery', () => {
    service.postWithQuery('somebodyqqq').then(
      data => {
        expect(data.name).toBe('somebodyqqq');

      },
      error => {


      }
    );

  }
  );

  it('search', () => {
    service.search('Torna').then(
      data => {
        console.debug(data.length);
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Tornado');

      },
      error => {


      }
    );

  }
  );

});


describe('entities API', () => {
  const client = new DemoWebApi_Controllers_Client.Entities(http);

  it('add', () => {
    let id: string;
    const newPerson: DemoWebApi_DemoData_Client.Person = {
      name: 'John Smith' + Date.now().toString(),
      givenName: 'John',
      surname: 'Smith',
      dob: new Date('1977-12-28')
    };

    client.createPerson(newPerson)
      .then(
        data => {
          id = data;
          expect(data).toBeTruthy();

        },
        error => {


        }
      );

  }
  );

  it('addWthHeadersHandling', () => {
    let id: number;
    const newPerson: DemoWebApi_DemoData_Client.Person = {
      name: 'John Smith' + Date.now().toString(),
      givenName: 'John',
      surname: 'Smith',
      dob: new Date('1977-12-28')
    };

    client.createPerson3(newPerson, () => { return { middle: 'Hey' }; })
      .then(
        data => {
          expect(data.givenName).toBe('Hey');

        },
        error => {


        }
      );

  }
  );
});

describe('Tuple API', () => {
  const service = new DemoWebApi_Controllers_Client.Tuple(http);


  it('getTuple2', () => {
    service.getTuple2().then(
      data => {
        expect(data.item1).toBe('Two');
        expect(data.item2).toBe(2);

      },
      error => {


      }
    );
  }
  );

  it('postTuple2', () => {
    service.postTuple2({ item1: "One", item2: 2 }).then(
      data => {
        expect(data).toBe('One');

      },
      error => {


      }
    );
  }
  );

  it('getTuple7', () => {
    service.getTuple7().then(
      data => {
        expect(data.item1).toBe('Seven');
        expect(data.item7).toBe(7);

      },
      error => {


      }
    );
  }
  );

  it('getTuple2', () => {
    service.getTuple2().then(
      data => {
        expect(data.item1).toBe('Two');
        expect(data.item2).toBe(2);

      },
      error => {


      }
    );
  }
  );

  it('postTuple7', () => {
    service.postTuple7({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '33333', item7: 9 }).then(
      data => {
        expect(data).toBe('One');

      },
      error => {


      }
    );
  }
  );

  it('getTuple8', () => {
    service.getTuple8().then(
      data => {
        expect(data.item1).toBe('Nested');
        expect(data.rest.item1).toBe('nine');

      },
      error => {


      }
    );
  }
  );

  it('postTuple8', () => {
    service.postTuple8({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '', item7: '', rest: { item1: 'a', item2: 'b', item3: 'c' } }).then(
      data => {
        expect(data).toBe('a');

      },
      error => {


      }
    );
  }
  );

  it('linkPersonCompany1', () => {
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
    }).then(
      data => {
        expect(data.name).toBe('someone');

      },
      error => {


      }
    );
  }
  );

});

describe('DateTypes API', () => {
  const service = new DemoWebApi_Controllers_Client.DateTypes(http);

  it('GetNextHour', () => {
    const dt = new Date(Date.now());
    const h = dt.getHours();
    service.getNextHour(dt).then(
      data => {
        const dd = new Date(data!);
        expect(dd.getHours()).toBe(h + 1);

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('GetNextYear', () => {
    const dt = new Date(Date.now());
    const h = dt.getFullYear();
    service.getNextYear(dt).then(
      data => {
        const dd = new Date(data!);
        expect(dd.getFullYear()).toBe(h + 1);

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('PostNextYear', () => {
    const dt = new Date(Date.now());
    const h = dt.getFullYear();
    service.postNextYear(dt).then(
      data => {
        const dd = new Date(data!);
        expect(dd.getFullYear()).toBe(h + 1);

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('getDateTime', () => {
    service.getDateTime(true).then(
      data => {
        expect(data).toBeDefined();

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('getDateTimeNull', () => {
    service.getDateTime(false).then(
      data => {
        expect(data).toBeNull();//new version of Aurelia HttpClient won't like returned value as null, and throw syntax error.

      },
      error => {
        console.debug('getDateTimeNull throws');
        console.log('RAW ERROR:', error);
        console.log('ERROR TYPE:', error?.constructor?.name);
        expect(error).toBeInstanceOf(SyntaxError);
      }
    );

  }
  );

  it('postDateTimeOffset', () => {
    const dt = new Date(Date.now());
    service.postDateTimeOffset(dt).then(
      data => {
        expect(new Date(data!)).toEqual(dt);

      },
      error => {
        throw error;

      }
    );

  }
  );

  /**
   * Newtonsoft.Json will throw error Error converting value {null} to type 'System.DateTimeOffset'
   */
  it('postDateTimeOffsetWithNull', () => {
    service.postDateTimeOffset(null).then(
      data => {
        throw new Error("validation")

      },
      async error => {
        expect(await error.text()).toContain('Error converting value {null} to type');

      }
    );

  }
  );

  it('postDateTimeOffsetNullable', () => {
    const dt = new Date(Date.now());
    service.postDateTimeOffsetNullable(dt).then(
      data => {
        if (data) {
          expect(new Date(data)).toEqual(dt);
        } else {
          expect(new Date(data!)).toEqual(dt); //strict mode happy
        }

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postDateTimeOffsetNullableWithNull', () => {
    service.postDateTimeOffsetNullable(null).then(
      data => {
        expect(data).toBeNull();

      },
      error => {
                expect(error).toBeInstanceOf(SyntaxError);

      }
    );

  }
  );

  it('postDateTimeOffsetNullableWithUndefined', () => {
    service.postDateTimeOffsetNullable(undefined!).then(
      data => {
        expect(data).toBeNull();

      },
      error => {
                expect(error).toBeInstanceOf(SyntaxError);

      }
    );

  }
  );

  it('postDateOnly', () => {
    const dt = new Date(Date.parse('2018-12-25')); //JS will serialize it to 2018-12-25T00:00:00.000Z.
    service.postDateOnly(dt).then(
      data => {
        const v: any = data; //string 2008-12-25
        expect(v).toEqual('2018-12-25');

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postDateOnlyWithUtc', () => {
    const dt = new Date(Date.parse('2018-12-25T00:00:00.000Z')); //JS will serialize it to 2018-12-25T00:00:00.000Z.
    service.postDateOnly(dt).then(
      data => {
        const v: any = data; //string 2008-12-25
        expect(v).toEqual('2018-12-25');

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postDateOnlyWithAusMidnight', () => {
    const dt = new Date(Date.parse('2018-12-24T14:00:00.000Z')); //Angular Material DatePicker by default will give this when picking 2018-12-25
    service.postDateOnly(dt).then(
      data => {
        const v: any = data;
        expect(v).toEqual('2018-12-24');

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postDateOnlyText', () => {
    let obj: any = '2018-12-25';
    service.postDateOnly(obj).then(
      data => {
        const v: any = data; //string 2008-12-25
        expect(v).toEqual('2018-12-25');

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postDateOnlyUtcText', () => {
    let obj: any = '2018-12-25T00:00:00.000Z';
    service.postDateOnly(obj).then(
      data => {
        const v: any = data;
        expect(v).toEqual('2018-12-25');

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postDateOnlyAusMidnightText', () => {
    let obj: any = '2018-12-24T23:00:01.001Z';
    service.postDateOnly(obj).then(
      data => {
        const v: any = data;
        expect(v).toEqual('2018-12-24');

      },
      error => {
        throw error;

      }
    );

  }
  );


  it('postDateOnlyWithNull', () => {
    service.postDateOnly(null!).then( //strict mode happy
      data => {
        const v: any = data;
        expect(v).toEqual('0001-01-01');

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postDateOnlyNullable', () => {
    const dt = new Date(Date.parse('2018-12-23'));
    service.postDateOnlyNullable(dt).then(
      data => {
        const v: any = data;
        expect(v).toEqual('2018-12-23');

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postDateOnlyNullableWithNull', () => {
    service.postDateOnlyNullable(null).then(
      data => {
        expect(data).toBeNull();

      },
      error => {
                expect(error).toBeInstanceOf(SyntaxError);

      }
    );

  }
  );

  it('postDateOnlyNullableWithUndefined', () => {
    service.postDateOnlyNullable(null).then(
      data => {
        expect(data).toBeNull();

      },
      error => {
                expect(error).toBeInstanceOf(SyntaxError);

      }
    );

  }
  );

  it('isDateTimeOffsetDate', () => {
    const dt = new Date(Date.parse('2018-12-23'));
    service.isDateTimeOffsetDate(dt).then(
      data => {
        const v: any = data!.item1;
        expect(v).toEqual('2018-12-23');

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('isDateTimeDate', () => {
    const dt = new Date(Date.parse('2018-12-23'));
    service.isDateTimeDate(dt).then(
      data => {
        const v: any = data!.item1;
        expect(v).toEqual('2018-12-23');

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('getNextYearNullable', () => {
    const now = new Date(Date.now());
    service.getNextYearNullable(2, now).then(
      data => {
        const dt = new Date(data!); // data is actually string, NG HttpClient does not translate it to Date
        expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('getNextHourNullable', () => {
    const now = new Date(Date.now());
    service.getNextHourNullable(2, now).then(
      data => {
        const dt = new Date(data!);
        expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24);

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('getNextYearNullable2', () => {
    const now = new Date(Date.now());
    service.getNextYearNullable(2, undefined!).then(
      data => {
        const dt = new Date(data!);
        expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('getNextHourNullable2', () => {
    const now = new Date(Date.now());
    service.getNextHourNullable(2, null).then(
      data => {
        const dt = new Date(data!);
        expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24);

      },
      error => {
        throw error;

      }
    );

  }
  );


  it('searchDateRange', () => {
    const startDt = new Date(Date.now());
    const endDt = new Date(Date.now() + 100000);
    service.searchDateRange(startDt, endDt).then(
      data => {
        if (data!.item1 && data!.item2) {
          expect(new Date(data!.item1)).toEqual(startDt);
          expect(new Date(data!.item2)).toEqual(endDt);
        } else {
          throw new Error('I expect item1 and 2');
        }

      },
      error => {
        throw error;

      }
    );

  }
  );


  it('searchDateRangeEndUndefined', () => {
    const startDt = new Date(Date.now());
    const endDt = new Date(Date.now() + 100000);
    service.searchDateRange(startDt, undefined!).then(
      data => {
        if (data!.item1) {
          expect(new Date(data!.item1)).toEqual(startDt); //strict mode happy
        } else {
          throw new Error('I expect item1.');
        }

        //expect(data!.item2).toBeUndefined(); // NewtonSoft.Json give undefined, while System.Text.Json gives null
        expect(data!.item2 == null).toBeTruthy();

      },
      error => {
        throw error;

      }
    );

  }
  );


  it('searchDateRangeStartUndefined', () => {
    const startDt = new Date(Date.now());
    const endDt = new Date(Date.now() + 100000);
    service.searchDateRange(undefined!, endDt).then(
      data => {
        // throw new Error('The API should return http 400 error.'); in .net core 2.0, the service return status 400. Apparently this was a bug which was fixed in 2.1
        //expect(data!.item1).toBeUndefined(); // NewtonSoft.Json give undefined, while System.Text.Json gives null
        expect(data!.item1 == null).toBeTruthy();
        if (data!.item2) {
          expect(new Date(data!.item2)).toEqual(endDt);
        } else {
          throw new Error('I expect item2');
        }

      },
      error => {
        const errorText = error;
        if (errorText.indexOf('400') < 0) {
          throw new Error(errorText);
        }
        expect(true).toBeTruthy();

      }
    );

  }
  );


  it('searchDateRangeBothNull', () => {
    const startDt = new Date(Date.now());
    const endDt = new Date(Date.now() + 100000);
    service.searchDateRange(null, undefined!).then(
      data => {
        //expect(data!.item1).toBeUndefined();
        //expect(data!.item2).toBeUndefined();
        expect(data!.item1 == null).toBeTruthy();
        expect(data!.item2 == null).toBeTruthy();

      },
      error => {
        throw error;

      }
    );

  }
  );

});

describe('TextData API', () => {
  const service = new DemoWebApi_Controllers_Client.TextData(http);

  it('TestAthletheSearch', () => {
    service.athletheSearch(32, 0, null, null, null).then(
      data => {
        expect(data).toBe('320');

      },
      error => {


      }
    );
  }
  );

  it('TestAthletheSearch2', () => {
    service.athletheSearch(32, 0, null, null, 'Search').then(
      data => {
        expect(data).toBe('320Search');

      },
      error => {


      }
    );
  }
  );

  it('getABCDE', () => {
    service.getABCDE().then(
      data => {
        expect(data).toBe('ABCDE');

      },
      error => {


      }
    );
  }
  );

  it('getEmptyString', () => {
    service.getEmptyString().then(
      data => {
        expect(data).toBe('');

      },
      error => {


      }
    );
  }
  );

  /**
   * 
   */
  it('getNullString', () => {
    service.getNullString().then(
      data => {
        expect(data).toBe(null);

      },
      error => {


      }
    );
  }
  );
});

describe('StringData API', () => {
  const service = new DemoWebApi_Controllers_Client.StringData(http);

  it('getNullString', () => {
    service.getNullString().then(
      data => {
        expect(data).toBeNull();

      },
      error => {
        expect(error).toBeInstanceOf(SyntaxError);

      }
    );

  }
  );

  it('TestAthletheSearch', () => {
    service.athletheSearch(32, 0, null, null, null).then(
      data => {
        expect(data).toBe('"320"');

      },
      error => {


      }
    );
  }
  );

  it('TestAthletheSearch2', () => {
    service.athletheSearch(32, 0, null, null, "Search").then(
      data => {
        expect(data).toBe('"320Search"');

      },
      error => {


      }
    );
  }
  );

  it('TestAthletheSearch3', () => {
    service.athletheSearch(32, 0, null, "Sort", "Search").then(
      data => {
        expect(data).toBe('"320SortSearch"');

      },
      error => {


      }
    );
  }
  );

  it('TestAthletheSearch4', () => {
    service.athletheSearch(32, 0, "Order", "Sort", "Search").then(
      data => {
        expect(data).toBe('"320OrderSortSearch"');

      },
      error => {


      }
    );
  }
  );

  it('TestAthletheSearch5', () => {
    service.athletheSearch(32, 0, "Order", null, "Search").then(
      data => {
        expect(data).toBe('"320OrderSearch"');

      },
      error => {


      }
    );
  }
  );

  it('TestAthletheSearch6', () => {
    service.athletheSearch(32, 0, "Order", "", "Search").then(
      data => {
        expect(data).toBe('"320OrderSearch"');

      },
      error => {


      }
    );
  }
  );

  it('getABCDE', () => {
    service.getABCDE().then(
      data => {
        expect(data).toBe('"ABCDE"');

      },
      error => {


      }
    );
  }
  );

  it('getEmptyString', () => {
    service.getEmptyString().then(
      data => {
        expect(data).toBe('""');

      },
      error => {


      }
    );
  }
  );

  /**
   * Angular HttpClient could identify null value.
   */
  it('getNullString', () => {
    service.getNullString().then(
      data => {
        expect(data).toBe(null);

      },
      error => {


      }
    );
  }
  );
});

describe('SuperDemo API', () => {
  const service = new DemoWebApi_Controllers_Client.SuperDemo(http);

  it('getBool', () => {
    service.getBool().then(
      data => {
        expect(data).toBeTruthy();

      },
      error => {


      }
    );

  }
  );

  it('getFloatZero', () => {
    service.getFloatZero().then(
      data => {
        expect(data).toBeLessThan(0.000001);

      },
      error => {


      }
    );

  }
  );

  it('getDoubleZero', () => {
    service.getDoubleZero().then(
      data => {
        expect(data).not.toBe(0);

      },
      error => {


      }
    );

  }
  );

  it('getDecimalZero', () => {
    service.getDecimalZero().then(
      data => {
        expect(data).toBe(0);

      },
      error => {


      }
    );

  }
  );

  it('getIntSquare', () => {
    service.getIntSquare(100).then(
      data => {
        expect(data).toBe(10000);

      },
      error => {


      }
    );

  }
  );

  it('getDecimalSquare', () => {
    service.getDecimalSquare(100).then(
      data => {
        expect(data).toBe(10000);

      },
      error => {


      }
    );

  }
  );

  it('getNullableDecimal', () => {
    service.getNullableDecimal(true).then(
      data => {
        expect(data).toBeGreaterThan(10);

      },
      error => {


      }
    );

  }
  );

  it('getNullableDecimalNull', () => {
    service.getNullableDecimal(false).then(
      data => {
        expect(data).toBeNull(); //aurelia httpclient throws empty error while the service is returning 204

      },
      error => {
        console.debug('getNullableDecimalNull: ' + JSON.stringify(error));
                expect(error).toBeInstanceOf(SyntaxError);

      }
    );

  }
  );

  it('getNullPerson', () => {
    service.getNullPerson().then(
      data => {
        expect(data).toBeNull(); //Aurelia httpclient throws error upon service statuscode 204
        //expect(data).toBe(''); // .net core return 204 nocontent empty body

      },
      error => {
                expect(error).toBeInstanceOf(SyntaxError);

      }
    );

  }
  );

  it('getByteArray', () => {
    service.getByteArray().then(
      data => {
        expect(data.length).toBeGreaterThan(0);

      },
      error => {


      }
    );

  }
  );




  it('getTextStream', () => {
    service.getTextStream().then(
      data => {
        console.debug('getTextStream');
        console.debug(data); // abcdefg

        expect(data.size).toBe(7);

        const reader = new FileReader();//axios actually give string rather than a blob structure
        reader.onload = () => {
          expect(reader.result).toBe('abcdefg');
        };

      },
      error => {


      }
    );

  }
  );

  it('getActionResult', () => {
    service.getActionResult().then(
      data => {

        expect(data).toBe('abcdefg');


      },
      error => {


      }
    );

  }
  );

  it('getActionResult2', () => {
    service.getActionResult2().then(
      data => {

        expect(data).toBe('abcdefg');


      },
      error => {


      }
    );

  }
  );

  it('getbyte', () => {
    service.getbyte().then(
      data => {
        expect(data).toEqual(255);

      },
      error => {


      }
    );

  }
  );

  it('getActionStringResult', () => {
    service.getActionStringResult().then(
      data => {
        expect(data).toContain('abcdefg');

      },
      error => {


      }
    );

  }
  );


  it('getChar', () => {
    service.getChar().then(
      data => {
        expect(data).toBe('A');

      },
      error => {


      }
    );

  }
  );


  it('getDecimal', () => {
    service.getDecimal().then(
      data => {
        expect(data).toBe(79228162514264337593543950335);

      },
      error => {


      }
    );

  }
  );


  it('getdouble', () => {
    service.getdouble().then(
      data => {
        expect(data).toBe(-1.7976931348623e308);

      },
      error => {


      }
    );

  }
  );

  it('getUint', () => {
    service.getUint().then(
      data => {
        expect(data).toBe(4294967295);

      },
      error => {


      }
    );

  }
  );

  it('getInt2D', () => {
    service.getInt2D().then(
      data => {
        expect(data[0][0]).toBe(1);
        expect(data[0][3]).toBe(4);
        expect(data[1][0]).toBe(5);
        expect(data[1][3]).toBe(8);

      },
      error => {


      }
    );

  }
  );


  it('getInt2DJagged', () => {
    service.getInt2DJagged().then(
      data => {
        expect(data[0][0]).toBe(1);
        expect(data[0][3]).toBe(4);
        expect(data[1][0]).toBe(5);
        expect(data[1][3]).toBe(8);

      },
      error => {


      }
    );

  }
  );


  it('postInt2D', () => {
    service.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]]).then(
      data => {
        expect(data).toBeTruthy();

      },
      error => {


      }
    );

  }
  );

  it('postIntArray', () => {
    service.postIntArray([1, 2, 3, 4, 5, 6, 7, 8]).then(
      data => {
        expect(data).toBeTruthy();

      },
      error => {


      }
    );

  }
  );

  it('postIntArrayQ', () => {
    service.getIntArrayQ([6, 7, 8]).then(
      data => {
        expect(data.length).toBe(3);
        expect(data[2]).toBe(8);

      },
      error => {


      }
    );

  }
  );

  it('getDay', () => {
    service.getDay(DemoWebApi_DemoData_Client.Days.Sat).then(
      data => {
        expect(data).toBe(DemoWebApi_DemoData_Client.Days.Sat);

      },
      error => {


      }
    );

  }
  );

  it('postDay', () => {
    service.postDay(DemoWebApi_DemoData_Client.Days.Fri, DemoWebApi_DemoData_Client.Days.Sat).then(
      data => {
        expect(data.length).toBe(2);
        expect(data[1]).toBe(DemoWebApi_DemoData_Client.Days.Sat);

      },
      error => {


      }
    );

  }
  );

  it('postWithQueryButEmptyBody', () => {
    service.postWithQueryButEmptyBody('abc', 123).then(
      data => {
        expect(data.item1).toBe('abc');
        expect(data.item2).toBe(123);

      },
      error => {


      }
    );

  }
  );

  it('getDictionaryOfPeople', () => {
    service.getDictionaryOfPeople().then(
      data => {
        let p = data['spider Man']; //ASP.NET Web API with NewtonSoftJson made it camcel;
        if (!p) {
          p = data['Spider Man']; //.NET Core is OK
        }
        expect(p.name).toBe('Peter Parker');
        expect(p.addresses[0].city).toBe('New York');

      },
      error => {


      }
    );

  }
  );

  it('PostDictionaryOfPeople', () => {
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
    }).then(
      data => {
        expect(data).toBe(2);

      },
      error => {


      }
    );

  }
  );

  it('getKeyhValuePair', () => {
    service.getKeyhValuePair().then(
      data => {
        expect(data.key).toBe('Spider Man');
        expect(data.value.addresses[0].city).toBe('New York');

      },
      error => {


      }
    );

  }
  );

  it('getBool', () => {
    service.getBool().then(
      data => {
        expect(data).toBeTruthy();

      },
      error => {


      }
    );

  }
  );

});

/**
 * Test when Web API has customized serialization for 64-bit and BigInteger.
 */
describe('Numbers API', () => {
  const service = new DemoWebApi_Controllers_Client.Numbers(http);

  it('postBigNumbers', () => {
    const d: DemoWebApi_DemoData_Client.BigNumbers = {
      unsigned64: '18446744073709551615', //2 ^ 64 -1,
      signed64: '9223372036854775807', //2 ^ 63 -1,
      unsigned128: '340282366920938463463374607431768211455',
      signed128: '170141183460469231731687303715884105727',
      bigInt: '6277101735386680762814942322444851025767571854389858533375', // 3 unsigned64, 192bits
    };
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
    service.postBigNumbers(d).then(
      r => {
        expect(BigInt(r.unsigned64!)).toBe(BigInt('18446744073709551615'));

        expect(BigInt(r.signed64!)).toBe(BigInt('9223372036854775807'));

        expect(BigInt(r.unsigned128!)).toBe(BigInt(340282366920938463463374607431768211455n));

        expect(BigInt(r.signed128!)).toEqual(BigInt(170141183460469231731687303715884105727n));

        expect(BigInt(r.bigInt!)).toEqual(BigInt(6277101735386680762814942322444851025767571854389858533375n));


      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postIntegralEntity', () => {
    service.postIntegralEntity({ name: 'Some one', byte: 255, uShort: 65535 }).then(
      r => {
        expect(r.byte).toBe(255);
        expect(r.uShort).toBe(65535);

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('postIntegralEntityInvalid', () => {
    service.postIntegralEntity({ name: 'Some one', byte: 260, uShort: 65540 }).then(
      r => {
        throw new Error('validation');

      },
      async error => {
        expect(await error.text()).toContain('Error converting value 65540 to type');

      }
    );
  }
  );

  /**
   * Backend checks if the data is null, likely due to invalid properties. And throw error.
   */
  it('postIntegralEntityInvalidButBackendCheckNull', () => {
    service.postIntegralEntityMustBeValid({ name: 'Some one', byte: 260, uShort: 65540 }).then(
      r => {
        throw new Error('backend should throw 500')

      },
      error => {
        console.error(error);


      }
    );
  }
  );


  it('postUShort', () => {
    service.postByDOfUInt16(65535).then(
      r => {
        expect(r).toBe(65535);

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('postUShortInvalid', () => {
    service.postByDOfUInt16(65540).then(
      r => {
        throw new Error('validation');

      },
      async error => {
        expect(await error.text()).toContain('Error converting value 65540 to type');

      }
    );
  }
  );

  it('postByte', () => {
    service.postByDOfByte(255).then(
      r => {
        expect(r).toBe(255);

      },
      error => {
        throw error;

      }
    );
  }
  );

  /**
   * ASP.NET Web API check ModelState and throw
   */
  it('postByteInvalid', () => {
    service.postByDOfByte(258).then(
      r => {
        throw new Error("backend should throw");

      },
      error => {
        console.error(error);


      }
    );
  }
  );

  it('getByte', () => {
    service.getByte(255).then(
      r => {
        expect(r).toBe(255);

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('getByteInvalid', () => {
    service.getByte(258).then(
      r => {
        throw new Error('validation');

      },
      async error => {
        console.log('RAW ERROR:', await error);
        console.log('ERROR TYPE:', await error?.constructor?.name);
        expect(await error.status).toBe(400);
        const textContent = await error.text();
        console.debug('textContent: ' + textContent);
        expect(textContent).toContain('is not valid');

      }
    );
  }
  );

  it('postByteWithNegativeInvalid', () => {
    service.postByDOfByte(-10).then(
      r => {
        throw new Error("backend throws")

      },
      error => {
        console.error(error);


      }
    );
  }
  );

  it('postSByte', () => {
    service.postByDOfSByte(127).then(
      r => {
        expect(r).toBe(127);

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('postSByteInvalid', () => {
    service.postByDOfSByte(130).then(
      r => {
        throw new Error('validation')

      },
      async error => {
        expect(await error.text()).toContain('Error converting value 130 to type ');

      }
    );
  }
  );

  it('postInt64', () => {
    service.postInt64('9223372036854775807').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('9223372036854775807'));

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('postUInt64', () => {
    service.postUint64('18446744073709551615').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('18446744073709551615'));

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('postInt64Smaller', () => {
    service.postInt64('9223372036854775123').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('9223372036854775123'));

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('postLongAsBigInt', () => {
    // request: "9223372036854775807"
    // response: "9223372036854775807"
    service.postBigInteger('9223372036854775807').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('9223372036854775807'));

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('postLongAsBigIntWithSmallNumber', () => {
    service.postBigInteger('123').then(
      r => {
        expect(BigInt(r)).toBe(BigInt(123n));

      },
      error => {
        throw error;

      }
    );

  }
  );

  it('postReallyBigInt192bits', () => {
    // request: "6277101735386680762814942322444851025767571854389858533375"
    // response: "6277101735386680762814942322444851025767571854389858533375"
    service.postBigInteger('6277101735386680762814942322444851025767571854389858533375').then(
      r => {
        expect(BigInt(r)).toBe(BigInt(6277101735386680762814942322444851025767571854389858533375n));
        expect(BigInt(r).valueOf()).toBe(BigInt('6277101735386680762814942322444851025767571854389858533375'));

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('postReallyBigInt80bits', () => {
    service.postBigInteger('604462909807314587353087').then(
      r => {
        expect(BigInt(r).valueOf()).toBe(604462909807314587353087n);
        expect(BigInt(r).valueOf()).toBe(BigInt('604462909807314587353087'));

      },
      error => {
        throw error;

      }
    );
  }
  );

  it('postReallyBigInt128bits', () => {
    service.postBigInteger('340282366920938463463374607431768211455').then(
      r => {
        expect(BigInt(r).valueOf()).toBe(340282366920938463463374607431768211455n);
        expect(BigInt(r).valueOf()).toBe(BigInt('340282366920938463463374607431768211455'));

      },
      error => {
        throw error;

      }
    );
  }
  );

  /**
   * Correct.
   * Request as string: "170141183460469231731687303715884105727",
   * Response: "170141183460469231731687303715884105727" , Content-Type: application/json; charset=utf-8
   */
  it('postInt128', () => {
    service.postInt128('170141183460469231731687303715884105727').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('170141183460469231731687303715884105727'));
        expect(BigInt(r)).toBe(BigInt(170141183460469231731687303715884105727n));

      },
      error => {
        throw error;

      }
    );
  }
  );

  /**
   * Correct.
   * Request as string: "340282366920938463463374607431768211455",
   * Response: "340282366920938463463374607431768211455" , Content-Type: application/json; charset=utf-8
   */
  it('postUInt128', () => {
    service.postUint128('340282366920938463463374607431768211455').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('340282366920938463463374607431768211455'));
        expect(BigInt(r)).toBe(BigInt(340282366920938463463374607431768211455n));
        expect(BigInt(r).valueOf()).toBe(BigInt('340282366920938463463374607431768211455'));
        expect(BigInt(r).valueOf()).toBe(BigInt(340282366920938463463374607431768211455n));

      },
      error => {
        throw error;

      }
    );
  }
  );


});

