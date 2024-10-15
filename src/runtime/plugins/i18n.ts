import { defineNuxtPlugin, useT3I18n } from '#imports'

import de from '@remindgmbh/nuxt-typo3-solr/locales/de'
import en from '@remindgmbh/nuxt-typo3-solr/locales/en'

export default defineNuxtPlugin(() => {
    const i18n = useT3I18n()

    const { mergeLocaleMessage } = i18n.global

    mergeLocaleMessage('de', de)
    mergeLocaleMessage('en', en)
})
