import {defineConfig, mergeConfig} from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        exclude: ['**/node_modules/**',],
        setupFiles: ['./tests/setup.ts'],
        environment: "happy-dom"
    },
}))
