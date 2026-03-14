import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(
	({ mode }) => ({
		plugins: [tsconfigPaths()],
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
