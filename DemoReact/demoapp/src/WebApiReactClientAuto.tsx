import React from 'react';
import ReactDOM from 'react-dom';
import AXIOS from 'axios';

export namespace DemoWebApi_Controllers_Client {

	export class Values {
		//const locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {

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
}