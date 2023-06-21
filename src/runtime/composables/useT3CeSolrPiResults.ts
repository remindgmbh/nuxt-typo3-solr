import { computed, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRuntimeConfig } from '#app'
import { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import { T3SolrModel } from '#imports'

export function useT3CeSolrPiResults(content: Ref<T3SolrModel.SolrPiResults>) {
    const { t } = useI18n()
    const config = useRuntimeConfig().public.typo3Solr

    const noResultsFound = computed(() => t('solr.noResults'))

    const pagination = computed<Typo3.Extbase.Pagination | undefined>(
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
