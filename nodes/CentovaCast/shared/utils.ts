import type { IExecuteFunctions } from 'n8n-workflow';

export function buildServerParams(
	ctx: IExecuteFunctions,
	params: Record<string, string>,
	operation: string,
	i: number,
): void {
	switch (operation) {
		case 'getstatus':
		case 'getsongs':
		case 'getlisteners': {
			const mountpoints = ctx.getNodeParameter('mountpoints', i, '') as string;
			if (mountpoints) params.mountpoints = mountpoints;
			break;
		}
		case 'copyfile': {
			params.sourcefile = ctx.getNodeParameter('sourcefile', i) as string;
			params.destfile = ctx.getNodeParameter('destfile', i) as string;
			break;
		}
		case 'getlogs': {
			params.type = ctx.getNodeParameter('logType', i) as string;
			params.page = String(ctx.getNodeParameter('page', i));
			break;
		}
		case 'start': {
			const noapps = ctx.getNodeParameter('noapps', i, '') as string;
			if (noapps) params.noapps = noapps;
			break;
		}
		case 'switchsource': {
			params.state = ctx.getNodeParameter('switchState', i) as string;
			break;
		}
		case 'reindex': {
			const reindexOpts = ctx.getNodeParameter('reindexOptions', i, {}) as Record<
				string,
				unknown
			>;
			applyCollectionParams(params, reindexOpts);
			break;
		}
		case 'playlist': {
			params.action = ctx.getNodeParameter('playlistAction', i) as string;
			const playlistOpts = ctx.getNodeParameter('playlistOptions', i, {}) as Record<
				string,
				unknown
			>;
			applyCollectionParams(params, playlistOpts);
			break;
		}
		case 'managedj': {
			params.action = ctx.getNodeParameter('djAction', i) as string;
			params.djusername = ctx.getNodeParameter('djusername', i) as string;
			const djAction = params.action;
			if (djAction === 'provision' || djAction === 'reconfigure') {
				const djOpts = ctx.getNodeParameter('djOptions', i, {}) as Record<string, unknown>;
				applyCollectionParams(params, djOpts);
			}
			break;
		}
		case 'reconfigure': {
			const reconfOpts = ctx.getNodeParameter('reconfigureOptions', i, {}) as Record<
				string,
				unknown
			>;
			applyCollectionParams(params, reconfOpts);
			break;
		}
		case 'report': {
			const reportOpts = ctx.getNodeParameter('reportOptions', i, {}) as Record<
				string,
				unknown
			>;
			applyCollectionParams(params, reportOpts);
			break;
		}
		case 'archivelogs': {
			const archOpts = ctx.getNodeParameter('archiveOptions', i, {}) as Record<
				string,
				unknown
			>;
			applyCollectionParams(params, archOpts);
			break;
		}
	}
}

export function buildSystemParams(
	ctx: IExecuteFunctions,
	params: Record<string, string>,
	operation: string,
	i: number,
): void {
	switch (operation) {
		case 'rename': {
			params.username = ctx.getNodeParameter('systemUsername', i) as string;
			params.newusername = ctx.getNodeParameter('newusername', i) as string;
			break;
		}
		case 'setstatus': {
			params.username = ctx.getNodeParameter('systemUsername', i) as string;
			params.status = ctx.getNodeParameter('accountStatus', i) as string;
			break;
		}
		case 'check':
		case 'info':
		case 'usage': {
			params.username = ctx.getNodeParameter('systemUsername', i) as string;
			break;
		}
		case 'reparent': {
			params.username = ctx.getNodeParameter('systemUsername', i) as string;
			params.newreseller = ctx.getNodeParameter('newreseller', i) as string;
			break;
		}
		case 'terminate': {
			params.username = ctx.getNodeParameter('systemUsername', i) as string;
			const clientAction = ctx.getNodeParameter('clientaction', i) as string;
			params.clientaction = clientAction;
			if (clientAction === 'reparent') {
				params.targetreseller = ctx.getNodeParameter('targetreseller', i, '') as string;
			}
			break;
		}
		case 'appchange': {
			params.username = ctx.getNodeParameter('systemUsername', i) as string;
			params.newapp = ctx.getNodeParameter('newapp', i) as string;
			break;
		}
		case 'batch': {
			params.method = ctx.getNodeParameter('batchMethod', i) as string;
			params.username = ctx.getNodeParameter('batchUsernames', i) as string;
			break;
		}
		case 'listaccounts': {
			const listOpts = ctx.getNodeParameter('listOptions', i, {}) as Record<string, unknown>;
			applyCollectionParams(params, listOpts);
			break;
		}
		case 'provision': {
			params.username = ctx.getNodeParameter('provisionUsername', i) as string;
			params.hostname = ctx.getNodeParameter('provisionHostname', i) as string;
			params.ipaddress = ctx.getNodeParameter('provisionIp', i) as string;
			params.port = ctx.getNodeParameter('provisionPort', i) as string;
			params.rpchostid = String(ctx.getNodeParameter('rpchostid', i));
			params.maxclients = String(ctx.getNodeParameter('provisionMaxClients', i));
			params.adminpassword = ctx.getNodeParameter('provisionAdminPassword', i) as string;
			params.sourcepassword = ctx.getNodeParameter('provisionSourcePassword', i) as string;
			params.maxbitrate = String(ctx.getNodeParameter('provisionMaxBitrate', i));
			params.transferlimit = ctx.getNodeParameter('provisionTransferLimit', i) as string;
			params.diskquota = ctx.getNodeParameter('provisionDiskQuota', i) as string;
			params.title = ctx.getNodeParameter('provisionTitle', i) as string;
			params.organization = ctx.getNodeParameter('provisionOrg', i) as string;
			params.email = ctx.getNodeParameter('provisionEmail', i) as string;
			const provOpts = ctx.getNodeParameter('provisionOptions', i, {}) as Record<
				string,
				unknown
			>;
			applyCollectionParams(params, provOpts);
			break;
		}
		case 'backup': {
			const scope = ctx.getNodeParameter('backupScope', i) as string;
			if (scope === 'all') params.all = '1';
			else if (scope === 'users') params.users = '1';
			else if (scope === 'resellers') params.resellers = '1';
			else params.username = ctx.getNodeParameter('backupUsername', i) as string;
			const backupOpts = ctx.getNodeParameter('backupOptions', i, {}) as Record<
				string,
				unknown
			>;
			for (const [key, val] of Object.entries(backupOpts)) {
				if (val === true) params[key] = '1';
			}
			break;
		}
		case 'restore': {
			params.username = ctx.getNodeParameter('restoreUsername', i) as string;
			params.filename = ctx.getNodeParameter('restoreFilename', i) as string;
			const restOpts = ctx.getNodeParameter('restoreOptions', i, {}) as Record<
				string,
				unknown
			>;
			applyCollectionParams(params, restOpts);
			break;
		}
		case 'database': {
			params.action = ctx.getNodeParameter('dbAction', i) as string;
			params.username = ctx.getNodeParameter('dbUsername', i) as string;
			params.filename = ctx.getNodeParameter('dbFilename', i) as string;
			break;
		}
	}
}

function applyCollectionParams(
	params: Record<string, string>,
	opts: Record<string, unknown>,
): void {
	for (const [key, val] of Object.entries(opts)) {
		if (val !== '' && val !== 0 && val !== false && val !== undefined) {
			params[key] = typeof val === 'boolean' ? (val ? '1' : '0') : String(val);
		}
	}
}
