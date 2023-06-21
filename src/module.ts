import {
    addComponentsDir,
    addImports,
    addImportsDir,
    addPlugin,
    createResolver,
    defineNuxtModule,
} from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'

export const CONFIG_KEY = 'typo3Solr'

export interface ModuleOptions {
    pagination: {
        // Position of the pagination for result list
        position: 'top' | 'bottom' | 'both'
    }
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name,
        version,
        configKey: CONFIG_KEY,
    },
    defaults: {
        pagination: {
            position: 'bottom',
        },
    },
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

        nuxt.options.runtimeConfig.public[CONFIG_KEY] = defu(
            nuxt.options.runtimeConfig.public[CONFIG_KEY],
            options
        )

        nuxt.options.alias['#nuxt-typo3-solr'] = resolver.resolve('runtime')

        addPlugin({
            src: resolver.resolve('runtime/plugins/i18n'),
        })
        addImportsDir(resolver.resolve('runtime/composables/**/*'))
        addImports({
            from: resolver.resolve('runtime/models'),
            name: '*',
            as: 'T3SolrModel',
        })
        addComponentsDir({
            path: resolver.resolve('runtime/components'),
            pathPrefix: false,
            global: true,
            ignore: ['**/shared.*'],
        })
    },
})
