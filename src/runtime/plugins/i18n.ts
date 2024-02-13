import { defineNuxtPlugin } from '#imports'
import { i18n } from '#nuxt-typo3/plugins/i18n'

import de from '#nuxt-typo3-solr/locales/de'
import en from '#nuxt-typo3-solr/locales/en'

export default defineNuxtPlugin(() => {
    const { mergeLocaleMessage } = i18n.global
    mergeLocaleMessage('de', de)
    mergeLocaleMessage('en', en)
})
