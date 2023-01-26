import type { UserConfig, ConfigEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlusPreset from 'unplugin-auto-import-element-plus-preset'
import EslintPlugin from 'vite-plugin-eslint'
import ViteCompress from 'vite-plugin-compression'
import ViteImagemin from 'vite-plugin-imagemin'
import Vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import WindiCSS from 'vite-plugin-windicss'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

const root = process.cwd()

const pathResolve = (dir: string) => resolve(root, '.', dir)

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'

  const env = loadEnv(mode, root)

  return {
    base: env.VITE_BASE_PATH,
    root,
    plugins: [
      ViteCompress(),
      Vue(),
      VueJsx(),
      VueSetupExtend({}),
      WindiCSS(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', '@vueuse/core', ElementPlusPreset],
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: isBuild
      }),
      EslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx']
      }),
      ViteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      }),
      ViteEjsPlugin({
        title: env.VITE_APP_TITLE
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: !isBuild
      }),
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [pathResolve('src/locales/**')]
      })
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json', '.less', '.css'],
      alias: [
        {
          find: '@',
          replacement: `${pathResolve('src')}/`
        },
        {
          find: '_v',
          replacement: `${pathResolve('src/views')}/`
        }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/assets/styles/variables.module.less";',
          javascriptEnabled: true
        }
      }
    },
    build: {
      minify: 'terser',
      outDir: env.VITE_OUT_DIR,
      terserOptions: {
        compress: {
          drop_debugger: isBuild,
          drop_console: isBuild
        }
      }
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    optimizeDeps: {
      include: [
        '@vueuse/core',
        'axios',
        'element-plus/es/locale/lang/en',
        'element-plus/es/locale/lang/zh-cn',
        'vue',
        'vue-router',
        'vue-types'
      ]
    }
  }
}
