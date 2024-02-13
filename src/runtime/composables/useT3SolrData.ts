import { type T3SolrModel, useT3Data } from '#imports'
import { computed } from 'vue'

export function useT3SolrData() {
    const { currentInitialData } = useT3Data()

    const searchForm = computed<T3SolrModel.Typo3.SearchForm | undefined>(() =>
        currentInitialData.value?.solr
            ? (currentInitialData.value?.solr as T3SolrModel.Typo3.SearchForm)
            : undefined,
    )

    return { searchForm }
}
