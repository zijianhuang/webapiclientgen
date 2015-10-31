namespace DemoWebApi_Controllers_Client {
    export class SuperDemo {
        httpClient: HttpClient;
        error: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => any;
        statusCode: { [key: string]: any; };

        constructor(error?:  (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, statusCode?: { [key: string]: any; }){
            this.httpClient = new HttpClient();
            this.error = error;
            this.statusCode = statusCode;
        }

        /** 
         * GET api/SuperDemo/int?d={d}
         * @param {number} d 
         * @return {void} 
         */
        GetIntSquare(d: number, callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/int?d={d}'+'d='+d, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d 
         * @return {void} 
         */
        GetDecimalSquare(d: number, callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/decimal?d={d}'+'d='+d, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {void} 
         */
        GetDateTime(hasValue: boolean, callback: (data : Date) = > any){
            this.httpClient.get('api/SuperDemo/NullableDatetime?hasValue={hasValue}'+'hasValue='+hasValue, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {void} 
         */
        GetNullableDecimal(hasValue: boolean, callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/NullableDecimal?hasValue={hasValue}'+'hasValue='+hasValue, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {void} 
         */
        GetFloatZero(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/FloatZero', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {void} 
         */
        GetDoubleZero(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/DoubleZero', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {void} 
         */
        GetDecimalZero(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/DecimalZero', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {void} 
         */
        GetNullString(callback: (data : string) = > any){
            this.httpClient.get('api/SuperDemo/NullString', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {void} 
         */
        GetEmptyString(callback: (data : string) = > any){
            this.httpClient.get('api/SuperDemo/EmptyString', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {void} 
         */
        GetNullPerson(callback: (data : DemoWebApi_DemoData_Client.Person) = > any){
            this.httpClient.get('api/SuperDemo/NullObject', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {void} 
         */
        GetTextStream(callback: (data : System.Net.Http.HttpResponseMessage) = > any){
            this.httpClient.get('api/SuperDemo/TextStream', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {void} 
         */
        GetByteArray(callback: (data : Array<number>) = > any){
            this.httpClient.get('api/SuperDemo/ByteArray', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {void} 
         */
        GetActionResult(callback: (data : System.Web.Http.IHttpActionResult) = > any){
            this.httpClient.get('api/SuperDemo/ActionResult', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {void} 
         */
        Getbyte(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/byte', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {void} 
         */
        Getsbyte(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/sbyte', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/short
         * @return {void} 
         */
        GetShort(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/short', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {void} 
         */
        GetUShort(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/ushort', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {void} 
         */
        GetUint(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/uint', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {void} 
         */
        Getulong(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/ulong', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {void} 
         */
        Getdouble(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/doulbe', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {void} 
         */
        GetDecimal(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/decimal', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/char
         * @return {void} 
         */
        GetChar(callback: (data : string) = > any){
            this.httpClient.get('api/SuperDemo/char', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {void} 
         */
        GetBool(callback: (data : boolean) = > any){
            this.httpClient.get('api/SuperDemo/bool', callback, this.error, this.statusCode);
        }
    }

    export class Entities {
        httpClient: HttpClient;
        error: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => any;
        statusCode: { [key: string]: any; };

        constructor(error?:  (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, statusCode?: { [key: string]: any; }){
            this.httpClient = new HttpClient();
            this.error = error;
            this.statusCode = statusCode;
        }

        /** 
         * Get a person
         * GET api/Entities/{id}
         * @param {number} id unique id of that guy
         * @return {void} person in db
         */
        GetPerson(id: number, callback: (data : DemoWebApi_DemoData_Client.Person) = > any){
            this.httpClient.get('api/Entities/{id}'+'id='+id, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        CreatePerson(person: DemoWebApi_DemoData_Client.Person, callback: (data : number) = > any){
            this.httpClient.post('api/Entities'+'person='+person, person, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        UpdatePerson(person: DemoWebApi_DemoData_Client.Person, callback: (data : ) = > any){
            this.httpClient.put('api/Entities'+'person='+person, person, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Entities/{id}
         * @param {number} id 
         * @return {void} 
         */
        Delete(id: number, callback: (data : ) = > any){
            this.httpClient.delete('api/Entities/{id}'+'id='+id, callback, this.error, this.statusCode);
        }
    }

    export class Values {
        httpClient: HttpClient;
        error: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => any;
        statusCode: { [key: string]: any; };

        constructor(error?:  (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, statusCode?: { [key: string]: any; }){
            this.httpClient = new HttpClient();
            this.error = error;
            this.statusCode = statusCode;
        }

        /** 
         * GET api/Values
         * @return {void} 
         */
        Get(callback: (data : Array<string>) = > any){
            this.httpClient.get('api/Values', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Values/{id}?name={name}
         * @param {number} id 
         * @param {string} name 
         * @return {void} 
         */
        Get(id: number, name: string, callback: (data : string) = > any){
            this.httpClient.get('api/Values/{id}?name={name}'+'id='+id&+'name='+name, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {void} 
         */
        Post(value: string, callback: (data : string) = > any){
            this.httpClient.post('api/Values'+'value='+value, value, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        Put(id: number, value: string, callback: (data : ) = > any){
            this.httpClient.put('api/Values/{id}'+'id='+id&+'value='+value, value, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        Delete(id: number, callback: (data : ) = > any){
            this.httpClient.delete('api/Values/{id}'+'id='+id, callback, this.error, this.statusCode);
        }
    }

}

