export async function $fetch(
	method: "GET" | "POST" | "PUT" | "DELETE",
	url: string,
	data?: any,
) {
	const response = await fetch(url, { method, body: JSON.stringify(data) });
	console.log({ response, ok: response.ok });
	const json = await response.json();
	console.log({ json });
	return json as ResponseType;
}

type ResponseType = {
	success: boolean;
	data: any;
};
