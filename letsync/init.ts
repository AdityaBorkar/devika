import type { PGlite } from '@electric-sql/pglite';
import { WebSocket } from 'ws';

export class Letsync {
	public IS_SYNCING: boolean;
	public IS_CONNECTED: boolean;

	private db: PGlite;
	private ws: WebSocket | undefined;

	private debug: boolean;
	private logger = {
		log: (...message: string[]) =>
			this.debug && console.log('[LETSYNC]', ...message),
		error: (...message: string[]) => {
			console.error('[LETSYNC]', ...message);
			// TODO: REPORT
		},
	};

	constructor({ client, debug }: { client: PGlite; debug?: boolean }) {
		this.db = client;
		this.ws = undefined;
		this.debug = debug ?? false;
		this.IS_SYNCING = false;
		this.IS_CONNECTED = false;
	}

	async connect() {
		const ws = new WebSocket('ws://localhost:3000');
		ws.onopen = async () => {
			const metadata = await this.db.query('select version();');
			this.logger.log(
				'Local DB version',
				metadata.version,
				'last synced at',
				metadata.lastSynced,
			);
		};
		ws.onmessage = (event) => {
			const { type, data } = JSON.parse(event.data.toString());
			// if (type === "REQUEST:VERSION")
			// if (type === "RESPOND:DATA")
			console.log('Message from server:', type, data);
		};
		ws.onerror = (error) => {
			this.logger.error('WebSocket error:', error);
		};
		ws.onclose = (event) => {
			if (event.wasClean) {
				this.logger.log('WebSocket closed cleanly');
			} else {
				this.logger.error('WebSocket connection died');
			}
		};
		this.ws = ws;
	}

	async checkForUpdate() {
		const latestVersion = await fetch('/letsync/version');
		const metadata = await this.db.query('select version();');
		const { lastSynced, version } = metadata;
		this.logger.log('DB Version:', version, 'last synced at', lastSynced);
		return latestVersion;
	}

	async getSchema(version: string, migrateFromVersion?: string) {
		const latestVersion = await fetch(
			`/letsync/version?from=${migrateFromVersion}&to=${version}`,
		);
		const latestSchema = await latestVersion.json();
		return latestSchema;
	}

	async upgrade(version = 'latest') {
		const metadata = await this.db.query('select version();');
		const schema = await this.getSchema(version, metadata.version);
		this.logger.log(
			'Upgrading DB Version from',
			metadata.version,
			'to',
			schema.version,
		);
		// TODO: APPLY SCHEMA
	}

	async subscribe() {
		return () => this.unsubscribe();
	}

	async unsubscribe() {}

	async getLastSynced() {}

	async sync() {}
}
