import n8nPlugin from '@n8n/eslint-plugin-community-nodes';

export default [
	{ ignores: ['copy-icons.js'] },
	n8nPlugin.configs.recommended,
];
