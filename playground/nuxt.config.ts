export default defineNuxtConfig({
    components: [
        {
            global: true,
            path: '@/components',
        },
    ],
    imports: {
        autoImport: false,
    },
    modules: ['@remindgmbh/nuxt-typo3', '@remindgmbh/nuxt-typo3-solr'],
    runtimeConfig: {
        public: {
            typo3: {
                api: {
                    baseUrl: '',
                },
                baseUrl: '',
                cookiebotUid: '',
            },
        },
    },
    typescript: {
        shim: false,
        strict: true,
    },
})
