import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import * as namespaces from './WebApiNG2ClientAuto';

const apiBaseUri = 'http://localhost:10965/';//for DemoWebApi
//const apiBaseUri = 'http://localhost:5000/'; //for DemoCoreWeb

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


export function errorResponseToString(error: HttpErrorResponse | any, ): string {
  let errMsg: string;
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      errMsg = 'No response from backend. Connection is unavailable.';
    }
    else {
      if (error.message) {
        errMsg = `${error.status} - ${error.statusText}: ${error.message}`;
      }
      else {
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



})


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
    })

    service = TestBed.get(namespaces.DemoWebApi_Controllers_Client.Heroes);
  }));

  it('getAll', (done) => {
    service.get().subscribe(
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

})

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

  //it('getPersonNotFound', (done) => {
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
  //}
  //);

  it('add', (done) => {
    let id: number;
    let newPerson: namespaces.DemoWebApi_DemoData_Client.Person = {
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


})

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
    })

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
    var dt = new Date(Date.now());
    var h = dt.getHours();
    service.getNextHour(dt).subscribe(
      data => {
        let dd = new Date(data);
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
    var dt = new Date(Date.now());
    var h = dt.getFullYear();
    service.getNextYear(dt).subscribe(
      data => {
        let dd = new Date(data);
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
    var dt = new Date(Date.now());
    var h = dt.getFullYear();
    service.postNextYear(dt).subscribe(
      data => {
        let dd = new Date(data);
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
        expect(data).toBe(10000)
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
        expect(data).toBe(10000)
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




})
