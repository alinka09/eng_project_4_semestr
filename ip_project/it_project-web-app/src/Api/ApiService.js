import React from 'react'
const URL = 'http://engproject-4sem.std-960.ist.mospolytech.ru/api';


export default class ApiService extends React.Component {
	async getDatas(link) {
		let url = URL + `/${link}/`
		const response = await fetch(url, {
				method: "GET",
				headers: {
					'Authorization': `Token ${localStorage.token}`,
				}
			})
			.then((res) => res.json())
		return response
	}

	async getData(id, link) {
		let url = URL + `/${link}/${id}`;
		return await fetch(url, {
				method: "GET",
				headers: {
					'Authorization': `Token ${localStorage.token}`,
				}
			})
			.then((res) => res.json())
	}

	async deleteData(id, link) {
		let url = URL + `/${link}/${id}`;
		return await fetch(url, {
			method: "DELETE",
			headers: {
				'Authorization': `Token ${localStorage.token}`,
			}
		})
	}

	async createData(data, link) {
		let url = URL + `/${link}/`;
		return fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json',
					'Authorization': `Token ${localStorage.token}`,
				}
			})
			.then(res => {
				console.log(res)
			})
	}

	async updateData(data, link) {
		let url = URL + `/${link}/${data.id}`
		return fetch(url, {
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json',
					'Authorization': `Token ${localStorage.token}`,
				}
			})
			.then(res => {
				console.log(res)
			})
	}
}