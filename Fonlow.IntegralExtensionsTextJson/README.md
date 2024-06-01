**For ASP.NET Core 7 and above, needed by JavaScript clients and any naughty client, since System.Text.Json is a bit less fault tolerant thant Newtonsoft.Json**

ASP.NET by default will serialize all [integral numeric  types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) and BigInteger to JSON number, however for long and ulong of 64bit, a JavaScript client by default will have problems of keeping the precision due to the [53bit limitation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).

.NET 7 and onward have 2 new integral types: [Int128](https://learn.microsoft.com/en-us/dotnet/api/system.int128) and UInt128, and ASP.NET serializes them to JSON string, as long as a JavaScript gladly accept it as a string and transform the JSON string object to BigInt, the precision is kept.

The following derived classes of `NewtonSoft.Json.JsonConverter` make ASP.NET serialize integral types of 64bit and BigInteger the way of handling Int128 and UInt128.

1. Int64JsonConverter
1. UInt64JsonConverter
1. BigIntegerJsonConverter

## Usage

Backend:

```c#
.AddJsonOptions(
options =>
{
	options.JsonSerializerOptions.Converters.Add(new BigIntegerJsonConverter());
	options.JsonSerializerOptions.Converters.Add(new Int64JsonConverter());
	options.JsonSerializerOptions.Converters.Add(new UInt64JsonConverter());
	options.JsonSerializerOptions.Converters.Add(new Int128JsonConverter());
	options.JsonSerializerOptions.Converters.Add(new UInt128JsonConverter());
);

...

[HttpPost]
[Route("int64")]
public long PostInt64([FromBody] long int64)
{
	return int64;
}


```


JavaScript client:

```js
it('postInt64', (done) => {
	service.postInt64('9223372036854775807').subscribe(
		r => {
			expect(BigInt(r)).toBe(BigInt('9223372036854775807'));
			done();
		},
		error => {
			fail(errorResponseToString(error));
			done();
		}
	);
}
);

...

/**
	* POST api/Numbers/int64
	* @param {string} int64 Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
	* @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
	*/
postInt64(int64?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
	return this.http.post<string>(this.baseUri + 'api/Numbers/int64', JSON.stringify(int64), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
}

```


**Remarks:**

* `options.JsonSerializerOptions.NumberHandling` may adjust the behavior of serializing and deserializing numbers, however, if you serialize numbers into string in wholesale way, this could break existing clients. So generally for number types below Int64, better leave them as JSON number object as the old way.
* Changing the serialization may be a breaking changes to existing clients. Please make sure you evaluate your technical context and carefully plan for versioning.