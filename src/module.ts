import {
    addComponentsDir,
    addImports,
    addImportsDir,
    addPlugin,
    createResolver,
    defineNuxtModule,
} from '@nuxt/kit'
import { name, version } from '../package.json'

export const CONFIG_KEY = 'typo3Solr'

export default defineNuxtModule({
    meta: {
        configKey: CONFIG_KEY,
        name,
        version,
    },
    setup(_options, nuxt) {
        const resolver = createResolver(import.meta.url)

        nuxt.options.alias['#nuxt-typo3-solr'] = resolver.resolve('runtime')

        addPlugin({
            src: resolver.resolve('runtime/plugins/i18n'),
        })
        addImportsDir(resolver.resolve('runtime/composables/**/*'))
        addImports({
            as: 'T3SolrModel',
            from: resolver.resolve('runtime/models'),
            name: '*',
        })
        addComponentsDir({
            path: resolver.resolve('runtime/components'),
            pathPrefix: false,
        })
    },
})
