import react from '@vitejs/plugin-react'
import {
    defineConfig
} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import os from 'os'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
        open: true, // Automatically open browser
        strictPort: false,
        // Removed host:true — scanning all network interfaces slows startup
    },
    // Move Vite's cache out of OneDrive to avoid sync/antivirus scanning overhead
    cacheDir: path.join(os.tmpdir(), 'vite-cache-hacakthon2'),
    optimizeDeps: {
        // Pre-bundle ALL heavy deps so Vite doesn't lazily scan after browser opens
        include: [
            'react',
            'react-dom',
            'react-dom/client',
            'react-router-dom',
            'lucide-react',
        ],
        // Force re-bundle on startup so cache in temp dir is always fresh
        force: false,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    icons: ['lucide-react'],
                },
            },
        },
    },
})