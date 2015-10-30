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
            this.httpClient.get('api/SuperDemo/int?d={d}'+'d='+d&+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Int32.Parse(text);
        }

        /** 
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d 
         * @return {void} 
         */
        GetDecimalSquare(d: number, callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/decimal?d={d}'+'d='+d&+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<number>(text);
        }

        /** 
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {void} 
         */
        GetDateTime(hasValue: boolean, callback: (data : Date) = > any){
            this.httpClient.get('api/SuperDemo/NullableDatetime?hasValue={hasValue}'+'hasValue='+hasValue&+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<Nullable<Date>>(text);
        }

        /** 
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {void} 
         */
        GetNullableDecimal(hasValue: boolean, callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/NullableDecimal?hasValue={hasValue}'+'hasValue='+hasValue&+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<Nullable<number>>(text);
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {void} 
         */
        GetFloatZero(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/FloatZero'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Single.Parse(text);
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {void} 
         */
        GetDoubleZero(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/DoubleZero'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Double.Parse(text);
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {void} 
         */
        GetDecimalZero(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/DecimalZero'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<number>(text);
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {void} 
         */
        GetNullString(callback: (data : string) = > any){
            this.httpClient.get('api/SuperDemo/NullString'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {void} 
         */
        GetEmptyString(callback: (data : string) = > any){
            this.httpClient.get('api/SuperDemo/EmptyString'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {void} 
         */
        GetNullPerson(callback: (data : DemoWebApi.DemoData.Person) = > any){
            this.httpClient.get('api/SuperDemo/NullObject'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<DemoWebApi.DemoData.Person>(text);
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {void} 
         */
        GetTextStream(callback: (data : System.Net.Http.HttpResponseMessage) = > any){
            this.httpClient.get('api/SuperDemo/TextStream'+'callback='+callback, callback, this.error, this.statusCode);
            return responseMessage;
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {void} 
         */
        GetByteArray(callback: (data : Array<number>) = > any){
            this.httpClient.get('api/SuperDemo/ByteArray'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<Array<number>>(text);
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {void} 
         */
        GetActionResult(callback: (data : System.Web.Http.IHttpActionResult) = > any){
            this.httpClient.get('api/SuperDemo/ActionResult'+'callback='+callback, callback, this.error, this.statusCode);
            return responseMessage;
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {void} 
         */
        Getbyte(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/byte'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Byte.Parse(text);
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {void} 
         */
        Getsbyte(callback: (data : System.SByte) = > any){
            this.httpClient.get('api/SuperDemo/sbyte'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.SByte.Parse(text);
        }

        /** 
         * GET api/SuperDemo/short
         * @return {void} 
         */
        GetShort(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/short'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Int16.Parse(text);
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {void} 
         */
        GetUShort(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/ushort'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.UInt16.Parse(text);
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {void} 
         */
        GetUint(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/uint'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.UInt32.Parse(text);
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {void} 
         */
        Getulong(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/ulong'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.UInt64.Parse(text);
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {void} 
         */
        Getdouble(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/doulbe'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Double.Parse(text);
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {void} 
         */
        GetDecimal(callback: (data : number) = > any){
            this.httpClient.get('api/SuperDemo/decimal'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<number>(text);
        }

        /** 
         * GET api/SuperDemo/char
         * @return {void} 
         */
        GetChar(callback: (data : System.Char) = > any){
            this.httpClient.get('api/SuperDemo/char'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<char>(text);
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {void} 
         */
        GetBool(callback: (data : boolean) = > any){
            this.httpClient.get('api/SuperDemo/bool'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Boolean.Parse(text);
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
        GetPerson(id: number, callback: (data : DemoWebApi.DemoData.Person) = > any){
            this.httpClient.get('api/Entities/{id}'+'id='+id&+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<DemoWebApi.DemoData.Person>(text);
        }

        /** 
         * POST api/Entities
         * @param {DemoWebApi.DemoData.Person} person 
         * @return {void} 
         */
        CreatePerson(person: DemoWebApi.DemoData.Person){
            var requestUri: var = new System.Uri(this.baseUri, "api/Entities");
            var responseMessage: var = this.client.PostAsJsonAsync(requestUri.ToString(), person).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Int64.Parse(text);
        }

        /** 
         * PUT api/Entities
         * @param {DemoWebApi.DemoData.Person} person 
         * @return {void} 
         */
        UpdatePerson(person: DemoWebApi.DemoData.Person){
            var requestUri: var = new System.Uri(this.baseUri, "api/Entities");
            var responseMessage: var = this.client.PutAsJsonAsync(requestUri.ToString(), person).Result;
            responseMessage.EnsureSuccessStatusCode();
        }

        /** 
         * DELETE api/Entities/{id}
         * @param {number} id 
         * @return {void} 
         */
        Delete(id: number, callback: (data : ) = > any){
            this.httpClient.get('api/Entities/{id}'+'id='+id&+'callback='+callback, callback, this.error, this.statusCode);
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
            this.httpClient.get('api/Values'+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<IEnumerable<string>>(text);
        }

        /** 
         * GET api/Values/{id}?name={name}
         * @param {number} id 
         * @param {string} name 
         * @return {void} 
         */
        Get(id: number, name: string, callback: (data : string) = > any){
            this.httpClient.get('api/Values/{id}?name={name}'+'id='+id&+'name='+name&+'callback='+callback, callback, this.error, this.statusCode);
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {void} 
         */
        Post(value: string){
            var requestUri: var = new System.Uri(this.baseUri, "api/Values");
            var responseMessage: var = this.client.PostAsJsonAsync(requestUri.ToString(), value).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        Put(id: number, value: string){
            var template: var = new System.UriTemplate("api/Values/{id}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("id", id.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.PutAsJsonAsync(requestUri.ToString(), value).Result;
            responseMessage.EnsureSuccessStatusCode();
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        Delete(id: number, callback: (data : ) = > any){
            this.httpClient.get('api/Values/{id}'+'id='+id&+'callback='+callback, callback, this.error, this.statusCode);
        }
    }

}

