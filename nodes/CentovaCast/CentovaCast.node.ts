import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	NodeApiError,
} from 'n8n-workflow';

export class CentovaCast implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Centova Cast',
		name: 'centovaCast',
		icon: 'file:centovaCast.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Manage Centova Cast streaming servers via the JSON API',
		defaults: {
			name: 'Centova Cast',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'centovaCastApi',
				required: true,
			},
		],
		properties: [
			// ── Resource ──
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Server', value: 'server', description: 'Manage individual streaming server accounts' },
					{ name: 'System', value: 'system', description: 'System-wide administration operations' },
				],
				default: 'server',
			},

			// ══════════════════════════════════════════════
			//              SERVER OPERATIONS
			// ══════════════════════════════════════════════
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['server'] } },
				options: [
					{ name: 'Archive Logs', value: 'archivelogs', description: 'Archive logs for the account', action: 'Archive logs' },
					{ name: 'Authenticate', value: 'authenticate', description: 'Test whether credentials are valid', action: 'Authenticate' },
					{ name: 'Copy File', value: 'copyfile', description: 'Copy a file into the account spool directory', action: 'Copy file' },
					{ name: 'Enabled', value: 'enabled', description: 'Get basic account state information', action: 'Get enabled state' },
					{ name: 'Get Account', value: 'getaccount', description: 'Retrieve account configuration', action: 'Get account' },
					{ name: 'Get Listeners', value: 'getlisteners', description: 'Get current listeners', action: 'Get listeners' },
					{ name: 'Get Logs', value: 'getlogs', description: 'Retrieve streaming server logs', action: 'Get logs' },
					{ name: 'Get Songs', value: 'getsongs', description: 'Get recently played tracks', action: 'Get songs' },
					{ name: 'Get Status', value: 'getstatus', description: 'Retrieve streaming server status', action: 'Get status' },
					{ name: 'Manage DJ', value: 'managedj', description: 'Create, update, remove, or list DJ accounts', action: 'Manage DJ' },
					{ name: 'Next Song', value: 'nextsong', description: 'Skip to next song in autoDJ', action: 'Next song' },
					{ name: 'Playlist', value: 'playlist', description: 'Manage playlists (activate, deactivate, add, remove, list)', action: 'Manage playlist' },
					{ name: 'Reconfigure', value: 'reconfigure', description: 'Update account settings', action: 'Reconfigure' },
					{ name: 'Refresh Disk Usage', value: 'refreshdiskusage', description: 'Update disk usage stats', action: 'Refresh disk usage' },
					{ name: 'Reindex', value: 'reindex', description: 'Update autoDJ media library', action: 'Reindex' },
					{ name: 'Reload', value: 'reload', description: 'Reload server config without disconnecting listeners', action: 'Reload' },
					{ name: 'Report', value: 'report', description: 'Generate a track/royalty report', action: 'Generate report' },
					{ name: 'Restart', value: 'restart', description: 'Restart the streaming server', action: 'Restart' },
					{ name: 'Start', value: 'start', description: 'Start the streaming server', action: 'Start' },
					{ name: 'Stop', value: 'stop', description: 'Stop the streaming server', action: 'Stop' },
					{ name: 'Switch Source', value: 'switchsource', description: 'Activate or deactivate the autoDJ', action: 'Switch source' },
				],
				default: 'getstatus',
			},

			// ══════════════════════════════════════════════
			//              SYSTEM OPERATIONS
			// ══════════════════════════════════════════════
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['system'] } },
				options: [
					{ name: 'App Change', value: 'appchange', description: 'Change software applications for an account (experimental)', action: 'App change' },
					{ name: 'Backup', value: 'backup', description: 'Create a complete account backup', action: 'Backup' },
					{ name: 'Batch', value: 'batch', description: 'Run a method on one or more accounts', action: 'Batch' },
					{ name: 'Check', value: 'check', description: 'Check accounts for outages and restart if needed', action: 'Check' },
					{ name: 'Database', value: 'database', description: 'Import or export account database', action: 'Database' },
					{ name: 'Info', value: 'info', description: 'Get state (up/down) of accounts', action: 'Info' },
					{ name: 'List Accounts', value: 'listaccounts', description: 'List all accounts', action: 'List accounts' },
					{ name: 'List Hosts', value: 'listhosts', description: 'List all hosting servers', action: 'List hosts' },
					{ name: 'List Regions', value: 'listregions', description: 'List all regions', action: 'List regions' },
					{ name: 'Process Logs', value: 'processlogs', description: 'Process and rotate log files', action: 'Process logs' },
					{ name: 'Provision', value: 'provision', description: 'Create a new streaming server account', action: 'Provision' },
					{ name: 'Rename', value: 'rename', description: 'Change account username', action: 'Rename' },
					{ name: 'Reparent', value: 'reparent', description: 'Move account to another reseller', action: 'Reparent' },
					{ name: 'Restore', value: 'restore', description: 'Restore an account backup', action: 'Restore' },
					{ name: 'Sanity Check', value: 'sanitycheck', description: 'Test communication with Centova Cast', action: 'Sanity check' },
					{ name: 'Set Status', value: 'setstatus', description: 'Enable or disable an account', action: 'Set status' },
					{ name: 'Terminate', value: 'terminate', description: 'Permanently remove an account', action: 'Terminate' },
					{ name: 'Usage', value: 'usage', description: 'Get resource utilization of accounts', action: 'Usage' },
					{ name: 'Version', value: 'version', description: 'Get Centova Cast version info', action: 'Version' },
				],
				default: 'listaccounts',
			},

			// ══════════════════════════════════════════════
			//          SERVER OPERATION PARAMETERS
			// ══════════════════════════════════════════════

			// --- Account Username (used by most server methods) ---
			{
				displayName: 'Account Username',
				name: 'accountUsername',
				type: 'string',
				default: '',
				required: true,
				description: 'The streaming server account username to operate on',
				displayOptions: {
					show: {
						resource: ['server'],
					},
				},
			},

			// --- getstatus: mountpoints ---
			{
				displayName: 'Mountpoints',
				name: 'mountpoints',
				type: 'string',
				default: '',
				description: 'Comma-delimited mount points to check, or "all"',
				displayOptions: { show: { resource: ['server'], operation: ['getstatus', 'getsongs', 'getlisteners'] } },
			},

			// --- copyfile ---
			{
				displayName: 'Source File',
				name: 'sourcefile',
				type: 'string',
				default: '',
				required: true,
				description: 'Absolute path to the source file on the server',
				displayOptions: { show: { resource: ['server'], operation: ['copyfile'] } },
			},
			{
				displayName: 'Destination File',
				name: 'destfile',
				type: 'string',
				default: '',
				required: true,
				description: 'Relative destination path within var/spool/',
				displayOptions: { show: { resource: ['server'], operation: ['copyfile'] } },
			},

			// --- getlogs ---
			{
				displayName: 'Log Type',
				name: 'logType',
				type: 'options',
				options: [
					{ name: 'Error', value: 'error' },
					{ name: 'Access', value: 'access' },
					{ name: 'Source', value: 'source' },
				],
				default: 'error',
				required: true,
				description: 'Type of log to retrieve',
				displayOptions: { show: { resource: ['server'], operation: ['getlogs'] } },
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				required: true,
				description: 'Page number (each page is a 10KB block)',
				displayOptions: { show: { resource: ['server'], operation: ['getlogs'] } },
			},

			// --- start ---
			{
				displayName: 'Suppress Apps',
				name: 'noapps',
				type: 'string',
				default: '',
				description: 'Set to "1" to suppress all apps, or comma-separated app names to suppress specific ones',
				displayOptions: { show: { resource: ['server'], operation: ['start'] } },
			},

			// --- switchsource ---
			{
				displayName: 'State',
				name: 'switchState',
				type: 'options',
				options: [
					{ name: 'Activate (Up)', value: 'up' },
					{ name: 'Deactivate (Down)', value: 'down' },
				],
				default: 'up',
				required: true,
				description: 'Activate or deactivate the autoDJ',
				displayOptions: { show: { resource: ['server'], operation: ['switchsource'] } },
			},

			// --- reindex ---
			{
				displayName: 'Additional Fields',
				name: 'reindexOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['server'], operation: ['reindex'] } },
				options: [
					{ displayName: 'Into Playlist ID', name: 'intoplaylist', type: 'number', default: 0, description: 'Playlist ID for imported tracks' },
					{ displayName: 'Into Playlist Name', name: 'intoplaylistname', type: 'string', default: '', description: 'Playlist name for imported tracks' },
					{ displayName: 'Ignore Missing Playlist', name: 'ignoremissingplaylist', type: 'boolean', default: false, description: 'Whether to ignore if the target playlist does not exist' },
					{ displayName: 'Full Update', name: 'updateall', type: 'boolean', default: false, description: 'Whether to perform a full update instead of a quick one' },
					{ displayName: 'Clear Cache', name: 'clearcache', type: 'boolean', default: false, description: 'Whether to clear the cache' },
				],
			},

			// --- playlist ---
			{
				displayName: 'Action',
				name: 'playlistAction',
				type: 'options',
				options: [
					{ name: 'Activate', value: 'activate' },
					{ name: 'Deactivate', value: 'deactivate' },
					{ name: 'Add Tracks', value: 'add' },
					{ name: 'Remove Tracks', value: 'remove' },
					{ name: 'List', value: 'list' },
				],
				default: 'list',
				required: true,
				description: 'Playlist management action',
				displayOptions: { show: { resource: ['server'], operation: ['playlist'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'playlistOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['server'], operation: ['playlist'] } },
				options: [
					{ displayName: 'Playlist ID', name: 'playlist', type: 'number', default: 0, description: 'The playlist ID' },
					{ displayName: 'Playlist Name', name: 'playlistname', type: 'string', default: '', description: 'Playlist name keyword' },
					{ displayName: 'Track Name', name: 'trackname', type: 'string', default: '', description: 'Track name keyword' },
					{ displayName: 'Track Path', name: 'trackpath', type: 'string', default: '', description: 'Track filesystem path keyword' },
					{ displayName: 'Album Name', name: 'albumname', type: 'string', default: '', description: 'Album name keyword' },
					{ displayName: 'Artist Name', name: 'artistname', type: 'string', default: '', description: 'Artist name keyword' },
				],
			},

			// --- managedj ---
			{
				displayName: 'Action',
				name: 'djAction',
				type: 'options',
				options: [
					{ name: 'Provision', value: 'provision' },
					{ name: 'Reconfigure', value: 'reconfigure' },
					{ name: 'Terminate', value: 'terminate' },
					{ name: 'List', value: 'list' },
					{ name: 'Get', value: 'get' },
				],
				default: 'list',
				required: true,
				description: 'DJ account management action',
				displayOptions: { show: { resource: ['server'], operation: ['managedj'] } },
			},
			{
				displayName: 'DJ Username',
				name: 'djusername',
				type: 'string',
				default: '',
				required: true,
				description: 'DJ account username',
				displayOptions: { show: { resource: ['server'], operation: ['managedj'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'djOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['server'], operation: ['managedj'], djAction: ['provision', 'reconfigure'] } },
				options: [
					{ displayName: 'DJ Password', name: 'djpassword', type: 'string', typeOptions: { password: true }, default: '', description: 'DJ account password' },
					{ displayName: 'Real Name', name: 'realname', type: 'string', default: '', description: 'DJ display name' },
					{ displayName: 'Status', name: 'status', type: 'options', options: [{ name: 'Enabled', value: 'enabled' }, { name: 'Disabled', value: 'disabled' }], default: 'enabled', description: 'DJ account status' },
					{ displayName: 'Disk Quota (MB)', name: 'diskquota', type: 'number', default: 0, description: 'Disk space in MB (0 for unlimited)' },
					{ displayName: 'Permissions', name: 'permissions', type: 'string', default: '', description: 'Comma-delimited permissions: controlserver, controlautodj, manageplaylists, medialibrary, managefiles, ftpglobal, ftpprivate, viewstatistics, viewlisteners, viewlogs' },
					{ displayName: 'Login Weekdays', name: 'login_weekdays', type: 'string', default: '', description: 'Comma-delimited weekdays for allowed login' },
					{ displayName: 'Login Start Time', name: 'login_starttime', type: 'string', default: '', description: 'Earliest login time (HH:MM UTC)' },
					{ displayName: 'Login End Time', name: 'login_endtime', type: 'string', default: '', description: 'Latest logout time (HH:MM UTC)' },
				],
			},

			// --- reconfigure ---
			{
				displayName: 'Settings',
				name: 'reconfigureOptions',
				type: 'collection',
				placeholder: 'Add Setting',
				default: {},
				displayOptions: { show: { resource: ['server'], operation: ['reconfigure'] } },
				options: [
					{ displayName: 'Hostname', name: 'hostname', type: 'string', default: '', description: 'Stream hostname' },
					{ displayName: 'IP Address', name: 'ipaddress', type: 'string', default: '', description: 'Listening IP address' },
					{ displayName: 'Port', name: 'port', type: 'string', default: '', description: 'Listening port or "auto"' },
					{ displayName: 'Max Clients', name: 'maxclients', type: 'number', default: 0, description: 'Maximum simultaneous listeners' },
					{ displayName: 'Admin Password', name: 'adminpassword', type: 'string', typeOptions: { password: true }, default: '', description: 'Stream admin password' },
					{ displayName: 'Source Password', name: 'sourcepassword', type: 'string', typeOptions: { password: true }, default: '', description: 'Source connection password' },
					{ displayName: 'Max Bitrate (kbps)', name: 'maxbitrate', type: 'number', default: 0, description: 'Maximum bitrate in kbps' },
					{ displayName: 'Transfer Limit (MB)', name: 'transferlimit', type: 'string', default: '', description: 'Monthly transfer in MB or "unlimited"' },
					{ displayName: 'Disk Quota (MB)', name: 'diskquota', type: 'string', default: '', description: 'Disk space in MB or "unlimited"' },
					{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'Stream title' },
					{ displayName: 'Genre', name: 'genre', type: 'string', default: '', description: 'Stream genre' },
					{ displayName: 'URL', name: 'url', type: 'string', default: '', description: 'Associated website URL' },
					{ displayName: 'Organization', name: 'organization', type: 'string', default: '', description: 'Company/organization name' },
					{ displayName: 'Email', name: 'email', type: 'string', default: '', description: 'Account email address' },
					{ displayName: 'Timezone', name: 'timezone', type: 'string', default: '', description: 'Time zone string or "auto"' },
					{ displayName: 'Charset', name: 'charset', type: 'string', default: '', description: 'Character set' },
					{ displayName: 'Allow Proxy', name: 'allowproxy', type: 'boolean', default: false, description: 'Whether to allow port-80 proxy access' },
					{ displayName: 'Use Source', name: 'usesource', type: 'options', options: [{ name: 'Disabled (0)', value: 0 }, { name: 'Enabled (1)', value: 1 }, { name: 'On Demand (2)', value: 2 }], default: 0, description: 'AutoDJ usage mode' },
				],
			},

			// --- report ---
			{
				displayName: 'Additional Fields',
				name: 'reportOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['server'], operation: ['report'] } },
				options: [
					{ displayName: 'Month', name: 'month', type: 'number', default: 0, description: 'Month for report (defaults to previous month)' },
					{ displayName: 'Year', name: 'year', type: 'number', default: 0, description: 'Year for report (defaults to current year)' },
					{ displayName: 'Overwrite', name: 'overwrite', type: 'boolean', default: false, description: 'Whether to overwrite an existing report' },
				],
			},

			// --- archivelogs ---
			{
				displayName: 'Additional Fields',
				name: 'archiveOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['server'], operation: ['archivelogs'] } },
				options: [
					{ displayName: 'By URL', name: 'byurl', type: 'boolean', default: true, description: 'Whether to return a temporary download URL (true) or server filename (false)' },
					{ displayName: 'IP Address', name: 'ipaddress', type: 'string', default: '', description: 'Authorized client IP for download' },
				],
			},

			// ══════════════════════════════════════════════
			//          SYSTEM OPERATION PARAMETERS
			// ══════════════════════════════════════════════

			// --- System operations that need a username ---
			{
				displayName: 'Account Username',
				name: 'systemUsername',
				type: 'string',
				default: '',
				required: true,
				description: 'The account username to operate on',
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['rename', 'setstatus', 'check', 'info', 'usage', 'appchange', 'terminate', 'reparent'],
					},
				},
			},

			// --- rename ---
			{
				displayName: 'New Username',
				name: 'newusername',
				type: 'string',
				default: '',
				required: true,
				description: 'The new username for the account',
				displayOptions: { show: { resource: ['system'], operation: ['rename'] } },
			},

			// --- setstatus ---
			{
				displayName: 'Status',
				name: 'accountStatus',
				type: 'options',
				options: [
					{ name: 'Enabled', value: 'enabled' },
					{ name: 'Disabled', value: 'disabled' },
				],
				default: 'enabled',
				required: true,
				description: 'Account status to set',
				displayOptions: { show: { resource: ['system'], operation: ['setstatus'] } },
			},

			// --- reparent ---
			{
				displayName: 'New Reseller',
				name: 'newreseller',
				type: 'string',
				default: '',
				required: true,
				description: 'Destination reseller username or "admin"',
				displayOptions: { show: { resource: ['system'], operation: ['reparent'] } },
			},

			// --- terminate ---
			{
				displayName: 'Client Action',
				name: 'clientaction',
				type: 'options',
				options: [
					{ name: 'Delete', value: 'delete' },
					{ name: 'Reparent', value: 'reparent' },
				],
				default: 'delete',
				description: 'What to do with sub-accounts when removing a reseller',
				displayOptions: { show: { resource: ['system'], operation: ['terminate'] } },
			},
			{
				displayName: 'Target Reseller',
				name: 'targetreseller',
				type: 'string',
				default: '',
				description: 'Destination reseller for reparenting',
				displayOptions: { show: { resource: ['system'], operation: ['terminate'], clientaction: ['reparent'] } },
			},

			// --- batch ---
			{
				displayName: 'Method',
				name: 'batchMethod',
				type: 'string',
				default: '',
				required: true,
				description: 'ServerControl method name to run (e.g. "start", "stop", "restart")',
				displayOptions: { show: { resource: ['system'], operation: ['batch'] } },
			},
			{
				displayName: 'Usernames',
				name: 'batchUsernames',
				type: 'string',
				default: '',
				required: true,
				description: 'Comma-separated usernames or "all"',
				displayOptions: { show: { resource: ['system'], operation: ['batch'] } },
			},

			// --- listaccounts ---
			{
				displayName: 'Additional Fields',
				name: 'listOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['system'], operation: ['listaccounts'] } },
				options: [
					{ displayName: 'Start', name: 'start', type: 'number', default: 0, description: 'First account offset' },
					{ displayName: 'Limit', name: 'limit', type: 'number', default: 50, description: 'Maximum accounts to return' },
					{ displayName: 'Filter', name: 'filter', type: 'string', default: '', description: 'Keyword filter' },
				],
			},

			// --- provision ---
			{
				displayName: 'Username',
				name: 'provisionUsername',
				type: 'string',
				default: '',
				required: true,
				description: 'Account username to create',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Hostname',
				name: 'provisionHostname',
				type: 'string',
				default: '',
				required: true,
				description: 'Stream hostname',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'IP Address',
				name: 'provisionIp',
				type: 'string',
				default: '',
				required: true,
				description: 'Listening IP address',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Port',
				name: 'provisionPort',
				type: 'string',
				default: 'auto',
				required: true,
				description: 'Listening port or "auto"',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'RPC Host ID',
				name: 'rpchostid',
				type: 'number',
				default: 1,
				required: true,
				description: 'Hosting server ID',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Max Clients',
				name: 'provisionMaxClients',
				type: 'number',
				default: 100,
				required: true,
				description: 'Maximum simultaneous listeners',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Admin Password',
				name: 'provisionAdminPassword',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				required: true,
				description: 'Account password',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Source Password',
				name: 'provisionSourcePassword',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				required: true,
				description: 'Source connection password',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Max Bitrate (kbps)',
				name: 'provisionMaxBitrate',
				type: 'number',
				default: 128,
				required: true,
				description: 'Maximum bitrate in kbps',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Transfer Limit (MB)',
				name: 'provisionTransferLimit',
				type: 'string',
				default: 'unlimited',
				required: true,
				description: 'Monthly data transfer in MB or "unlimited"',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Disk Quota (MB)',
				name: 'provisionDiskQuota',
				type: 'string',
				default: 'unlimited',
				required: true,
				description: 'Disk space in MB or "unlimited"',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Title',
				name: 'provisionTitle',
				type: 'string',
				default: '',
				required: true,
				description: 'Stream title',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Organization',
				name: 'provisionOrg',
				type: 'string',
				default: '',
				required: true,
				description: 'Company or organization name',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Email',
				name: 'provisionEmail',
				type: 'string',
				default: '',
				required: true,
				description: 'Account email address',
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'provisionOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['system'], operation: ['provision'] } },
				options: [
					{ displayName: 'Genre', name: 'genre', type: 'string', default: '', description: 'Stream genre' },
					{ displayName: 'URL', name: 'url', type: 'string', default: '', description: 'Associated website URL' },
					{ displayName: 'Auto Start', name: 'autostart', type: 'boolean', default: false, description: 'Whether to auto-start the stream' },
					{ displayName: 'Server Type', name: 'servertype', type: 'string', default: '', description: 'Streaming server type' },
					{ displayName: 'App Types', name: 'apptypes', type: 'string', default: '', description: 'Supporting application types' },
					{ displayName: 'Template', name: 'template', type: 'string', default: '', description: 'Account template name' },
					{ displayName: 'Charset', name: 'charset', type: 'string', default: '', description: 'Character set' },
					{ displayName: 'Timezone', name: 'timezone', type: 'string', default: '', description: 'UTC offset or "auto"' },
					{ displayName: 'Allow Proxy', name: 'allowproxy', type: 'boolean', default: false, description: 'Whether to allow port-80 proxy access' },
					{ displayName: 'Locale', name: 'locale', type: 'string', default: '', description: 'Language locale' },
					{ displayName: 'Use Source', name: 'usesource', type: 'options', options: [{ name: 'Disabled (0)', value: 0 }, { name: 'Enabled (1)', value: 1 }, { name: 'On Demand (2)', value: 2 }], default: 0, description: 'AutoDJ usage mode' },
				],
			},

			// --- appchange ---
			{
				displayName: 'New App',
				name: 'newapp',
				type: 'string',
				default: '',
				required: true,
				description: 'New application identifier',
				displayOptions: { show: { resource: ['system'], operation: ['appchange'] } },
			},

			// --- backup ---
			{
				displayName: 'Backup Scope',
				name: 'backupScope',
				type: 'options',
				options: [
					{ name: 'All Accounts', value: 'all' },
					{ name: 'User Accounts Only', value: 'users' },
					{ name: 'Reseller Accounts Only', value: 'resellers' },
					{ name: 'Single Account', value: 'single' },
				],
				default: 'single',
				required: true,
				description: 'Which accounts to back up',
				displayOptions: { show: { resource: ['system'], operation: ['backup'] } },
			},
			{
				displayName: 'Account Username',
				name: 'backupUsername',
				type: 'string',
				default: '',
				required: true,
				description: 'Username of account to back up',
				displayOptions: { show: { resource: ['system'], operation: ['backup'], backupScope: ['single'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'backupOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['system'], operation: ['backup'] } },
				options: [
					{ displayName: 'Skip Media Files', name: 'nocontent', type: 'boolean', default: false, description: 'Whether to skip media files' },
					{ displayName: 'Skip Log Files', name: 'nologs', type: 'boolean', default: false, description: 'Whether to skip log files' },
				],
			},

			// --- restore ---
			{
				displayName: 'Username',
				name: 'restoreUsername',
				type: 'string',
				default: '',
				required: true,
				description: 'Username for the restored account',
				displayOptions: { show: { resource: ['system'], operation: ['restore'] } },
			},
			{
				displayName: 'Filename',
				name: 'restoreFilename',
				type: 'string',
				default: '',
				required: true,
				description: 'Backup file path on server',
				displayOptions: { show: { resource: ['system'], operation: ['restore'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'restoreOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['system'], operation: ['restore'] } },
				options: [
					{ displayName: 'RPC Host ID', name: 'rpchostid', type: 'number', default: 0, description: 'Destination hosting server ID' },
					{ displayName: 'Reseller', name: 'reseller', type: 'string', default: '', description: 'Destination reseller username' },
					{ displayName: 'Dry Run', name: 'dryrun', type: 'boolean', default: false, description: 'Whether to test without actually restoring' },
					{ displayName: 'Overwrite', name: 'overwrite', type: 'boolean', default: false, description: 'Whether to overwrite an existing account' },
				],
			},

			// --- database ---
			{
				displayName: 'Database Action',
				name: 'dbAction',
				type: 'options',
				options: [
					{ name: 'Import', value: 'import' },
					{ name: 'Export', value: 'export' },
				],
				default: 'export',
				required: true,
				description: 'Import or export a database backup',
				displayOptions: { show: { resource: ['system'], operation: ['database'] } },
			},
			{
				displayName: 'Database Username',
				name: 'dbUsername',
				type: 'string',
				default: '',
				required: true,
				description: 'Account username for database operation',
				displayOptions: { show: { resource: ['system'], operation: ['database'] } },
			},
			{
				displayName: 'Filename',
				name: 'dbFilename',
				type: 'string',
				default: '',
				required: true,
				description: 'Import/export file path on server',
				displayOptions: { show: { resource: ['system'], operation: ['database'] } },
			},

			// --- imaged ---
			// Omitted: imaged is a very specialized internal method, unlikely to be useful in n8n workflows.
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('centovaCastApi');
		const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const method = `${resource}.${operation}`;

				// Build API parameters
				const params: Record<string, string> = {};

				// Authentication
				if (resource === 'server') {
					const accountUsername = this.getNodeParameter('accountUsername', i) as string;
					params['username'] = accountUsername;
					// Use admin|password format so the admin can manage any account
					params['password'] = `admin|${credentials.password as string}`;
				} else {
					// System class uses admin password
					params['username'] = credentials.username as string;
					params['password'] = credentials.password as string;
				}

				// ── Server operation parameters ──
				if (resource === 'server') {
					switch (operation) {
						case 'getstatus':
						case 'getsongs':
						case 'getlisteners': {
							const mountpoints = this.getNodeParameter('mountpoints', i, '') as string;
							if (mountpoints) params['mountpoints'] = mountpoints;
							break;
						}
						case 'copyfile': {
							params['sourcefile'] = this.getNodeParameter('sourcefile', i) as string;
							params['destfile'] = this.getNodeParameter('destfile', i) as string;
							break;
						}
						case 'getlogs': {
							params['type'] = this.getNodeParameter('logType', i) as string;
							params['page'] = String(this.getNodeParameter('page', i));
							break;
						}
						case 'start': {
							const noapps = this.getNodeParameter('noapps', i, '') as string;
							if (noapps) params['noapps'] = noapps;
							break;
						}
						case 'switchsource': {
							params['state'] = this.getNodeParameter('switchState', i) as string;
							break;
						}
						case 'reindex': {
							const reindexOpts = this.getNodeParameter('reindexOptions', i, {}) as Record<string, unknown>;
							for (const [key, val] of Object.entries(reindexOpts)) {
								if (val !== '' && val !== 0 && val !== false && val !== undefined) {
									params[key] = typeof val === 'boolean' ? (val ? '1' : '0') : String(val);
								}
							}
							break;
						}
						case 'playlist': {
							params['action'] = this.getNodeParameter('playlistAction', i) as string;
							const playlistOpts = this.getNodeParameter('playlistOptions', i, {}) as Record<string, unknown>;
							for (const [key, val] of Object.entries(playlistOpts)) {
								if (val !== '' && val !== 0 && val !== undefined) {
									params[key] = String(val);
								}
							}
							break;
						}
						case 'managedj': {
							params['action'] = this.getNodeParameter('djAction', i) as string;
							params['djusername'] = this.getNodeParameter('djusername', i) as string;
							const djAction = params['action'];
							if (djAction === 'provision' || djAction === 'reconfigure') {
								const djOpts = this.getNodeParameter('djOptions', i, {}) as Record<string, unknown>;
								for (const [key, val] of Object.entries(djOpts)) {
									if (val !== '' && val !== undefined) {
										params[key] = String(val);
									}
								}
							}
							break;
						}
						case 'reconfigure': {
							const reconfOpts = this.getNodeParameter('reconfigureOptions', i, {}) as Record<string, unknown>;
							for (const [key, val] of Object.entries(reconfOpts)) {
								if (val !== '' && val !== 0 && val !== false && val !== undefined) {
									params[key] = typeof val === 'boolean' ? (val ? '1' : '0') : String(val);
								}
							}
							break;
						}
						case 'report': {
							const reportOpts = this.getNodeParameter('reportOptions', i, {}) as Record<string, unknown>;
							for (const [key, val] of Object.entries(reportOpts)) {
								if (val !== '' && val !== 0 && val !== false && val !== undefined) {
									params[key] = typeof val === 'boolean' ? (val ? '1' : '0') : String(val);
								}
							}
							break;
						}
						case 'archivelogs': {
							const archOpts = this.getNodeParameter('archiveOptions', i, {}) as Record<string, unknown>;
							for (const [key, val] of Object.entries(archOpts)) {
								if (val !== '' && val !== undefined) {
									params[key] = typeof val === 'boolean' ? (val ? '1' : '0') : String(val);
								}
							}
							break;
						}
					}
				}

				// ── System operation parameters ──
				if (resource === 'system') {
					switch (operation) {
						case 'rename': {
							params['username'] = this.getNodeParameter('systemUsername', i) as string;
							params['newusername'] = this.getNodeParameter('newusername', i) as string;
							break;
						}
						case 'setstatus': {
							params['username'] = this.getNodeParameter('systemUsername', i) as string;
							params['status'] = this.getNodeParameter('accountStatus', i) as string;
							break;
						}
						case 'check':
						case 'info':
						case 'usage': {
							params['username'] = this.getNodeParameter('systemUsername', i) as string;
							break;
						}
						case 'reparent': {
							params['username'] = this.getNodeParameter('systemUsername', i) as string;
							params['newreseller'] = this.getNodeParameter('newreseller', i) as string;
							break;
						}
						case 'terminate': {
							params['username'] = this.getNodeParameter('systemUsername', i) as string;
							const clientAction = this.getNodeParameter('clientaction', i) as string;
							params['clientaction'] = clientAction;
							if (clientAction === 'reparent') {
								params['targetreseller'] = this.getNodeParameter('targetreseller', i, '') as string;
							}
							break;
						}
						case 'appchange': {
							params['username'] = this.getNodeParameter('systemUsername', i) as string;
							params['newapp'] = this.getNodeParameter('newapp', i) as string;
							break;
						}
						case 'batch': {
							params['method'] = this.getNodeParameter('batchMethod', i) as string;
							params['username'] = this.getNodeParameter('batchUsernames', i) as string;
							break;
						}
						case 'listaccounts': {
							const listOpts = this.getNodeParameter('listOptions', i, {}) as Record<string, unknown>;
							for (const [key, val] of Object.entries(listOpts)) {
								if (val !== '' && val !== 0 && val !== undefined) {
									params[key] = String(val);
								}
							}
							break;
						}
						case 'provision': {
							params['username'] = this.getNodeParameter('provisionUsername', i) as string;
							params['hostname'] = this.getNodeParameter('provisionHostname', i) as string;
							params['ipaddress'] = this.getNodeParameter('provisionIp', i) as string;
							params['port'] = this.getNodeParameter('provisionPort', i) as string;
							params['rpchostid'] = String(this.getNodeParameter('rpchostid', i));
							params['maxclients'] = String(this.getNodeParameter('provisionMaxClients', i));
							params['adminpassword'] = this.getNodeParameter('provisionAdminPassword', i) as string;
							params['sourcepassword'] = this.getNodeParameter('provisionSourcePassword', i) as string;
							params['maxbitrate'] = String(this.getNodeParameter('provisionMaxBitrate', i));
							params['transferlimit'] = this.getNodeParameter('provisionTransferLimit', i) as string;
							params['diskquota'] = this.getNodeParameter('provisionDiskQuota', i) as string;
							params['title'] = this.getNodeParameter('provisionTitle', i) as string;
							params['organization'] = this.getNodeParameter('provisionOrg', i) as string;
							params['email'] = this.getNodeParameter('provisionEmail', i) as string;
							const provOpts = this.getNodeParameter('provisionOptions', i, {}) as Record<string, unknown>;
							for (const [key, val] of Object.entries(provOpts)) {
								if (val !== '' && val !== 0 && val !== false && val !== undefined) {
									params[key] = typeof val === 'boolean' ? (val ? '1' : '0') : String(val);
								}
							}
							break;
						}
						case 'backup': {
							const scope = this.getNodeParameter('backupScope', i) as string;
							if (scope === 'all') params['all'] = '1';
							else if (scope === 'users') params['users'] = '1';
							else if (scope === 'resellers') params['resellers'] = '1';
							else params['username'] = this.getNodeParameter('backupUsername', i) as string;
							const backupOpts = this.getNodeParameter('backupOptions', i, {}) as Record<string, unknown>;
							for (const [key, val] of Object.entries(backupOpts)) {
								if (val === true) params[key] = '1';
							}
							break;
						}
						case 'restore': {
							params['username'] = this.getNodeParameter('restoreUsername', i) as string;
							params['filename'] = this.getNodeParameter('restoreFilename', i) as string;
							const restOpts = this.getNodeParameter('restoreOptions', i, {}) as Record<string, unknown>;
							for (const [key, val] of Object.entries(restOpts)) {
								if (val !== '' && val !== 0 && val !== false && val !== undefined) {
									params[key] = typeof val === 'boolean' ? (val ? '1' : '0') : String(val);
								}
							}
							break;
						}
						case 'database': {
							params['action'] = this.getNodeParameter('dbAction', i) as string;
							params['username'] = this.getNodeParameter('dbUsername', i) as string;
							params['filename'] = this.getNodeParameter('dbFilename', i) as string;
							break;
						}
					}
				}

				// Use POST for security (passwords in body, not URL logs)
				const response = await this.helpers.request({
					method: 'POST' as IHttpRequestMethods,
					url: `${baseUrl}/api.php`,
					form: Object.fromEntries([
						['xm', method],
						['f', 'json'],
						...Object.entries(params).map(([k, v]) => [`a[${k}]`, v]),
					]),
					json: true,
				});

				if (response.type === 'error') {
					throw new NodeApiError(this.getNode(), response as Record<string, never>, {
						message: response.response?.message || 'Unknown API error',
					});
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(response.response?.data || response.response || response),
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
				throw error;
			}
		}

		return [returnData];
	}
}
