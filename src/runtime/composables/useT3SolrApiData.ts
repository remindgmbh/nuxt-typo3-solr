import { Ref } from 'vue'
import { useLogger } from '#nuxt-logger'
import * as T3SolrModel from '../models'
import { useRuntimeConfig, useState, useT3Api, useT3ApiPath } from '#imports'

export function useT3SolrApiData() {
    const api = useT3Api()
    const apiPath = useT3ApiPath()
    const config = useRuntimeConfig()
    const logger = useLogger()

    const searchData: Ref<T3SolrModel.Typo3.SearchForm | undefined> = useState(
        't3-solr-search-data'
    )

    async function loadSearchData(
        path: string
    ): Promise<T3SolrModel.Typo3.SearchForm | undefined> {
        const initialDataPath = apiPath.getInitialDataPath(path)

        if (!searchData.value) {
            try {
                const result = await api.get<T3SolrModel.Typo3.SearchForm>(
                    initialDataPath,
                    {
                        params: {
                            type: config.public.typo3Solr.api.searchType,
                        },
                    }
                )
                searchData.value = result
                return result
            } catch (error) {
                // log error and do nothing so undefined is returned
                logger.error(error)
            }
        }
        return searchData.value
    }

    return {
        searchData,
        loadSearchData,
    }
}
