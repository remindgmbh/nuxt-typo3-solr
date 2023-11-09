import type { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import type { Document, Facet } from '.'

export interface SolrPiResults extends Typo3.Content.Data.Header {
    data: {
        query?: string
        count: number
        pagination: Typo3.Extbase.Pagination
        facets: Facet[]
        documents: Document[]
    }
}
