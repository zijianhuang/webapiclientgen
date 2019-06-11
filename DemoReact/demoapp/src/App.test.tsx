import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AXIOS from 'axios';

const apiBaseUri = 'http://localhost:5000/';

const locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
class Values {
	constructor(private baseUri: string = locationOrigin) {

	}

	get(): Promise<Array<string>> {
		return AXIOS.get(this.baseUri + 'api/Values').then(d => d.data as Array<string>);
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

})

