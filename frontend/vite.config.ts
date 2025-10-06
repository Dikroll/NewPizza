import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	esbuild: {
		target: 'esnext',
	},

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},

	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
		port: 5173,
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
})
