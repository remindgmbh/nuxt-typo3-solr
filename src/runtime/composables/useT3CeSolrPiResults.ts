import { computed, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRuntimeConfig } from '#app'
import { T3Model } from '#nuxt-typo3'
import { T3SolrApi } from '#nuxt-typo3-solr'

export function useT3CeSolrPiResults(content: Ref<T3SolrApi.SolrPiResults>) {
    const { t } = useI18n()
    const config = useRuntimeConfig().public.typo3Solr

    const noResultsFound = computed(() => t('solr.noResults'))

    const pagination = computed<T3Model.Pagination | undefined>(
        () => content.value.data.results.pagination
    )

    const paginationTop = computed(() =>
        ['top', 'both'].includes(config.pagination.position)
    )

    const paginationBottom = computed(() =>
        ['bottom', 'both'].includes(config.pagination.position)
    )

    return { noResultsFound, pagination, paginationBottom, paginationTop }
}
