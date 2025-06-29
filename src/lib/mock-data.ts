import type { AppConfig, Package } from 'types/tech-stack';

export const mockPackages: Package[] = [
	// Backend packages
	{
		category: 'backend',
		description: 'Fast, unopinionated, minimalist web framework for Node.js',
		docSource: 'url',
		docsUrl: 'https://expressjs.com/',
		hasSecurityAlert: false,
		id: 'express',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-10-15',
		logoUrl: 'https://expressjs.com/images/express-facebook-share.png',
		name: 'Express',
		version: '4.18.2',
	},
	{
		category: 'backend',
		description:
			'A progressive Node.js framework for building efficient and scalable server-side applications',
		docSource: 'url',
		docsUrl: 'https://nestjs.com/',
		hasSecurityAlert: true,
		id: 'nestjs',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: true,
		lastScrapedDate: '2023-11-20',
		logoUrl: 'https://nestjs.com/img/logo-small.svg',
		name: 'NestJS',
		version: '10.0.0',
	},
	{
		category: 'backend',
		description: 'Fast and low overhead web framework for Node.js',
		docSource: 'url',
		docsUrl: 'https://fastify.dev/',
		hasSecurityAlert: false,
		id: 'fastify',
		isLocal: false,
		isUnused: true,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-09-10',
		logoUrl: 'https://fastify.io/images/fastify-logo-menu.d13f8da7a965c800.png',
		name: 'Fastify',
		version: '4.24.0',
	},

	// Frontend packages
	{
		category: 'frontend',
		description: 'A JavaScript library for building user interfaces',
		docSource: 'url',
		docsUrl: 'https://reactjs.org/',
		hasSecurityAlert: false,
		id: 'react',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-12-01',
		logoUrl: 'https://reactjs.org/favicon.ico',
		name: 'React',
		version: '18.2.0',
	},
	{
		category: 'frontend',
		description: 'The React framework for production',
		docSource: 'url',
		docsUrl: 'https://nextjs.org/',
		hasSecurityAlert: false,
		id: 'nextjs',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: true,
		lastScrapedDate: '2023-12-10',
		logoUrl: 'https://nextjs.org/favicon.ico',
		name: 'Next.js',
		version: '14.0.3',
	},
	{
		category: 'frontend',
		description: 'Progressive JavaScript framework',
		docSource: 'url',
		docsUrl: 'https://vuejs.org/',
		hasSecurityAlert: false,
		id: 'vue',
		isLocal: false,
		isUnused: true,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-11-05',
		logoUrl: 'https://vuejs.org/images/logo.png',
		name: 'Vue.js',
		version: '3.3.8',
	},

	// Database packages
	{
		category: 'database',
		description: 'Next-generation ORM for Node.js and TypeScript',
		docSource: 'url',
		docsUrl: 'https://www.prisma.io/',
		hasSecurityAlert: false,
		id: 'prisma',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-12-15',
		logoUrl: 'https://prismalens.vercel.app/header/logo-dark.svg',
		name: 'Prisma',
		version: '5.6.0',
	},
	{
		category: 'database',
		description: 'Document-oriented NoSQL database',
		docSource: 'url',
		docsUrl: 'https://www.mongodb.com/',
		hasSecurityAlert: true,
		id: 'mongodb',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-11-25',
		logoUrl: 'https://www.mongodb.com/assets/images/global/leaf.png',
		name: 'MongoDB',
		version: '6.3.0',
	},
	{
		category: 'database',
		description: 'Advanced open source relational database',
		docSource: 'url',
		docsUrl: 'https://www.postgresql.org/',
		hasSecurityAlert: false,
		id: 'postgres',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: true,
		lastScrapedDate: '2023-12-05',
		logoUrl: 'https://www.postgresql.org/media/img/about/press/elephant.png',
		name: 'PostgreSQL',
		version: '16.1',
	},

	// Testing packages
	{
		category: 'testing',
		description: 'Delightful JavaScript Testing Framework',
		docSource: 'url',
		docsUrl: 'https://jestjs.io/',
		hasSecurityAlert: false,
		id: 'jest',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-11-10',
		logoUrl: 'https://jestjs.io/img/jest.png',
		name: 'Jest',
		version: '29.7.0',
	},
	{
		category: 'testing',
		description: 'Blazing fast unit test framework',
		docSource: 'url',
		docsUrl: 'https://vitest.dev/',
		hasSecurityAlert: false,
		id: 'vitest',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: true,
		lastScrapedDate: '2023-12-10',
		logoUrl: 'https://vitest.dev/logo.svg',
		name: 'Vitest',
		version: '0.34.6',
	},

	// Hosting packages
	{
		category: 'hosting',
		description: 'Platform for frontend frameworks and static sites',
		docSource: 'url',
		docsUrl: 'https://vercel.com/docs',
		hasSecurityAlert: false,
		id: 'vercel',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-12-20',
		logoUrl:
			'https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png',
		name: 'Vercel',
		version: 'N/A',
	},
	{
		category: 'hosting',
		description: 'Web hosting and automation platform',
		docSource: 'url',
		docsUrl: 'https://docs.netlify.com/',
		hasSecurityAlert: false,
		id: 'netlify',
		isLocal: false,
		isUnused: false,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-11-30',
		logoUrl: 'https://www.netlify.com/v3/img/components/logomark.png',
		name: 'Netlify',
		version: 'N/A',
	},

	// Local packages
	{
		category: 'other',
		description: 'Common utility functions for application',
		docSource: 'path',
		docsUrl: '/src/lib/utils/README.md',
		hasSecurityAlert: false,
		id: 'utils-lib',
		isLocal: true,
		isUnused: false,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-12-22',
		logoUrl: '/assets/package-icons/utils.svg',
		name: 'Utils Library',
		version: '1.2.0',
	},
	{
		category: 'backend',
		description: 'Authentication service for internal use',
		docSource: 'jsdoc',
		docsUrl: '/src/services/auth',
		hasSecurityAlert: true,
		id: 'auth-service',
		isLocal: true,
		isUnused: false,
		isUpdateAvailable: true,
		lastScrapedDate: '2023-12-18',
		logoUrl: '/assets/package-icons/auth.svg',
		name: 'Auth Service',
		version: '0.5.0',
	},
	{
		category: 'frontend',
		description: 'Custom UI component library',
		docSource: 'jsdoc',
		docsUrl: '/src/components/ui',
		hasSecurityAlert: false,
		id: 'ui-components',
		isLocal: true,
		isUnused: false,
		isUpdateAvailable: false,
		lastScrapedDate: '2023-12-25',
		logoUrl: '/assets/package-icons/ui.svg',
		name: 'UI Components',
		version: '2.1.0',
	},
];

export const mockAppConfigs: AppConfig[] = [
	{
		description: 'Shared packages across all projects',
		filePath: '/config/common.json',
		id: 'common',
		isCommon: true,
		isLocal: false,
		name: 'Common Config',
		packages: ['jest', 'netlify'],
	},
	{
		description: 'Internally developed packages',
		filePath: '/config/local-packages.json',
		id: 'local-packages',
		isCommon: false,
		isLocal: true,
		name: 'Local Packages',
		packages: ['utils-lib', 'auth-service', 'ui-components'],
	},
	{
		description: 'Modern JavaScript stack with React and Express',
		filePath: '/projects/full-stack/tech-stack.json',
		id: 'full-stack-js',
		isCommon: false,
		isLocal: false,
		name: 'Full Stack JavaScript',
		packages: ['express', 'react', 'mongodb', 'jest'],
	},
	{
		description: 'Next.js with Prisma ORM and PostgreSQL',
		filePath: '/projects/web/dependencies.json',
		id: 'next-prisma',
		isCommon: false,
		isLocal: false,
		name: 'Next.js + Prisma',
		packages: ['nextjs', 'prisma', 'postgres', 'vercel', 'vitest'],
	},
];
