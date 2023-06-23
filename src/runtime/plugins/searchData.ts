import { defineNuxtPlugin, useT3SolrApiData } from '#imports'

export default defineNuxtPlugin(async () => {
    const { loadSearchData } = useT3SolrApiData()
    await loadSearchData('/')
})
