import AXIOS from 'axios';
import * as namespaces from './clientapi/WebApiAxiosClientAuto';
//import * as namespaces from './clientapi/WebApiCoreAxiosClientAuto';

const DemoWebApi_Controllers_Client = namespaces.DemoWebApi_Controllers_Client;
const apiBaseUri = 'http://localhost:10965/';

it('simple axios', async () => {
	const data = await AXIOS.get('https://fonlow.com');
	expect(data).toBeDefined();
});

it('simple axios not reachable', async () => {
	try {
		const data = await AXIOS.get('https://fonlowkkkk.com');
		expect(true).toBeFalsy();
	} catch (e) {
		//do nothing
	}
});

describe("values api", () => {
	const valuesApi = new DemoWebApi_Controllers_Client.Values(apiBaseUri);
	console.debug('created');
	it('get', async () => {
		const data = await AXIOS.get('http://localhost:10965/api/values')
		const v: Array<string> = data.data;
		expect(v[1]).toEqual('value2');
	});

	test('get2', async () => {
		const data = await AXIOS.get('http://localhost:10965/api/values').then(d => d.data as Array<string>);
		expect(data[1]).toEqual('value2');
	});

	test('get3', async () => {
		const data = await valuesApi.get();
		expect(data[1]).toEqual('value2');
	});

	it('getByIdAndName', async () => {
		const data = await valuesApi.getByIdAndName(1, 'Abc');
		expect(data).toBe('Abc1');		
	});

	it('post', async () => {
		const data = await valuesApi.post('Abc');
		expect(data).toBe('ABC');
	});

	it('put', async () => {
		const response = await valuesApi.put(1, 'Efg');
		expect(response.status).toBeLessThan(250);//200 or 204
	});

	it('delete', async () => {
		const response = await valuesApi.delete(999);
		expect(response.status).toBeLessThan(250);
	});


})

