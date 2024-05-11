import { DemoWebApi_Controllers_Client, DemoWebApi_DemoData_Client, DemoWebApi_DemoData_Base_Client } from './clientapi/WebApiCoreFetchClientAuto';

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
  it('simple 1', done => {
    expect(true).toBeTruthy();
    done();
  });

  it('simple 2', done => {

    expect(true).toBeTruthy();
    done();
  });

});

const forDotNetCore = true;
const apiBaseUri = forDotNetCore ? 'http://localhost:5000/' : 'http://localhost:10965/';

describe('Values API', () => {
  const service = new DemoWebApi_Controllers_Client.Values(apiBaseUri);

  it('get', (done) => {
    service.get().then(
      data => {
        console.debug(data.length);
        expect(data[1]).toBe('value2');
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
      }
    );
  }
  );

  it('getByIdAndName', (done) => {
    service.getByIdOfInt32AndNameOfString(1, 'Abc').then(
      data => {
        console.debug(data.length);
        expect(data).toBe('Abc1');
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
      }
    );
  }
  );

  it('getByName', (done) => {
    service.getByNameOfString('Abc').then(
      data => {
        console.debug(data.length);
        expect(data).toBe('ABC');
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
      }
    );
  }
  );

  it('Post', (done) => {
    service.post('Abc').then(
      data => {
        console.debug(data.length);
        expect(data).toBe('ABC');
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
      }
    );
  }
  );

  it('getByIdAndChinese', (done) => {
    service.getByIdOfInt32AndNameOfString(1, 'something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"').then(
      data => {
        console.debug(data.length);
        expect(data).toBe('something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"1');
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
      }
    );

  }
  );

  it('Add', (done) => {
    service.post('somebody').then(
      data => {
        expect(data.name).toBe('somebody');
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
      }
    );

  }
  );

});


describe('entities API', () => {
  const client = new DemoWebApi_Controllers_Client.Entities(apiBaseUri);

  //it('getPersonNotFound', (done) => {
  //    client.getPersonNotFound(123)
  //        .then(
  //        data => {
  //            fail('That is bad. Should be 404.');
  //            done();
  //        },
  //        error => {
  //            expect(errorResponseToString(error)).toContain('404');
  //            done();
  //        }
  //        );
  //}
  //);

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
        async error => {
          fail(await errorResponseToString(error));
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
        async error => {
          fail(await errorResponseToString(error));
        }
      );

  }
  );

  it('myGenericPerson', (done) => {
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

    client.getMyGenericPerson(c)
      .then(
        data => {
          expect(data.myU?.name).toBe('John Smith');
          expect(data.status).toBe('OK');
          done();
        },
        async error => {
          fail(await errorResponseToString(error));
        }
      );

  }
  );


});


describe('StringData API', () => {
  const service = new DemoWebApi_Controllers_Client.StringData(apiBaseUri);

  it('TestAthletheSearch', (done) => {
    service.athletheSearch(32, 0, null, null, null).then(
      data => {
        expect(data).toBe('"320"');
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
      }
    );
  }
  );

  it('getABCDE', (done) => {
    service.getABCDE().then(
      data => {
        expect(data).toBe('"ABCDE"'); // AxiosResponse.data is smart to remove double quotes from the string json object, though I ask for text.
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
        expect(data).toBe('320'); // somehow data is number rather than string. AxiosResponse.data is too smart?
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
      }
    );

  }
  );

  it('getNullableDecimalNull', (done) => {
    service.getNullableDecimal(false).then(
      data => {
        //expect(data).toBeNull();
        expect(data).toBeNull(); // .net core return 204 nocontent empty body
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
      }
    );

  }
  );

  it('getNullPerson', (done) => {
    service.getNullPerson().then(
      data => {
        expect(data).toBeNull();
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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

  it('getbyte', (done) => {
    service.getbyte().then(
      data => {
        expect(data).toEqual(255);
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
      }
    );

  }
  );

  it('postDay', (done) => {
    service.postDay(DemoWebApi_DemoData_Client.Days.Fri, DemoWebApi_DemoData_Client.Days.Mon).then(
      data => {
        expect(data.length).toBe(2);
        expect(data[1]).toBe(DemoWebApi_DemoData_Client.Days.Mon);
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
        expect(p.addresses![0].city).toBe('New York');
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
      }
    );

  }
  );

  it('getKeyhValuePair', (done) => {
    service.getKeyhValuePair().then(
      data => {
        expect(data.key).toBe('Spider Man');
        expect(data.value.addresses![0].city).toBe('New York');
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      error => {
        expect(error.status).toEqual(400);
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

      },
      async error => {
        expect(error.status).toEqual(400);
        expect(await errorResponseToString(error)).toContain('Error converting value');
        done();
      }
    );
  });


  it('postUShort', (done) => {
    service.postByDOfUInt16(65535).then(
      r => {
        expect(r).toBe(65535);
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
      }
    );
  }
  );

  it('postUShortInvalid', (done) => {
    service.postByDOfUInt16(65540).then(
      r => {
        fail('validation');
      },
      error => {
        expect(error.status).toEqual(400);//.toContain('Error converting value 65540 to type');
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
      async error => {
        fail(await errorResponseToString(error));
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
      },
      async error => {
        expect(error.status).toEqual(400);
        expect(await errorResponseToString(error)).toContain('Error converting value');
        done();
      }
    );
  });

  it('getByte', (done) => {
    service.getByte(255).then(
      r => {
        expect(r).toBe(255);
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
      }
    );
  }
  );

  it('getByteInvalid', (done) => {
    service.getByte(258).then(
      r => {
        fail('validation');
      },
      async error => {
        expect(await errorResponseToString(error)).toContain('is not valid');
        done();
      }
    );
  });

  it('postByteWithNegativeInvalid', (done) => {
    service.postByDOfByte(-10).then(
      r => {
        fail("backend throws");
      },
      async error => {
        expect(error.status).toEqual(400);
        expect(await errorResponseToString(error)).toContain('Error converting value');
        done();
      }
    );
  });

  it('postSByte', (done) => {
    service.postByDOfSByte(127).then(
      r => {
        expect(r).toBe(127);
        done();
      },
      async error => {
        fail(await errorResponseToString(error));
      }
    );
  }
  );

  it('postSByteInvalid', (done) => {
    service.postByDOfSByte(130).then(
      r => {
        fail('validation')
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
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
      async error => {
        fail(await errorResponseToString(error));
      }
    );
  }
  );


});