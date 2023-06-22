import { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'

export interface SolrPiSearch extends Typo3.Content.Data.Base {
    data: {
        query?: string
        search: {
            url: string
            queryParam: string
        }
        suggest: {
            url: string
            queryParam: string
        }
    }
}
