import { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import { Document, Facet } from '.'

export interface SolrPiResults extends Typo3.Content.Data.Base {
    data: {
        query?: string
        count: number
        pagination: Typo3.Extbase.Pagination
        facets: Facet[]
        documents: Document[]
    }
}
