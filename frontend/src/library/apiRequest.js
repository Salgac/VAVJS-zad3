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
	}

	const res = await fetch(url + page, { mode: 'cors' });

	return type === "json" ? await res.json() : res;
}

export async function sendRequestWithData(requestType, data) {
	var page = "";
	var method;
	switch (requestType) {
		case OrderRequest:
			page = "order";
			method = "POST";
			break;
	}

	const res = await fetch(url + page, {
		mode: 'cors',
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});
	return await res.json();
}

export const ProductRequest = Symbol();
export const ProductImageRequest = Symbol();
export const OrderRequest = Symbol();