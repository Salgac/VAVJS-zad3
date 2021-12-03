const url = 'http://localhost:8081/api/';

export async function sendRequest(requestType) {
	var page = "";
	switch (requestType) {
		case ProductRequest:
			page = "products";
			break;
	}

	const res = await fetch(url + page, { mode: 'cors' });
	return await res.json();
}

export const ProductRequest = Symbol();