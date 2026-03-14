import { defineConfig } from 'vitest/config';

export default defineConfig(
	({ mode }) => ({
		test: {
			setupFiles: mode === 'remote'
				? ['./vitestSetupRemote.ts']
				: ['./vitestSetup.ts'],

			globals: true,
			environment: 'jsdom',
			exclude: [
				'**/node_modules/**',
				'**/dist/**',
				'**/out-tsc/**',
				'**/build/**',
				'**/.angular/**'
			]
		},
	})
);
