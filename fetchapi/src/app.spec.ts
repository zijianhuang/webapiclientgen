import * as moment from 'moment';
import {DemoWebApi_Controllers_Client, DemoWebApi_Models_Client, DemoWebApi_DemoData_Client, DemoWebApi_DemoData_Base_Client}  from './clientapi/WebApiCoreFetchClientAuto';

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

describe('Basic', ()=>{
  it('simple 1', done=>{
    expect(true).toBeTruthy();
    done();
  });

  it('simple 2', done=>{

    expect(true).toBeTruthy();
    done();
  });

});

const forDotNetCore=true;
const apiBaseUri = forDotNetCore ? 'http://localhost:5000/' : 'http://localhost:10965/';

describe('Values', () => {
  const api = new DemoWebApi_Controllers_Client.Values(apiBaseUri);

  it('getById', (done) => {
    api.getByIdOfInt32(3).then(
      d => {
        expect(d).toBe('3');
        done();
      }
    );
  });

  it('get', (done) => {
    api.get().then(
      data => {
        console.debug(data.length);
        expect(data[1]).toBe('value2');
        done();
      },
      error => {
        // 
        done();
      }
    );
  }
  );

  it('Post', (done) => {
    api.post('Abc').then(
      data => {
        console.debug(data.length);
        expect(data).toBe('ABC');
        done();
      },
      error => {
        //  
        done();
      }
    );
  }
  );
});

