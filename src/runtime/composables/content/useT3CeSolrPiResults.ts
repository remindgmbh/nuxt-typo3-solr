import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import { T3Model, T3SolrModel, useT3SolrConfig } from '#imports'

export function useT3CeSolrPiResults(
    contentElement: T3Model.Typo3.Content.Element<T3SolrModel.Typo3.SolrPiResults>
) {
    const { t } = useI18n()
    const config = useT3SolrConfig()

    const noResultsFound = computed(() => t('solr.noResults'))

    const pagination = computed<Typo3.Extbase.Pagination | undefined>(
        () => contentElement.content.data.pagination
    )

    const paginationTop = computed(() =>
        ['top', 'both'].includes(config.pagination.position)
    )

    const paginationBottom = computed(() =>
        ['bottom', 'both'].includes(config.pagination.position)
    )

    return { noResultsFound, pagination, paginationBottom, paginationTop }
}
