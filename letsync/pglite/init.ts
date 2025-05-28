import type { PGlite } from '@electric-sql/pglite';

export class Letsync {
	public IS_SYNCING: boolean;
	public IS_CONNECTED: boolean;

	private db: PGlite;
	private ws: WebSocket | undefined;

	private debug: boolean;
	private logger = {
		// biome-ignore lint/suspicious/noExplicitAny: console.log()
		log: (...message: any[]) =>
			this.debug && console.log('[LETSYNC]', ...message),
		// biome-ignore lint/suspicious/noExplicitAny: console.log()
		error: (...message: any[]) => {
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
		const metadata = await this.db
			.query(
				"SELECT * FROM metadata WHERE id IN ('clientId', 'version', 'lastSyncedAt');",
			)
			.then((metadata) => {
				// const { version = 'NA', lastSynced = 'NA' } = metadata.rows[0] as any; // TODO: proper type
				console.log({ metadata });
				return {
					connectionId: 'Hello World',
					lastSynced: 'Hello World',
					version: 'Hello World',
				};
			})
			.catch((err) => {
				if (err.toString() === 'error: relation "metadata" does not exist')
					return {
						connectionId: undefined,
						lastSynced: undefined,
						version: undefined,
					};
				throw err;
			});

		this.logger.log('Connection ID', metadata.connectionId);
		this.logger.log('Version', metadata.version);
		this.logger.log('Last synced at', metadata.lastSynced);

		const wsUrl = `ws://localhost:3000/?o=k&id=${metadata.connectionId || 'NULL'}`;
		this.logger.log('Connecting to WebSocket', wsUrl);

		const ws = new WebSocket(wsUrl);
		ws.onopen = async () => {
			this.IS_CONNECTED = true;
			this.logger.log('Connected to WebSocket');
		};
		ws.onclose = (event) => {
			this.IS_CONNECTED = false;
			if (event.wasClean) this.logger.log('WebSocket closed cleanly');
			else this.logger.error('WebSocket connection died');
		};
		ws.onerror = (error) => {
			this.logger.error('WebSocket error:', error);
		};
		ws.onmessage = (event) => {
			this.logger.log('Message from server:', event);
			// "init"
			// "getSchema"
			// "upgrade"
			// "sync"
			// "data"
			// "push:data"
			// "push:operation"
			// "push:upgrade_complete"
			// "push:connected"
			// "push:disconnected"

			// const { type, data } = JSON.parse(event.data.toString());
			// // if (type === "REQUEST:VERSION")
			// // if (type === "RESPOND:DATA")
			// console.log('Message from server:', type, data);
		};
		this.ws = ws;
	}

	async checkForUpdate() {
		const latestVersion = await fetch('/letsync/version');
		const metadata = await this.db.query('select version();');
		const { rows } = metadata;
		const { lastSynced, version } = rows[0] as any; // TODO: proper type
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
		const { rows } = metadata;
		const schema = await this.getSchema(version, (rows[0] as any).version); // TODO: proper type
		this.logger.log(
			'Upgrading DB Version from',
			(metadata.rows[0] as any).version, // TODO: proper type
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
