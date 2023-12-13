import { defineNuxtPlugin, useT3SolrData } from '#imports'

export default defineNuxtPlugin(async () => {
    const { loadSearchForm } = useT3SolrData()
    await loadSearchForm()
})
