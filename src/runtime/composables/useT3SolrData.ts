import { type Ref } from 'vue'
import { useLogger } from '#imports'
import { Typo3 } from '../models'
import { useRuntimeConfig, useState, useT3Api, useT3Data } from '#imports'

export function useT3SolrData() {
    const api = useT3Api()
    const config = useRuntimeConfig()
    const logger = useLogger()
    const { getLocalizedRootPath } = useT3Data()

    const searchForm: Ref<Typo3.SearchForm | undefined> = useState(
        't3-solr-search-form',
    )

    async function loadSearchForm(): Promise<Typo3.SearchForm | undefined> {
        const rootPath = getLocalizedRootPath('/')

        if (!searchForm.value) {
            try {
                const result = await api.get<Typo3.SearchForm>(rootPath, {
                    params: {
                        type: config.public.typo3Solr.api.searchType,
                    },
                })
                searchForm.value = result
                return result
            } catch (error) {
                // log error and do nothing so undefined is returned
                logger.error(error)
            }
        }
        return searchForm.value
    }

    return {
        searchForm,
        loadSearchForm,
    }
}
