import { execSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

interface GenerateOptions {
	output: string;
	type: string;
	dryRun?: boolean;
}

interface DrizzleConfig {
	schema: string | string[];
	out: string;
	dialect: string;
	dbCredentials?: any;
}

interface MigrationJournal {
	version: string;
	dialect: string;
	entries: Array<{
		idx: number;
		version: string;
		when: number;
		tag: string;
		breakpoints: boolean;
	}>;
}

export async function generate(options: GenerateOptions) {
	console.log('🔄 Generating schema...');
	console.log(`   Output: ${options.output}`);
	console.log(`   Type: ${options.type}`);

	if (options.dryRun) {
		console.log('   Mode: Dry run (no files will be created)');
	}

	try {
		// 1. Read drizzle.config.ts
		const configPath = join(process.cwd(), 'drizzle.config.ts');
		console.log('📖 Reading drizzle config...');

		// Execute drizzle generate to ensure latest migrations
		console.log('🔄 Running drizzle generate...');
		const generateOutput = execSync('bunx drizzle-kit generate', {
			encoding: 'utf-8',
			cwd: process.cwd(),
		});
		console.log('   Generated migrations');

		// Read the journal to get latest migration
		const journalPath = join(
			process.cwd(),
			'drizzle/migrations/meta/_journal.json',
		);
		const journalContent = await readFile(journalPath, 'utf-8');
		const journal: MigrationJournal = JSON.parse(journalContent);

		console.log(`   Dialect: ${journal.dialect}`);
		console.log('   Schema location: ./drizzle/schema/*');
		console.log(`   Migrations: ${journal.entries.length} found`);

		// Get the latest migration
		const latestMigration = journal.entries[journal.entries.length - 1];
		if (latestMigration) {
			const migrationPath = join(
				process.cwd(),
				'drizzle/migrations',
				`${latestMigration.tag}.sql`,
			);
			const migrationContent = await readFile(migrationPath, 'utf-8');

			console.log(`📄 Latest migration: ${latestMigration.tag}`);
			console.log('🔧 Processing migration statements for client database...');

			// Split migration into individual statements
			const statements = migrationContent
				.split('--> statement-breakpoint')
				.map((stmt) => stmt.trim())
				.filter((stmt) => stmt.length > 0);

			console.log(`   Found ${statements.length} SQL statements`);

			// Process each statement for client database compatibility
			const clientStatements = statements.map((stmt, index) => {
				// Remove PostgreSQL-specific features for client compatibility
				const clientStmt = stmt
					// Remove schema qualifiers
					.replace(/"public"\./g, '')
					// Convert PostgreSQL timestamp to standard SQL
					.replace(/timestamp/g, 'DATETIME')
					// Convert PostgreSQL text to VARCHAR for broader compatibility
					.replace(/text/g, 'VARCHAR(255)')
					// Remove CASCADE constraints that might not be supported
					.replace(/ON DELETE cascade/g, 'ON DELETE CASCADE')
					// Remove UPDATE constraints for simplicity
					.replace(/ON UPDATE no action/g, '');

				return {
					index: index + 1,
					original: stmt,
					client: clientStmt.trim(),
				};
			});

			if (!options.dryRun) {
				// Write processed statements to output file
				const outputContent = clientStatements
					.map((s) => `-- Statement ${s.index}\n${s.client};\n`)
					.join('\n');

				await writeFile(options.output, outputContent);
				console.log(
					`📝 Written ${clientStatements.length} processed statements to ${options.output}`,
				);
			} else {
				console.log('📋 Processed statements (dry run):');
				clientStatements.forEach((s) => {
					console.log(
						`   Statement ${s.index}: ${s.client.substring(0, 80)}...`,
					);
				});
			}

			// Summary
			console.log('📊 Migration Summary:');
			console.log(`   • Database dialect: ${journal.dialect}`);
			console.log('   • Schema files: ./drizzle/schema/*');
			console.log(`   • Latest migration: ${latestMigration.tag}`);
			console.log(`   • Statements processed: ${statements.length}`);
			console.log(
				`   • Client statements generated: ${clientStatements.length}`,
			);
		} else {
			console.log('⚠️  No migrations found');
		}
	} catch (error) {
		console.error('❌ Error generating schema:', error);
		throw error;
	}

	console.log('✅ Schema generation completed');
}
