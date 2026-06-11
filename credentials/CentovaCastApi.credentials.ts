import type {
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export class CentovaCastApi implements ICredentialType {
	name = 'centovaCastApi';

	displayName = 'Centova Cast API';

	documentationUrl = 'https://centova.com/doc/cast/internals/API_Reference';

	icon = 'file:../nodes/CentovaCast/centovaCast.svg' as const;

	async authenticate(
		_credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		return requestOptions;
	}

	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url: '={{$credentials.baseUrl.replace(/\\/+$/, "")}}/api.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body:
				'xm=system.version&f=json&a[username]={{$credentials.username}}&a[password]={{$credentials.password}}',
		},
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://example.com:2199',
			description:
				'The base URL of your Centova Cast installation (e.g. https://example.com:2199)',
			required: true,
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			description: 'Your Centova Cast admin or account username',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your Centova Cast admin or account password',
			required: true,
		},
	];
}
