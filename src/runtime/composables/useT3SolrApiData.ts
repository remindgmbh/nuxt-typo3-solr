import { type Ref } from 'vue'
import { useLogger } from '#nuxt-logger'
import { Typo3 } from '../models'
import { useRuntimeConfig, useState, useT3Api, useT3ApiPath } from '#imports'

export function useT3SolrApiData() {
    const api = useT3Api()
    const apiPath = useT3ApiPath()
    const config = useRuntimeConfig()
    const logger = useLogger()

    const searchForm: Ref<Typo3.SearchForm | undefined> = useState(
        't3-solr-search-form',
    )

    async function loadSearchForm(
        path: string,
    ): Promise<Typo3.SearchForm | undefined> {
        const initialDataPath = apiPath.getInitialDataPath(path)

        if (!searchForm.value) {
            try {
                const result = await api.get<Typo3.SearchForm>(
                    initialDataPath,
                    {
                        params: {
                            type: config.public.typo3Solr.api.searchType,
                        },
                    },
                )
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
