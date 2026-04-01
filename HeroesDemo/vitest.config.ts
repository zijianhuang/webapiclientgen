import { defineConfig } from 'vitest/config';

export default defineConfig(
	({ mode }) => ({
		test: {
			// setupFiles: mode === 'remote'
			// 	? ['./vitestSetupRemote.ts']
			// 	: ['./vitestSetup.ts'],
			setupFiles: ['./vitestSetup.ts'],
			globals: true,
			environment: 'jsdom',
			exclude: [
				'**/node_modules/**',
				'**/dist/**',
				'**/out-tsc/**',
				'**/build/**',
				'**/.angular/**'
			],
			env: {
				VITEST_MODE: mode, // pass mode as an env variable
			},
		},
	})
);
