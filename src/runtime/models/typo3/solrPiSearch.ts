import type { SearchForm } from '.'
import type { T3Model } from '#imports'

export interface SolrPiSearch extends T3Model.Typo3.Content.Data.Header {
    data: SearchForm
}
