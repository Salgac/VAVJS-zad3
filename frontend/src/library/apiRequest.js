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

export const ProductRequest = Symbol();
export const ProductImageRequest = Symbol();