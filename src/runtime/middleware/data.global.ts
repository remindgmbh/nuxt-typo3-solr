import { defineNuxtRouteMiddleware, useT3SolrData } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
    const { loadSearchForm } = useT3SolrData()
    await loadSearchForm(to.fullPath)
})
