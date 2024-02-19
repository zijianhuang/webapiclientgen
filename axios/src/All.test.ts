import { AxiosError } from 'axios';
import { DemoWebApi_DemoData_Client, DemoWebApi_Controllers_Client, DemoWebApi_DemoData_Base_Client, DemoWebApi_Models_Client } from './clientapi/WebApiCoreAxiosClientAuto';

// JEST provides a few ways of handling async code. This test suite use callbacks, 
// since it is a simple hack from the test suite initially written for Angular 2.

//const apiBaseUri = 'http://localhost:10965/';
const apiBaseUri = 'http://localhost:5000/';

function instanceOfAxiosError(obj: any): obj is AxiosError {
  return 'isAxiosError' in obj;
}

export function errorResponseToString(error: AxiosError | any,): string {
  let errMsg: string;
  if (instanceOfAxiosError(error)) {
    if (error.response?.status === 0) {
      errMsg = 'No response from backend. Connection is unavailable.';
    } else {
      if (error.message) {
        errMsg = `${error.response?.status} - ${error.response?.statusText}: ${error.message}`;
      } else {
        errMsg = `${error.response?.status} - ${error.response?.statusText}`;
      }
    }

    errMsg += error.message ? (' ' + JSON.stringify(error.message)) : '';
    return errMsg;
  } else {
    errMsg = error.message ? error.message : error.toString();
    return errMsg;
  }
}

