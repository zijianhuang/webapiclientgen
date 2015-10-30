namespace DemoWebApi_Controllers_Client {
    export class SuperDemo {
        client: System.Net.Http.HttpClient;
        baseUri: System.Uri;

        constructor(client: System.Net.Http.HttpClient, baseUri: System.Uri){
            if (client == null)
                  throw new ArgumentNullException("client", "Null HttpClient.");
            
            if (baseUri == null)
                  throw new ArgumentNullException("baseUri", "Null baseUri");
            
            this.client = client;
            this.baseUri = baseUri;
        }

        /** 
         * GET api/SuperDemo/int?d={d}
         * @param {number} d 
         * @return {void} 
         */
        GetIntSquare(d: number): number{
            var template: var = new System.UriTemplate("api/SuperDemo/int?d={d}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("d", d.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Int32.Parse(text);
        }

        /** 
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d 
         * @return {void} 
         */
        GetDecimalSquare(d: number): number{
            var template: var = new System.UriTemplate("api/SuperDemo/decimal?d={d}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("d", d.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<System.Decimal>(text);
        }

        /** 
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {void} 
         */
        GetDateTime(hasValue: boolean): Date{
            var template: var = new System.UriTemplate("api/SuperDemo/NullableDatetime?hasValue={hasValue}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("hasValue", hasValue.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<Nullable<System.DateTime>>(text);
        }

        /** 
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {void} 
         */
        GetNullableDecimal(hasValue: boolean): number{
            var template: var = new System.UriTemplate("api/SuperDemo/NullableDecimal?hasValue={hasValue}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("hasValue", hasValue.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<Nullable<System.Decimal>>(text);
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {void} 
         */
        GetFloatZero(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/FloatZero");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Single.Parse(text);
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {void} 
         */
        GetDoubleZero(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/DoubleZero");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Double.Parse(text);
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {void} 
         */
        GetDecimalZero(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/DecimalZero");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<System.Decimal>(text);
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {void} 
         */
        GetNullString(): string{
            var template: var = new System.UriTemplate("api/SuperDemo/NullString");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {void} 
         */
        GetEmptyString(): string{
            var template: var = new System.UriTemplate("api/SuperDemo/EmptyString");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {void} 
         */
        GetNullPerson(): DemoWebApi_DemoData_Client.Person{
            var template: var = new System.UriTemplate("api/SuperDemo/NullObject");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<DemoWebApi_DemoData_Client.Person>(text);
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {void} 
         */
        GetTextStream(): System.Net.Http.HttpResponseMessage{
            var template: var = new System.UriTemplate("api/SuperDemo/TextStream");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            return responseMessage;
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {void} 
         */
        GetByteArray(): Array<number>{
            var template: var = new System.UriTemplate("api/SuperDemo/ByteArray");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<System.Byte[]>(text);
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {void} 
         */
        GetActionResult(): System.Net.Http.HttpResponseMessage{
            var template: var = new System.UriTemplate("api/SuperDemo/ActionResult");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            return responseMessage;
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {void} 
         */
        Getbyte(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/byte");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Byte.Parse(text);
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {void} 
         */
        Getsbyte(): System.SByte{
            var template: var = new System.UriTemplate("api/SuperDemo/sbyte");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.SByte.Parse(text);
        }

        /** 
         * GET api/SuperDemo/short
         * @return {void} 
         */
        GetShort(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/short");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Int16.Parse(text);
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {void} 
         */
        GetUShort(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/ushort");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.UInt16.Parse(text);
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {void} 
         */
        GetUint(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/uint");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.UInt32.Parse(text);
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {void} 
         */
        Getulong(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/ulong");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.UInt64.Parse(text);
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {void} 
         */
        Getdouble(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/doulbe");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Double.Parse(text);
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {void} 
         */
        GetDecimal(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/decimal");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<System.Decimal>(text);
        }

        /** 
         * GET api/SuperDemo/char
         * @return {void} 
         */
        GetChar(): System.Char{
            var template: var = new System.UriTemplate("api/SuperDemo/char");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<char>(text);
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {void} 
         */
        GetBool(): boolean{
            var template: var = new System.UriTemplate("api/SuperDemo/bool");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Boolean.Parse(text);
        }
    }

    export class Entities {
        client: System.Net.Http.HttpClient;
        baseUri: System.Uri;

        constructor(client: System.Net.Http.HttpClient, baseUri: System.Uri){
            if (client == null)
                  throw new ArgumentNullException("client", "Null HttpClient.");
            
            if (baseUri == null)
                  throw new ArgumentNullException("baseUri", "Null baseUri");
            
            this.client = client;
            this.baseUri = baseUri;
        }

        /** 
         * Get a person
         * GET api/Entities/{id}
         * @param {number} id unique id of that guy
         * @return {void} person in db
         */
        GetPerson(id: number): DemoWebApi_DemoData_Client.Person{
            var template: var = new System.UriTemplate("api/Entities/{id}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("id", id.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<DemoWebApi_DemoData_Client.Person>(text);
        }

        /** 
         * POST api/Entities
         * @param {DemoWebApi.DemoData.Person} person 
         * @return {void} 
         */
        CreatePerson(person: DemoWebApi_DemoData_Client.Person): number{
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
        UpdatePerson(person: DemoWebApi_DemoData_Client.Person){
            var requestUri: var = new System.Uri(this.baseUri, "api/Entities");
            var responseMessage: var = this.client.PutAsJsonAsync(requestUri.ToString(), person).Result;
            responseMessage.EnsureSuccessStatusCode();
        }

        /** 
         * DELETE api/Entities/{id}
         * @param {number} id 
         * @return {void} 
         */
        Delete(id: number){
            var template: var = new System.UriTemplate("api/Entities/{id}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("id", id.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.DeleteAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
        }
    }

    export class Values {
        client: System.Net.Http.HttpClient;
        baseUri: System.Uri;

        constructor(client: System.Net.Http.HttpClient, baseUri: System.Uri){
            if (client == null)
                  throw new ArgumentNullException("client", "Null HttpClient.");
            
            if (baseUri == null)
                  throw new ArgumentNullException("baseUri", "Null baseUri");
            
            this.client = client;
            this.baseUri = baseUri;
        }

        /** 
         * GET api/Values
         * @return {void} 
         */
        Get(): Array<string>{
            var template: var = new System.UriTemplate("api/Values");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<IEnumerable<System.String>>(text);
        }

        /** 
         * GET api/Values/{id}?name={name}
         * @param {number} id 
         * @param {string} name 
         * @return {void} 
         */
        Get(id: number, name: string): string{
            var template: var = new System.UriTemplate("api/Values/{id}?name={name}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("id", id.ToString());
            uriParameters.Add("name", name);
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {void} 
         */
        Post(value: string): string{
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
        Delete(id: number){
            var template: var = new System.UriTemplate("api/Values/{id}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("id", id.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.DeleteAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
        }
    }

}

