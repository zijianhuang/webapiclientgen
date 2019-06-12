import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AXIOS from 'axios';

const apiBaseUri = 'http://localhost:5000/';

const locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
class Values {
	constructor(private baseUri: string = locationOrigin) {

	}

	delete(id: number) {
		return AXIOS.delete(this.baseUri + 'api/Values/' + id);
	}

	get(): Promise<Array<string>> {
		return AXIOS.get(this.baseUri + 'api/Values').then(d => d.data as Array<string>);
	}

	getByIdAndName(id: number, name: string): Promise<string> {
		return AXIOS.get(this.baseUri + 'api/Values/' + id + '?name=' + encodeURIComponent(name)).then(d => d.data as string);
	}

	post(value: string) {
		return AXIOS.post(this.baseUri + 'api/Values', JSON.stringify(value), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as string);
	}

	put(id: number, value: string) {
		return AXIOS.put(this.baseUri + 'api/Values/' + id, JSON.stringify(value), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
	}
}

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});

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
	const valuesApi = new Values(apiBaseUri);
	console.debug('created');
	it('get', async () => {
		const data = await AXIOS.get('http://localhost:5000/api/values')
		const v: Array<string> = data.data;
		expect(v[1]).toEqual('value2');
	});

	test('get2', async () => {
		const data = await AXIOS.get('http://localhost:5000/api/values').then(d => d.data as Array<string>);
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
		expect(response.status).toBe(200);
	});

	it('delete', async () => {
		const response = await valuesApi.delete(999);
		expect(response.status).toBe(200);
	});


})

