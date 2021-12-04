const url = 'http://localhost:8081/api/';

export async function sendRequest(requestType, extra) {
	var page = "";
	var type;
	switch (requestType) {
		case ProductRequest:
			page = "products";
			type = "json";
			break;
		case ProductImageRequest:
			page = `products/${extra}/image`;
			type = "image";
			break;
		case AdvertRequest:
			page = `advert`;
			type = "json";
			break;
		case AdvertImageRequest:
			page = `advert/image`;
			type = "image";
			break;
		case OrderRequest:
			page = "orders";
			type = "json";
			break;
		case CustomerRequest:
			page = "customers";
			type = "json";
			break;
	}

	const res = await fetch(url + page, { mode: 'cors' });

	return type === "json" ? await res.json() : res;
}

export async function sendRequestWithData(requestType, data, extra) {
	var page = "";
	var method;
	var ctype = 'application/json';
	switch (requestType) {
		case OrderRequest:
			page = "order";
			method = "POST";
			data = JSON.stringify(data);
			break;
		case OrderStateRequest:
			page = "order/" + extra;
			method = "PUT";
			data = JSON.stringify(data);
			break;
		case AdvertRequest:
			page = `advert`;
			method = "PUT";
			data = JSON.stringify(data);
			break;
		case AdvertImageRequest:
			page = `advert/image`;
			method = "PUT";
			ctype = "image/jpeg";
			break;
	}

	const res = await fetch(url + page, {
		mode: 'cors',
		method: method,
		headers: {
			'Content-Type': ctype,
		},
		body: data,
	});
	return await res.json();
}

export const ProductRequest = Symbol();
export const ProductImageRequest = Symbol();
export const OrderRequest = Symbol();
export const OrderStateRequest = Symbol();
export const AdvertRequest = Symbol();
export const AdvertImageRequest = Symbol();
export const CustomerRequest = Symbol();