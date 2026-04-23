import type { INodeProperties } from 'n8n-workflow';

const showOnlyForServer = {
	resource: ['server'],
};

export const serverProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForServer },
		options: [
			{
				name: 'Archive Logs',
				value: 'archivelogs',
				description: 'Archive logs for the account',
				action: 'Archive logs',
			},
			{
				name: 'Authenticate',
				value: 'authenticate',
				description: 'Test whether credentials are valid',
				action: 'Authenticate',
			},
			{
				name: 'Copy File',
				value: 'copyfile',
				description: 'Copy a file into the account spool directory',
				action: 'Copy file',
			},
			{
				name: 'Enabled',
				value: 'enabled',
				description: 'Get basic account state information',
				action: 'Get enabled state',
			},
			{
				name: 'Get Account',
				value: 'getaccount',
				description: 'Retrieve account configuration',
				action: 'Get account',
			},
			{
				name: 'Get Listeners',
				value: 'getlisteners',
				description: 'Get current listeners',
				action: 'Get listeners',
			},
			{
				name: 'Get Logs',
				value: 'getlogs',
				description: 'Retrieve streaming server logs',
				action: 'Get logs',
			},
			{
				name: 'Get Songs',
				value: 'getsongs',
				description: 'Get recently played tracks',
				action: 'Get songs',
			},
			{
				name: 'Get Status',
				value: 'getstatus',
				description: 'Retrieve streaming server status',
				action: 'Get status',
			},
			{
				name: 'Manage DJ',
				value: 'managedj',
				description: 'Create, update, remove, or list DJ accounts',
				action: 'Manage DJ',
			},
			{
				name: 'Next Song',
				value: 'nextsong',
				description: 'Skip to next song in autoDJ',
				action: 'Next song',
			},
			{
				name: 'Playlist',
				value: 'playlist',
				description: 'Manage playlists (activate, deactivate, add, remove, list)',
				action: 'Manage playlist',
			},
			{
				name: 'Reconfigure',
				value: 'reconfigure',
				description: 'Update account settings',
				action: 'Reconfigure',
			},
			{
				name: 'Refresh Disk Usage',
				value: 'refreshdiskusage',
				description: 'Update disk usage stats',
				action: 'Refresh disk usage',
			},
			{
				name: 'Reindex',
				value: 'reindex',
				description: 'Update autoDJ media library',
				action: 'Reindex',
			},
			{
				name: 'Reload',
				value: 'reload',
				description: 'Reload server config without disconnecting listeners',
				action: 'Reload',
			},
			{
				name: 'Report',
				value: 'report',
				description: 'Generate a track/royalty report',
				action: 'Generate report',
			},
			{
				name: 'Restart',
				value: 'restart',
				description: 'Restart the streaming server',
				action: 'Restart',
			},
			{
				name: 'Start',
				value: 'start',
				description: 'Start the streaming server',
				action: 'Start',
			},
			{
				name: 'Stop',
				value: 'stop',
				description: 'Stop the streaming server',
				action: 'Stop',
			},
			{
				name: 'Switch Source',
				value: 'switchsource',
				description: 'Activate or deactivate the autoDJ',
				action: 'Switch source',
			},
		],
		default: 'getstatus',
	},

	// Account Username (used by most server methods)
	{
		displayName: 'Account Username',
		name: 'accountUsername',
		type: 'string',
		default: '',
		required: true,
		description: 'The streaming server account username to operate on',
		displayOptions: { show: showOnlyForServer },
	},

	// getstatus / getsongs / getlisteners: mountpoints
	{
		displayName: 'Mountpoints',
		name: 'mountpoints',
		type: 'string',
		default: '',
		description: 'Comma-delimited mount points to check, or "all"',
		displayOptions: {
			show: {
				resource: ['server'],
				operation: ['getstatus', 'getsongs', 'getlisteners'],
			},
		},
	},

	// copyfile
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

	// getlogs
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

	// start
	{
		displayName: 'Suppress Apps',
		name: 'noapps',
		type: 'string',
		default: '',
		description:
			'Set to "1" to suppress all apps, or comma-separated app names to suppress specific ones',
		displayOptions: { show: { resource: ['server'], operation: ['start'] } },
	},

	// switchsource
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

	// reindex
	{
		displayName: 'Additional Fields',
		name: 'reindexOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['server'], operation: ['reindex'] } },
		options: [
			{
				displayName: 'Into Playlist ID',
				name: 'intoplaylist',
				type: 'number',
				default: 0,
				description: 'Playlist ID for imported tracks',
			},
			{
				displayName: 'Into Playlist Name',
				name: 'intoplaylistname',
				type: 'string',
				default: '',
				description: 'Playlist name for imported tracks',
			},
			{
				displayName: 'Ignore Missing Playlist',
				name: 'ignoremissingplaylist',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore if the target playlist does not exist',
			},
			{
				displayName: 'Full Update',
				name: 'updateall',
				type: 'boolean',
				default: false,
				description: 'Whether to perform a full update instead of a quick one',
			},
			{
				displayName: 'Clear Cache',
				name: 'clearcache',
				type: 'boolean',
				default: false,
				description: 'Whether to clear the cache',
			},
		],
	},

	// playlist
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
			{
				displayName: 'Playlist ID',
				name: 'playlist',
				type: 'number',
				default: 0,
				description: 'The playlist ID',
			},
			{
				displayName: 'Playlist Name',
				name: 'playlistname',
				type: 'string',
				default: '',
				description: 'Playlist name keyword',
			},
			{
				displayName: 'Track Name',
				name: 'trackname',
				type: 'string',
				default: '',
				description: 'Track name keyword',
			},
			{
				displayName: 'Track Path',
				name: 'trackpath',
				type: 'string',
				default: '',
				description: 'Track filesystem path keyword',
			},
			{
				displayName: 'Album Name',
				name: 'albumname',
				type: 'string',
				default: '',
				description: 'Album name keyword',
			},
			{
				displayName: 'Artist Name',
				name: 'artistname',
				type: 'string',
				default: '',
				description: 'Artist name keyword',
			},
		],
	},

	// managedj
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
		displayOptions: {
			show: {
				resource: ['server'],
				operation: ['managedj'],
				djAction: ['provision', 'reconfigure'],
			},
		},
		options: [
			{
				displayName: 'DJ Password',
				name: 'djpassword',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'DJ account password',
			},
			{
				displayName: 'Real Name',
				name: 'realname',
				type: 'string',
				default: '',
				description: 'DJ display name',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Enabled', value: 'enabled' },
					{ name: 'Disabled', value: 'disabled' },
				],
				default: 'enabled',
				description: 'DJ account status',
			},
			{
				displayName: 'Disk Quota (MB)',
				name: 'diskquota',
				type: 'number',
				default: 0,
				description: 'Disk space in MB (0 for unlimited)',
			},
			{
				displayName: 'Permissions',
				name: 'permissions',
				type: 'string',
				default: '',
				description:
					'Comma-delimited permissions: controlserver, controlautodj, manageplaylists, medialibrary, managefiles, ftpglobal, ftpprivate, viewstatistics, viewlisteners, viewlogs',
			},
			{
				displayName: 'Login Weekdays',
				name: 'login_weekdays',
				type: 'string',
				default: '',
				description: 'Comma-delimited weekdays for allowed login',
			},
			{
				displayName: 'Login Start Time',
				name: 'login_starttime',
				type: 'string',
				default: '',
				description: 'Earliest login time (HH:MM UTC)',
			},
			{
				displayName: 'Login End Time',
				name: 'login_endtime',
				type: 'string',
				default: '',
				description: 'Latest logout time (HH:MM UTC)',
			},
		],
	},

	// reconfigure
	{
		displayName: 'Settings',
		name: 'reconfigureOptions',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		displayOptions: { show: { resource: ['server'], operation: ['reconfigure'] } },
		options: [
			{ displayName: 'Hostname', name: 'hostname', type: 'string', default: '' },
			{ displayName: 'IP Address', name: 'ipaddress', type: 'string', default: '' },
			{
				displayName: 'Port',
				name: 'port',
				type: 'string',
				default: '',
				description: 'Listening port or "auto"',
			},
			{
				displayName: 'Max Clients',
				name: 'maxclients',
				type: 'number',
				default: 0,
				description: 'Maximum simultaneous listeners',
			},
			{
				displayName: 'Admin Password',
				name: 'adminpassword',
				type: 'string',
				typeOptions: { password: true },
				default: '',
			},
			{
				displayName: 'Source Password',
				name: 'sourcepassword',
				type: 'string',
				typeOptions: { password: true },
				default: '',
			},
			{
				displayName: 'Max Bitrate (kbps)',
				name: 'maxbitrate',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Transfer Limit (MB)',
				name: 'transferlimit',
				type: 'string',
				default: '',
				description: 'Monthly transfer in MB or "unlimited"',
			},
			{
				displayName: 'Disk Quota (MB)',
				name: 'diskquota',
				type: 'string',
				default: '',
				description: 'Disk space in MB or "unlimited"',
			},
			{ displayName: 'Title', name: 'title', type: 'string', default: '' },
			{ displayName: 'Genre', name: 'genre', type: 'string', default: '' },
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'Associated website URL',
			},
			{ displayName: 'Organization', name: 'organization', type: 'string', default: '' },
			{ displayName: 'Email', name: 'email', type: 'string', default: '' },
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'Time zone string or "auto"',
			},
			{ displayName: 'Charset', name: 'charset', type: 'string', default: '' },
			{
				displayName: 'Allow Proxy',
				name: 'allowproxy',
				type: 'boolean',
				default: false,
				description: 'Whether to allow port-80 proxy access',
			},
			{
				displayName: 'Use Source',
				name: 'usesource',
				type: 'options',
				options: [
					{ name: 'Disabled (0)', value: 0 },
					{ name: 'Enabled (1)', value: 1 },
					{ name: 'On Demand (2)', value: 2 },
				],
				default: 0,
				description: 'AutoDJ usage mode',
			},
		],
	},

	// report
	{
		displayName: 'Additional Fields',
		name: 'reportOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['server'], operation: ['report'] } },
		options: [
			{
				displayName: 'Month',
				name: 'month',
				type: 'number',
				default: 0,
				description: 'Month for report (defaults to previous month)',
			},
			{
				displayName: 'Year',
				name: 'year',
				type: 'number',
				default: 0,
				description: 'Year for report (defaults to current year)',
			},
			{
				displayName: 'Overwrite',
				name: 'overwrite',
				type: 'boolean',
				default: false,
				description: 'Whether to overwrite an existing report',
			},
		],
	},

	// archivelogs
	{
		displayName: 'Additional Fields',
		name: 'archiveOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['server'], operation: ['archivelogs'] } },
		options: [
			{
				displayName: 'By URL',
				name: 'byurl',
				type: 'boolean',
				default: true,
				description:
					'Whether to return a temporary download URL (true) or server filename (false)',
			},
			{
				displayName: 'IP Address',
				name: 'ipaddress',
				type: 'string',
				default: '',
				description: 'Authorized client IP for download',
			},
		],
	},
];
