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
        name,
        version,
        configKey: CONFIG_KEY,
    },
    setup(_options, nuxt) {
        const resolver = createResolver(import.meta.url)

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
