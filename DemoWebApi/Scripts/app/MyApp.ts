/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../ClientApi/WebApiClientAuto.ts"/>
/// <reference path="../ClientApi/HttpClient.ts" />
namespace MyApp {

    export class First {
        getPerson() {
            var api = new DemoWebApi_Controllers_Client.Entities();
            //api.GetPerson(100, (data) => { $('#nameTag').html("<pre>" + data.Name + "</pre>"); });
        }

        getArrayLastMember() {
            var api = new DemoWebApi_Controllers_Client.SuperDemo(window.location.origin+'/');
            api.GetIntArray((data) => { $('#nameTag').html("<pre>" + data[7] + "</pre>"); });
        }

        postObject() {
            var api = new DemoWebApi_Controllers_Client.SuperDemo();
            api.PostAnonymousObject({ Id: '12345', Name: 'Something' }, (data) => { $('#nameTag').html("<pre>" + data.Name + "</pre>"); });
        }

        addPerson() {
            var api = new DemoWebApi_Controllers_Client.Entities();
            api.CreatePerson({
                Name: "some body",
                GivenName: "some",
                Surname: "body",
                BirthDate: new Date("1977-08-18"),
                Addresses: [{
                    City: "Brisbane",
                    State: "QLD",
                    Type: DemoWebApi_DemoData_Client.AddressType.Residential
                }]
            }, (data) => {
                alert(data);
            });
        }

    }
        
}

var first = new MyApp.First();