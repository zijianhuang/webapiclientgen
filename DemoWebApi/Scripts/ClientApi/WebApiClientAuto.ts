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
        
        GetDateTime(hasValue: boolean): any{
            var template: var = new System.UriTemplate("api/SuperDemo/NullableDatetime?hasValue={hasValue}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("hasValue", hasValue.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<Nullable<System.DateTime>>(text);
        }
        
        GetNullableDecimal(hasValue: boolean): any{
            var template: var = new System.UriTemplate("api/SuperDemo/NullableDecimal?hasValue={hasValue}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("hasValue", hasValue.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<Nullable<System.Decimal>>(text);
        }
        
        GetFloatZero(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/FloatZero");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Single.Parse(text);
        }
        
        GetDoubleZero(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/DoubleZero");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Double.Parse(text);
        }
        
        GetDecimalZero(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/DecimalZero");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<System.Decimal>(text);
        }
        
        GetNullString(): string{
            var template: var = new System.UriTemplate("api/SuperDemo/NullString");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }
        
        GetEmptyString(): string{
            var template: var = new System.UriTemplate("api/SuperDemo/EmptyString");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }
        
        GetNullPerson(): DemoWebApi_DemoData_Client.Person{
            var template: var = new System.UriTemplate("api/SuperDemo/NullObject");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<DemoWebApi_DemoData_Client.Person>(text);
        }
        
        GetTextStream(): System.Net.Http.HttpResponseMessage{
            var template: var = new System.UriTemplate("api/SuperDemo/TextStream");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            return responseMessage;
        }
        
        GetByteArray(): Array<number>{
            var template: var = new System.UriTemplate("api/SuperDemo/ByteArray");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<System.Byte[]>(text);
        }
        
        GetActionResult(): System.Net.Http.HttpResponseMessage{
            var template: var = new System.UriTemplate("api/SuperDemo/ActionResult");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            return responseMessage;
        }
        
        Getbyte(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/byte");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Byte.Parse(text);
        }
        
        Getsbyte(): System.SByte{
            var template: var = new System.UriTemplate("api/SuperDemo/sbyte");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.SByte.Parse(text);
        }
        
        GetShort(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/short");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Int16.Parse(text);
        }
        
        GetUShort(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/ushort");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.UInt16.Parse(text);
        }
        
        GetUint(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/uint");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.UInt32.Parse(text);
        }
        
        Getulong(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/ulong");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.UInt64.Parse(text);
        }
        
        Getdouble(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/doulbe");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Double.Parse(text);
        }
        
        GetDecimal(): number{
            var template: var = new System.UriTemplate("api/SuperDemo/decimal");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<System.Decimal>(text);
        }
        
        GetChar(): System.Char{
            var template: var = new System.UriTemplate("api/SuperDemo/char");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<char>(text);
        }
        
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
        
        CreatePerson(person: DemoWebApi_DemoData_Client.Person): number{
            var requestUri: var = new System.Uri(this.baseUri, "api/Entities");
            var responseMessage: var = this.client.PostAsJsonAsync(requestUri.ToString(), person).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return System.Int64.Parse(text);
        }
        
        UpdatePerson(person: DemoWebApi_DemoData_Client.Person){
            var requestUri: var = new System.Uri(this.baseUri, "api/Entities");
            var responseMessage: var = this.client.PutAsJsonAsync(requestUri.ToString(), person).Result;
            responseMessage.EnsureSuccessStatusCode();
        }
        
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
        
        Get(): Array<string>{
            var template: var = new System.UriTemplate("api/Values");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.GetAsync(requestUri.ToString()).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<IEnumerable<System.String>>(text);
        }
        
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
        
        Post(value: string): string{
            var requestUri: var = new System.Uri(this.baseUri, "api/Values");
            var responseMessage: var = this.client.PostAsJsonAsync(requestUri.ToString(), value).Result;
            responseMessage.EnsureSuccessStatusCode();
            var text: var = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<string>(text);
        }
        
        Put(id: number, value: string){
            var template: var = new System.UriTemplate("api/Values/{id}");
            var uriParameters: var = new System.Collections.Specialized.NameValueCollection();
            uriParameters.Add("id", id.ToString());
            var requestUri: var = template.BindByName(this.baseUri, uriParameters);
            var responseMessage: var = this.client.PutAsJsonAsync(requestUri.ToString(), value).Result;
            responseMessage.EnsureSuccessStatusCode();
        }
        
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

