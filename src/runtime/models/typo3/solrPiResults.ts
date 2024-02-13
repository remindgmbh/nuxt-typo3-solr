import type { Document, Facet } from '.'
import type { T3Model } from '#imports'

export interface SolrPiResults extends T3Model.Typo3.Content.Data.Header {
    data: {
        query?: string
        count: number
        pagination: T3Model.Typo3.Extbase.Pagination
        facets: Facet[]
        documents: Document[]
        spellchecking: string[]
    }
}