describe('Heroes API', () => {
  const service = new DemoWebApi_Controllers_Client.Heroes(apiBaseUri);

  it('getAll', (done) => {
    service.getHeros().then(
      data => {
        console.debug(data.length);
        expect(data.length).toBeGreaterThan(0);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('Add', (done) => {
    service.post('somebody').then(
      data => {
        console.info('Add hero: ' + JSON.stringify(data));
        expect(data.name).toBe('somebody');
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('PostWithQuery', (done) => {
    service.postWithQuery('somebodyqqq').then(
      data => {
        expect(data.name).toBe('somebodyqqq');
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('search', (done) => {
    service.search('Torna').then(
      data => {
        console.debug(data.length);
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Tornado');
        done();
      },
      error => {

        done();
      }
    );

  }
  );

});


describe('entities API', () => {
  const client = new DemoWebApi_Controllers_Client.Entities(apiBaseUri);

  it('add', (done) => {
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
          done();
        },
        error => {

          done();
        }
      );

  }
  );

  it('addWthHeadersHandling', (done) => {
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
          done();
        },
        error => {

          done();
        }
      );

  }
  );
});

describe('Tuple API', () => {
  const service = new DemoWebApi_Controllers_Client.Tuple(apiBaseUri);


  it('getTuple2', (done) => {
    service.getTuple2().then(
      data => {
        expect(data.item1).toBe('Two');
        expect(data.item2).toBe(2);
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('postTuple2', (done) => {
    service.postTuple2({ item1: "One", item2: 2 }).then(
      data => {
        expect(data).toBe('One');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('getTuple7', (done) => {
    service.getTuple7().then(
      data => {
        expect(data.item1).toBe('Seven');
        expect(data.item7).toBe(7);
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('getTuple2', (done) => {
    service.getTuple2().then(
      data => {
        expect(data.item1).toBe('Two');
        expect(data.item2).toBe(2);
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('postTuple7', (done) => {
    service.postTuple7({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '33333', item7: 9 }).then(
      data => {
        expect(data).toBe('One');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('getTuple8', (done) => {
    service.getTuple8().then(
      data => {
        expect(data.item1).toBe('Nested');
        expect(data.rest.item1).toBe('nine');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('postTuple8', (done) => {
    service.postTuple8({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '', item7: '', rest: { item1: 'a', item2: 'b', item3: 'c' } }).then(
      data => {
        expect(data).toBe('a');
        done();
      },
      error => {

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
    }).then(
      data => {
        expect(data.name).toBe('someone');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

});

describe("DateTypes API", () => {
  const service = new DemoWebApi_Controllers_Client.DateTypes(apiBaseUri);

  it('GetNextHour', (done) => {
    const dt = new Date(Date.now());
    const h = dt.getHours();
    service.getNextHour(dt).then(
      data => {
        console.debug(JSON.stringify(data));
        const m = moment(data);
        const dd = m.toDate();
        expect(dd.getHours()).toBe(h + 1);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('GetNextYear', (done) => {
    const dt = new Date(Date.now());
    const h = dt.getFullYear();
    service.getNextYear(dt).then(
      data => {
        const m = moment(data);
        const dd = m.toDate();
        expect(dd.getFullYear()).toBe(h + 1);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('PostNextYear', (done) => {
    const dt = new Date(Date.now());
    const h = dt.getFullYear();
    service.postNextYear(dt).then(
      data => {
        const m = moment(data);
        const dd = m.toDate();
        expect(dd.getFullYear()).toBe(h + 1);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getDateTimeNull', (done) => {
    service.getDateTime(false).then(
      data => {
        expect(data).toBeNull();// Aurelia httpclient throws error upon 204.
        done();
      },
      error => {
        expect(true).toBeTruthy();
        done();
      }
    );

  }
  );

  it('getDateTime', (done) => {
    service.getDateTime(true).then(
      data => {
        expect(data).toBeDefined();
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getNextYearNullable', (done) => {
    let now = new Date(Date.now());
    service.getNextYearNullable(2, now).then(
      data => {
        const m = moment(data);
        let dt = m.toDate();
        expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getNextHourNullable', (done) => {
    let now = new Date(Date.now());
    service.getNextHourNullable(2, now).then(
      data => {
        const m = moment(data);
        let dt = m.toDate();
        expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24)
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getNextYearNullable2', (done) => {
    let now = new Date(Date.now());
    service.getNextYearNullable(2, undefined).then(
      data => {
        const m = moment(data);
        let dt = m.toDate();
        expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getNextHourNullable2', (done) => {
    let now = new Date(Date.now());
    service.getNextHourNullable(2, null).then(
      data => {
        const m = moment(data);
        let dt = m.toDate();
        expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24)
        done();
      },
      error => {

        done();
      }
    );

  }
  );


  it('searchDateRange', (done) => {
    let startDt = new Date(Date.now());
    let endDt = new Date(Date.now() + 100000);
    service.searchDateRange(startDt, endDt).then(
      data => {
        const m1 = moment(data.item1);
        const m2 = moment(data.item2);
        expect(m1.toDate()).toEqual(startDt);
        expect(m2.toDate()).toEqual(endDt);
        done();
      },
      error => {

        done();
      }
    );

  }
  );


  it('searchDateRangeEndUndefined', (done) => {
    let startDt = new Date(Date.now());
    let endDt = new Date(Date.now() + 100000);
    service.searchDateRange(startDt, undefined).then(
      data => {
        const m1 = moment(data.item1);
        expect(m1.toDate()).toEqual(startDt);
        expect(data.item2).toBeUndefined(); //OK with null rather than undefined
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('searchDateRangeStartUndefined', (done) => {
    let startDt = new Date(Date.now());
    let endDt = new Date(Date.now() + 100000);
    service.searchDateRange(undefined, endDt).then(
      data => {
        //fail('The API should return http 400 error.'); in .net core 2.0, the service return status 400. Apparently this was a bug which was fixed in 2.1
        forDotNetCore ? expect(data.item1).toBeUndefined() : expect(data.item1).toBeUndefined();
        const m = moment(data.item2);
        expect(m.toDate().getHours()).toEqual(endDt.getHours());
        done();
      },
      error => {
        // let errorText = error;
        // if (errorText.indexOf('400') < 0) {
        //   fail(errorText);
        // }
        expect(true).toBeTruthy();
        done();
      }
    );

  }
  );


  it('searchDateRangeBotNull', (done) => {
    let startDt = new Date(Date.now());
    let endDt = new Date(Date.now() + 100000);
    service.searchDateRange(null, undefined).then(
      data => {
        expect(data.item1).toBeUndefined();
        expect(data.item2).toBeUndefined();
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('postDateOnly', (done) => {
    const dt = new Date(Date.parse('2018-12-23')); //JS will serialize it to 2018-12-23T00:00:00.000Z.
    service.postDateOnly(dt).then(
      data => {
        const v: any = data; //string 2008-12-23
        expect(v).toEqual('2018-12-23');
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('postDateOnlyWithNull', (done) => {
    service.postDateOnly(null).then(
      data => {
        const v: any = data;
        expect(v).toEqual('0001-01-01');
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('postDateOnlyNullable', (done) => {
    const dt = new Date(Date.parse('2018-12-23'));
    service.postDateOnlyNullable(dt).then(
      data => {
        const v: any = data;
        expect(v).toEqual('2018-12-23');
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('postDateOnlyNullableWithNull', (done) => {
    service.postDateOnlyNullable(null).then(
      data => {
        expect(data).toBeNull();
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('postDateOnlyNullableWithUndefined', (done) => {
    service.postDateOnlyNullable(null).then(
      data => {
        expect(data).toBeNull();
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('IsDateTimeOffsetDate', (done) => {
    const dt = new Date(Date.parse('2018-12-23'));
    service.isDateTimeOffsetDate(dt).then(
      data => {
        const v: any = data.item1;
        expect(v).toEqual('2018-12-23');
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('IsDateTimeDate', (done) => {
    const dt = new Date(Date.parse('2018-12-23'));
    service.isDateTimeDate(dt).then(
      data => {
        const v: any = data.item1;
        expect(v).toEqual('2018-12-23');
        done();
      },
      error => {

        done();
      }
    );

  }
  );


});

describe('TextData API', () => {
  const service = new DemoWebApi_Controllers_Client.TextData(apiBaseUri);

  it('TestAthletheSearch', (done) => {
    service.athletheSearch(32, 0, null, null, null).then(
      data => {
        expect(data).toBe('320');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('TestAthletheSearch2', (done) => {
    service.athletheSearch(32, 0, null, null, 'Search').then(
      data => {
        expect(data).toBe('320Search');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('getABCDE', (done) => {
    service.getABCDE().then(
      data => {
        expect(data).toBe('ABCDE');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('getEmptyString', (done) => {
    service.getEmptyString().then(
      data => {
        expect(data).toBe('');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  /**
   * 
   */
  it('getNullString', (done) => {
    service.getNullString().then(
      data => {
        expect(data).toBe(null);
        done();
      },
      error => {

        done();
      }
    );
  }
  );
});

describe('StringData API', () => {
  const service = new DemoWebApi_Controllers_Client.StringData(apiBaseUri);

  it('getNullString', (done) => {
    service.getNullString().then(
      data => {
        expect(data).toBeNull();
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('TestAthletheSearch', (done) => {
    service.athletheSearch(32, 0, null, null, null).then(
      data => {
        expect(data).toBe('"320"');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('TestAthletheSearch2', (done) => {
    service.athletheSearch(32, 0, null, null, "Search").then(
      data => {
        expect(data).toBe('"320Search"');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('TestAthletheSearch3', (done) => {
    service.athletheSearch(32, 0, null, "Sort", "Search").then(
      data => {
        expect(data).toBe('"320SortSearch"');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('TestAthletheSearch4', (done) => {
    service.athletheSearch(32, 0, "Order", "Sort", "Search").then(
      data => {
        expect(data).toBe('"320OrderSortSearch"');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('TestAthletheSearch5', (done) => {
    service.athletheSearch(32, 0, "Order", null, "Search").then(
      data => {
        expect(data).toBe('"320OrderSearch"');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('TestAthletheSearch6', (done) => {
    service.athletheSearch(32, 0, "Order", "", "Search").then(
      data => {
        expect(data).toBe('"320OrderSearch"');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('getABCDE', (done) => {
    service.getABCDE().then(
      data => {
        expect(data).toBe('"ABCDE"');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  it('getEmptyString', (done) => {
    service.getEmptyString().then(
      data => {
        expect(data).toBe('""');
        done();
      },
      error => {

        done();
      }
    );
  }
  );

  /**
   * Angular HttpClient could identify null value.
   */
  it('getNullString', (done) => {
    service.getNullString().then(
      data => {
        expect(data).toBe(null);
        done();
      },
      error => {

        done();
      }
    );
  }
  );
});

describe('SuperDemo API', () => {
  const service = new DemoWebApi_Controllers_Client.SuperDemo(apiBaseUri);

  it('getBool', (done) => {
    service.getBool().then(
      data => {
        expect(data).toBeTruthy();
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getFloatZero', (done) => {
    service.getFloatZero().then(
      data => {
        expect(data).toBeLessThan(0.000001);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getDoubleZero', (done) => {
    service.getDoubleZero().then(
      data => {
        expect(data).not.toBe(0);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getDecimalZero', (done) => {
    service.getDecimalZero().then(
      data => {
        expect(data).toBe(0);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getIntSquare', (done) => {
    service.getIntSquare(100).then(
      data => {
        expect(data).toBe(10000);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getDecimalSquare', (done) => {
    service.getDecimalSquare(100).then(
      data => {
        expect(data).toBe(10000);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getNullableDecimal', (done) => {
    service.getNullableDecimal(true).then(
      data => {
        expect(data).toBeGreaterThan(10);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getNullableDecimalNull', (done) => {
    service.getNullableDecimal(false).then(
      data => {
        expect(data).toBeNull(); //aurelia httpclient throws empty error while the service is returning 204
        done();
      },
      error => {
        console.debug('getNullableDecimalNull: ' + JSON.stringify(error));
        expect(true).toBeTruthy();
        done();
      }
    );

  }
  );

  it('getNullPerson', (done) => {
    service.getNullPerson().then(
      data => {
        expect(data).toBeNull(); //Aurelia httpclient throws error upon service statuscode 204
        //expect(data).toBe(''); // .net core return 204 nocontent empty body
        done();
      },
      error => {
        expect(true).toBeTruthy();
        done();
      }
    );

  }
  );

  it('getByteArray', (done) => {
    service.getByteArray().then(
      data => {
        expect(data.length).toBeGreaterThan(0);
        done();
      },
      error => {

        done();
      }
    );

  }
  );




  it('getTextStream', (done) => {
    service.getTextStream().then(
      data => {
        console.debug('getTextStream');
        console.debug(data); // abcdefg

        expect(data.size).toBe(7);

        const reader = new FileReader();//axios actually give string rather than a blob structure
        reader.onload = () => {
          expect(reader.result).toBe('abcdefg');
        };
        reader.readAsText(data);

        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getActionResult', (done) => {
    service.getActionResult().then(
      data => {

        expect(data).toBe('abcdefg');

        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getActionResult2', (done) => {
    service.getActionResult2().then(
      data => {

        expect(data).toBe('abcdefg');

        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getbyte', (done) => {
    service.getbyte().then(
      data => {
        expect(data).toEqual(255);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getActionStringResult', (done) => {
    service.getActionStringResult().then(
      data => {
        expect(data).toContain('abcdefg');
        done();
      },
      error => {

        done();
      }
    );

  }
  );


  it('getChar', (done) => {
    service.getChar().then(
      data => {
        expect(data).toBe('A');
        done();
      },
      error => {

        done();
      }
    );

  }
  );


  it('getDecimal', (done) => {
    service.getDecimal().then(
      data => {
        expect(data).toBe(79228162514264337593543950335);
        done();
      },
      error => {

        done();
      }
    );

  }
  );


  it('getdouble', (done) => {
    service.getdouble().then(
      data => {
        expect(data).toBe(-1.7976931348623e308);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getUint', (done) => {
    service.getUint().then(
      data => {
        expect(data).toBe(4294967295);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getInt2D', (done) => {
    service.getInt2D().then(
      data => {
        expect(data[0][0]).toBe(1);
        expect(data[0][3]).toBe(4);
        expect(data[1][0]).toBe(5);
        expect(data[1][3]).toBe(8);
        done();
      },
      error => {

        done();
      }
    );

  }
  );


  it('getInt2DJagged', (done) => {
    service.getInt2DJagged().then(
      data => {
        expect(data[0][0]).toBe(1);
        expect(data[0][3]).toBe(4);
        expect(data[1][0]).toBe(5);
        expect(data[1][3]).toBe(8);
        done();
      },
      error => {

        done();
      }
    );

  }
  );


  it('postInt2D', (done) => {
    service.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]]).then(
      data => {
        expect(data).toBeTruthy();
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('postIntArray', (done) => {
    service.postIntArray([1, 2, 3, 4, 5, 6, 7, 8]).then(
      data => {
        expect(data).toBeTruthy();
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('postIntArrayQ', (done) => {
    service.getIntArrayQ([6, 7, 8]).then(
      data => {
        expect(data.length).toBe(3);
        expect(data[2]).toBe(8);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getDay', (done) => {
    service.getDay(DemoWebApi_DemoData_Client.Days.Sat).then(
      data => {
        expect(data).toBe(DemoWebApi_DemoData_Client.Days.Sat);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('postDay', (done) => {
    service.postDay(DemoWebApi_DemoData_Client.Days.Fri, DemoWebApi_DemoData_Client.Days.Sat).then(
      data => {
        expect(data.length).toBe(2);
        expect(data[1]).toBe(DemoWebApi_DemoData_Client.Days.Sat);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('postWithQueryButEmptyBody', (done) => {
    service.postWithQueryButEmptyBody('abc', 123).then(
      data => {
        expect(data.item1).toBe('abc');
        expect(data.item2).toBe(123);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getDictionaryOfPeople', (done) => {
    service.getDictionaryOfPeople().then(
      data => {
        let p = data['spider Man']; //ASP.NET Web API with NewtonSoftJson made it camcel;
        if (!p) {
          p = data['Spider Man']; //.NET Core is OK
        }
        expect(p.name).toBe('Peter Parker');
        expect(p.addresses[0].city).toBe('New York');
        done();
      },
      error => {

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
    }).then(
      data => {
        expect(data).toBe(2);
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getKeyhValuePair', (done) => {
    service.getKeyhValuePair().then(
      data => {
        expect(data.key).toBe('Spider Man');
        expect(data.value.addresses[0].city).toBe('New York');
        done();
      },
      error => {

        done();
      }
    );

  }
  );

  it('getBool', (done) => {
    service.getBool().then(
      data => {
        expect(data).toBeTruthy();
        done();
      },
      error => {

        done();
      }
    );

  }
  );

});

/**
 * Test when Web API has customized serialization for 64-bit and BigInteger.
 */
describe('Numbers API', () => {
  const service = new DemoWebApi_Controllers_Client.Numbers(apiBaseUri);

  it('postBigNumbers', (done) => {
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

        done();
      },
      error => {
        fail(error);
        done();
      }
    );

  }
  );

  it('postIntegralEntity', (done) => {
    service.postIntegralEntity({ name: 'Some one', byte: 255, uShort: 65535 }).then(
      r => {
        expect(r.byte).toBe(255);
        expect(r.uShort).toBe(65535);
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postIntegralEntityInvalid', (done) => {
    service.postIntegralEntity({ name: 'Some one', byte: 260, uShort: 65540 }).then(
      r => {
        fail('validation');
        done();
      },
      async error => {
        expect(await errorResponseToString(error)).toContain('Error converting value 65540 to type');
        done();
      }
    );
  }
  );

  /**
   * Backend checks if the data is null, likely due to invalid properties. And throw error.
   */
  it('postIntegralEntityInvalidButBackendCheckNull', (done) => {
    service.postIntegralEntityMustBeValid({ name: 'Some one', byte: 260, uShort: 65540 }).then(
      r => {
        fail('backend should throw 500')
        done();
      },
      error => {
        console.error(error);
        expect().nothing();
        done();
      }
    );
  }
  );


  it('postUShort', (done) => {
    service.postByDOfUInt16(65535).then(
      r => {
        expect(r).toBe(65535);
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postUShortInvalid', (done) => {
    service.postByDOfUInt16(65540).then(
      r => {
        fail('validation');
        done();
      },
      async error => {
        expect(await errorResponseToString(error)).toContain('Error converting value 65540 to type');
        done();
      }
    );
  }
  );

  it('postByte', (done) => {
    service.postByDOfByte(255).then(
      r => {
        expect(r).toBe(255);
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  /**
   * ASP.NET Web API check ModelState and throw
   */
  it('postByteInvalid', (done) => {
    service.postByDOfByte(258).then(
      r => {
        fail("backend should throw");
        done();
      },
      error => {
        console.error(error);
        expect().nothing();
        done();
      }
    );
  }
  );

  it('getByte', (done) => {
    service.getByte(255).then(
      r => {
        expect(r).toBe(255);
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('getByteInvalid', (done) => {
    service.getByte(258).then(
      r => {
        fail('validation');
        done();
      },
      async error => {
        expect(await errorResponseToString(error)).toContain('is not valid');
        done();
      }
    );
  }
  );

  it('postByteWithNegativeInvalid', (done) => {
    service.postByDOfByte(-10).then(
      r => {
        fail("backend throws")
        done();
      },
      error => {
        console.error(error);
        expect().nothing();
        done();
      }
    );
  }
  );

  it('postSByte', (done) => {
    service.postByDOfSByte(127).then(
      r => {
        expect(r).toBe(127);
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postSByteInvalid', (done) => {
    service.postByDOfSByte(130).then(
      r => {
        fail('validation')
        done();
      },
      async error => {
        expect(await errorResponseToString(error)).toContain('Error converting value 130 to type ');
        done();
      }
    );
  }
  );

  it('postInt64', (done) => {
    service.postInt64('9223372036854775807').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('9223372036854775807'));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postUInt64', (done) => {
    service.postUint64('18446744073709551615').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('18446744073709551615'));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postInt64Smaller', (done) => {
    service.postInt64('9223372036854775123').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('9223372036854775123'));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postLongAsBigInt', (done) => {
    // request: "9223372036854775807"
    // response: "9223372036854775807"
    service.postBigInteger('9223372036854775807').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('9223372036854775807'));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postLongAsBigIntWithSmallNumber', (done) => {
    service.postBigInteger('123').then(
      r => {
        expect(BigInt(r)).toBe(BigInt(123n));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );

  }
  );

  it('postReallyBigInt192bits', (done) => {
    // request: "6277101735386680762814942322444851025767571854389858533375"
    // response: "6277101735386680762814942322444851025767571854389858533375"
    service.postBigInteger('6277101735386680762814942322444851025767571854389858533375').then(
      r => {
        expect(BigInt(r)).toBe(BigInt(6277101735386680762814942322444851025767571854389858533375n));
        expect(BigInt(r).valueOf()).toBe(BigInt('6277101735386680762814942322444851025767571854389858533375'));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postReallyBigInt80bits', (done) => {
    service.postBigInteger('604462909807314587353087').then(
      r => {
        expect(BigInt(r).valueOf()).toBe(604462909807314587353087n);
        expect(BigInt(r).valueOf()).toBe(BigInt('604462909807314587353087'));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postReallyBigInt128bits', (done) => {
    service.postBigInteger('340282366920938463463374607431768211455').then(
      r => {
        expect(BigInt(r).valueOf()).toBe(340282366920938463463374607431768211455n);
        expect(BigInt(r).valueOf()).toBe(BigInt('340282366920938463463374607431768211455'));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  /**
   * Correct.
   * Request as string: "170141183460469231731687303715884105727",
   * Response: "170141183460469231731687303715884105727" , Content-Type: application/json; charset=utf-8
   */
  it('postInt128', (done) => {
    service.postInt128('170141183460469231731687303715884105727').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('170141183460469231731687303715884105727'));
        expect(BigInt(r)).toBe(BigInt(170141183460469231731687303715884105727n));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  /**
   * Correct.
   * Request as string: "340282366920938463463374607431768211455",
   * Response: "340282366920938463463374607431768211455" , Content-Type: application/json; charset=utf-8
   */
  it('postUInt128', (done) => {
    service.postUint128('340282366920938463463374607431768211455').then(
      r => {
        expect(BigInt(r)).toBe(BigInt('340282366920938463463374607431768211455'));
        expect(BigInt(r)).toBe(BigInt(340282366920938463463374607431768211455n));
        expect(BigInt(r).valueOf()).toBe(BigInt('340282366920938463463374607431768211455'));
        expect(BigInt(r).valueOf()).toBe(BigInt(340282366920938463463374607431768211455n));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );


});

