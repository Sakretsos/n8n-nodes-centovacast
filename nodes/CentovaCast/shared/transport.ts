import type { ICredentialDataDecryptedObject, IExecuteFunctions } from 'n8n-workflow';

export async function centovaCastApiRequest(
	this: IExecuteFunctions,
	credentials: ICredentialDataDecryptedObject,
	method: string,
	params: Record<string, string>,
) {
	const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');

	const formData: Record<string, string> = {
		xm: method,
		f: 'json',
	};
	for (const [k, v] of Object.entries(params)) {
		formData[`a[${k}]`] = v;
	}

	return await this.helpers.httpRequestWithAuthentication.call(this, 'centovaCastApi', {
		method: 'POST',
		url: `${baseUrl}/api.php`,
		body: new URLSearchParams(formData).toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
}
