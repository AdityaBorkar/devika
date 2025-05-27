import { Command } from 'commander';
import { generate } from 'letsync/cli/generate';
import { publish } from 'letsync/cli/publish';
import { detectEnvironment } from 'letsync/cli/utils/detectEnv';

const program = new Command();

program
	.name('letsync')
	.description('LetSync - Schema Propagation Tool')
	.version('1.0.0')
	.hook('preAction', () => {
		const env = detectEnvironment();
		console.log('🔧 LetSync - Schema Propagation Tool');
		console.log(
			`📍 Environment: ${env.name.toUpperCase()} (${env.description})`,
		);
		console.log('');
	});

program
	.command('generate')
	.description('Generate a schema for use in a client')
	.option(
		'-o, --output <path>',
		'Output directory for generated schema',
		'./generated',
	)
	.option(
		'-t, --type <type>',
		'Schema type (typescript|json|graphql)',
		'typescript',
	)
	.option('--orm <orm>', 'ORM to use (drizzle|prisma)', 'drizzle')
	.option('--dry-run', 'Show what would be generated without creating files')
	.action(generate);

program
	.command('publish')
	.description(
		'Publish schema changes for public records (creates version number)',
	)
	.option('--orm <orm>', 'ORM to use (drizzle|prisma)', 'drizzle')
	.action(publish);

program.on('command:*', () => {
	console.error(
		'Invalid command: %s\nSee --help for a list of available commands.',
		program.args.join(' '),
	);
	process.exit(1);
});

program.parse();
