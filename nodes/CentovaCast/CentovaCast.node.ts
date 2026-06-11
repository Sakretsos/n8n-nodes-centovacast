import {
	NodeConnectionTypes,
	NodeApiError,
	type JsonObject,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { centovaCastApiRequest } from './shared/transport';
import { buildServerParams, buildSystemParams } from './shared/utils';
import { serverProperties } from './resources/server';
import { systemProperties } from './resources/system';

export class CentovaCast implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Centova Cast',
		name: 'centovaCast',
		icon: 'file:centovaCast.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Manage Centova Cast streaming servers via the JSON API',
		defaults: {
			name: 'Centova Cast',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'centovaCastApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Server',
						value: 'server',
						description: 'Manage individual streaming server accounts',
					},
					{
						name: 'System',
						value: 'system',
						description: 'System-wide administration operations',
					},
				],
				default: 'server',
			},
			...serverProperties,
			...systemProperties,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('centovaCastApi');
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const method = `${resource}.${operation}`;

				const params: Record<string, string> = {};

				if (resource === 'server') {
					const accountUsername = this.getNodeParameter('accountUsername', i) as string;
					params.username = accountUsername;
					params.password = `admin|${credentials.password as string}`;
				} else {
					params.username = credentials.username as string;
					params.password = credentials.password as string;
				}

				if (resource === 'server') {
					buildServerParams(this, params, operation, i);
				}

				if (resource === 'system') {
					buildSystemParams(this, params, operation, i);
				}

				const response = await centovaCastApiRequest.call(this, credentials, method, params);

				if (response.type === 'error') {
					throw new NodeApiError(this.getNode(), response as Record<string, never>, {
						message: response.response?.message || 'Unknown API error',
						itemIndex: i,
					});
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(
						response.response?.data || response.response || response,
					),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
