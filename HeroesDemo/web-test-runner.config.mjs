import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
    concurrency: 10,
    nodeResolve: true,
    watch: true,
    rootDir: '../',

    files: ['src/**/*.spec.ts'],
    plugins: [esbuildPlugin({ ts: true })],
}
