import { defineNuxtPlugin, useT3SolrApiData } from '#imports'

export default defineNuxtPlugin(async () => {
    const { loadSearchForm } = useT3SolrApiData()
    await loadSearchForm('/')
})