describe('Values API', () => {
  const service = new DemoWebApi_Controllers_Client.Values(apiBaseUri);

  it('get', (done) => {
    service.get().then(
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
    service.getByIdOfInt32AndNameOfString(1, 'Abc').then(
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
    service.getByNameOfString('Abc').then(
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
    service.post('Abc').then(
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
    service.getByIdOfInt32AndNameOfString(1, 'something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"').then(
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
  const service = new DemoWebApi_Controllers_Client.Heroes(apiBaseUri);

  it('getAll', (done) => {
    service.getHeros().then(
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
    service.post('somebody').then(
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
    service.postWithQuery('somebodyqqq').then(
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
    service.search('Torna').then(
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
        error => {
          fail(errorResponseToString(error));
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

  it('mimsString', (done) => {
    let id: number;
    const c: DemoWebApi_DemoData_Client.MimsPackage = {
      tag: 'Hello',
      result: {
        result: 123.45
      }
    };

    client.getMims(c)
      .then(
        data => {
          expect(data.message).toBe('Hello');
          expect(data.result).toBe('123.45');
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
        error => {
          fail(errorResponseToString(error));
          done();
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
      error => {
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
        done();
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
      error => {
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        expect(data).toBe('320'); // somehow data is number rather than string. AxiosResponse.data is too smart?
        done();
      },
      error => {
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
        done();
      }
    );

  }
  );

  it('getNullableDecimalNull', (done) => {
    service.getNullableDecimal(false).then(
      data => {
        //expect(data).toBeNull();
        expect(data).toBe(''); // .net core return 204 nocontent empty body
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
    service.getNullPerson().then(
      data => {
        //expect(data).toBeNull();
        expect(data).toBe(''); // .net core return 204 nocontent empty body
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
    service.getByteArray().then(
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

  // it('getTextStream', (done) => {
  //   service.getTextStream().then(
  //     data => {
  // 	  console.debug('getTextStream');
  // 	  console.debug(data); // abcdefg
  // 	  expect(data).toBe('abcdefg');

  //   //  const reader = new FileReader();//axios actually give string rather than a blob structure
  //   //  reader.onload = () => {
  //   //  expect(reader.result).toBe('abcdefg'); 
  //   //  };
  //   //  reader.readAsText(data.data);

  //       done();
  //     },
  //     error => {
  //       fail(errorResponseToString(error));
  //       done();
  //     }
  //   );

  // }
  // );

  it('getActionResult', (done) => {
    service.getActionResult().then(
      response => {
        expect(response.status).toBe(200);
        expect(response.data).toBe('abcdefg');

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
    service.getbyte().then(
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
    service.getActionStringResult().then(
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
    service.getChar().then(
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
    service.getDecimal().then(
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
    service.getdouble().then(
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
    service.getUint().then(
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
    service.getulong().then(
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
    service.getInt2D().then(
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
    service.getInt2DJagged().then(
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
    service.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]]).then(
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
    service.postIntArray([1, 2, 3, 4, 5, 6, 7, 8]).then(
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

  it('postIntArrayQ', (done) => {
    service.getIntArrayQ([6, 7, 8]).then(
      data => {
        expect(data.length).toBe(3);
        expect(data[2]).toBe(8);
        done();
      },
      error => {
        fail(errorResponseToString(error));
        done();
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
      error => {
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        expect(p.addresses![0].city).toBe('New York');
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
    }).then(
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
    service.getKeyhValuePair().then(
      data => {
        expect(data.key).toBe('Spider Man');
        expect(data.value.addresses![0].city).toBe('New York');
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
    service.getBool().then(
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
        fail(errorResponseToString(error));
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
    }).then(
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


/**
 * Test the behavior of JavaScript when dealing with integral numbers larger than 53-bit.
 * Tested with ASP.NET 8, Chrome Version 121.0.6167.185 (Official Build) (64-bit), Firefox 122.0.1 (64-bit)
 * The lession is, when dealing with integral number larger than 53-bit or 64-bit, there are 3 options for client server agreement, as of year Feb 2024:
 * 1. Use string Content-Type: text/plain; charset=utf-8, for single big number parameter and return, probably for JS specific calls, since C# client can handle these integral types comfortablly.
 * Otherwise, the developer experience of backend developer is poor, loosing the enjoyment of strongly types of integral. For big integral inside an object, this may means you have to declare a JS specific class as well.
 * 2. Use signed128 or unsigned128 if the number is not larger than 128-bit since ASP.NET 8 serializes it as string object.
 * 3. Alter the serilization of ASP.NET Web API for 64-bit and BigInteger, make it similar to what for 128-bit. https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/converters-how-to
 *
 * JavaScript has difficulty in deal with number larger than 53-bit as JSON object.
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
        expect(BigInt(r.unsigned64!)).not.toBe(BigInt('18446744073709551615')); // BigInt can not handle the coversion from json number form correctly.
        expect(BigInt(r.unsigned64!)).toEqual(BigInt('18446744073709551616')); // actually incorrect during deserialization

        expect(BigInt(r.signed64!)).not.toBe(BigInt('9223372036854775807'));
        expect(BigInt(r.signed64!)).toEqual(BigInt('9223372036854775808'));

        expect(BigInt(r.unsigned128!)).toBe(BigInt(340282366920938463463374607431768211455n));

        expect(BigInt(r.signed128!)).toEqual(BigInt(170141183460469231731687303715884105727n));

        expect(BigInt(r.bigInt!)).not.toEqual(BigInt(6277101735386680762814942322444851025767571854389858533375n));
        expect(BigInt(r.bigInt!)).toEqual(BigInt(6277101735386680763835789423207666416102355444464034512896n)); // how wrong

        done();
      },
      error => {
        fail();
        done();
      }
    );

  }
  );

  /**
   * Even though the request payload is 9223372036854776000 (loosing precision, cause of the 53bit issue), or "9223372036854776123", the response is 0 as shown in Chrome's console and Fiddler.
   * And the Web API has received actually 0. Not sure if the Web API binding had turned the request payload into 0 if the client is a Web browser.
   */
  it('postInt64ButIncorrect', (done) => {
    service.postInt64('9223372036854775807').then(
      r => {
        expect(BigInt(9223372036854775807n).toString()).toBe('9223372036854775807');
        expect(BigInt(r)).toBe(BigInt('9223372036854775808')); //reponse is 9223372036854775807, but BigInt(r) gives last 3 digits 808
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
      postBigIntegerForJs(bigInteger?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
    return this.http.post<string>(this.baseUri + 'api/Numbers/bigIntegerForJs', JSON.stringify(bigInteger), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
  }
   */
  it('postBigIntegralAsStringForJs', (done) => {
    service.postBigIntegralAsStringForJs('9223372036854775807').then(
      r => {
        expect(BigInt(9223372036854775807n).toString()).toBe('9223372036854775807');
        expect(BigInt('9223372036854775807').toString()).toBe('9223372036854775807');
        expect(BigInt(r)).toBe(BigInt('9223372036854775807'));
        expect(BigInt(r)).toBe(BigInt(9223372036854775807n));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postBigIntegralAsStringForJs2', (done) => {
    service.postBigIntegralAsStringForJs('6277101735386680762814942322444851025767571854389858533375').then(
      r => {
        expect(BigInt(6277101735386680762814942322444851025767571854389858533375n).toString()).toBe('6277101735386680762814942322444851025767571854389858533375');
        expect(BigInt('6277101735386680762814942322444851025767571854389858533375').toString()).toBe('6277101735386680762814942322444851025767571854389858533375');
        expect(BigInt(r)).toBe(BigInt('6277101735386680762814942322444851025767571854389858533375'));
        expect(BigInt(r)).toBe(BigInt(6277101735386680762814942322444851025767571854389858533375n));
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
        expect(BigInt(r)).not.toBe(BigInt('9223372036854775123')); //reponse is 9223372036854775123, but BigInt(r) gives l9223372036854774784
        expect(BigInt(r)).toBe(BigInt('9223372036854774784'));
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postLongAsBigIntButIncorrect', (done) => {
    // request: "9223372036854775807"
    // response: 9223372036854775807
    service.postBigInteger('9223372036854775807').then(
      r => {
        expect(BigInt(9223372036854775807n).toString()).toBe('9223372036854775807');
        expect(BigInt(r)).toBe(BigInt('9223372036854775808')); //reponse is 9223372036854775807, but BigInt(r) gives last 3 digits 808, since the returned value does not have the n suffix.
        expect(r.toString()).toBe('9223372036854776000'); //the response is a big int which JS could not handle in toString(), 53bit gets in the way.
        expect(BigInt(r).toString()).toBe('9223372036854775808');
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

  it('postReallyBigInt192bitsButIncorrect', (done) => {
    // request: "6277101735386680762814942322444851025767571854389858533375"
    // response: 6277101735386680762814942322444851025767571854389858533375
    service.postBigInteger('6277101735386680762814942322444851025767571854389858533375').then(
      r => {
        expect(BigInt(r)).toBe(BigInt(6277101735386680762814942322444851025767571854389858533375)); //this time, it is correct, but...
        expect(BigInt(r).valueOf()).not.toBe(6277101735386680762814942322444851025767571854389858533375n); // not really,
        expect(BigInt(r).valueOf()).not.toBe(BigInt('6277101735386680762814942322444851025767571854389858533375')); // not really, because what returned is lack of n
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postReallyBigInt80bitsButIncorect', (done) => {
    service.postBigInteger('604462909807314587353087').then(
      r => {
        expect(BigInt(r)).toBe(BigInt(604462909807314587353087)); //this time, it is correct, but...
        expect(BigInt(r).valueOf()).not.toBe(604462909807314587353087n); // not really,
        expect(BigInt(r).valueOf()).not.toBe(BigInt('604462909807314587353087')); // not really, because what returned is lack of n
        done();
      },
      error => {
        fail(error);
        done();
      }
    );
  }
  );

  it('postReallyBigInt128bitsButIncorect', (done) => {
    service.postBigInteger('340282366920938463463374607431768211455').then(
      r => {
        expect(BigInt(r)).toBe(BigInt(340282366920938463463374607431768211455)); //this time, it is correct, but...
        expect(BigInt(r).valueOf()).not.toBe(340282366920938463463374607431768211455n); // not really,
        expect(BigInt(r).valueOf()).not.toBe(BigInt('340282366920938463463374607431768211455')); // not really, because what returned is lack of n
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
