import { type Ref, computed } from 'vue'
import { useLogger } from '#imports'
import { Typo3 } from '../models'
import {
    useRuntimeConfig,
    useState,
    useT3Api,
    useT3Data,
    useRoute,
} from '#imports'

export function useT3SolrData() {
    const api = useT3Api()
    const config = useRuntimeConfig()
    const logger = useLogger()
    const { getLocalizedRootPath } = useT3Data()

    const searchForm: Ref<{
        [path: string]: Typo3.SearchForm | undefined
    }> = useState('t3-solr-searchForm', () => ({}))

    const currentRootPath = computed(() =>
        getLocalizedRootPath(useRoute().fullPath),
    )

    const currentSearchForm = computed<Typo3.SearchForm | undefined>({
        get() {
            return searchForm.value[currentRootPath.value]
        },
        set(value) {
            searchForm.value[currentRootPath.value] = value
        },
    })

    async function loadSearchForm(
        path: string,
    ): Promise<Typo3.SearchForm | undefined> {
        const rootPath = getLocalizedRootPath(path)

        if (!searchForm.value[rootPath]) {
            try {
                const result = await api.get<Typo3.SearchForm>(rootPath, {
                    params: {
                        type: config.public.typo3Solr.api.searchType,
                    },
                })
                searchForm.value[rootPath] = result
                return result
            } catch (error) {
                // log error and do nothing so undefined is returned
                logger.error(error)
            }
        }
        return searchForm.value[rootPath]
    }

    return {
        currentSearchForm,
        searchForm,
        loadSearchForm,
    }
}
