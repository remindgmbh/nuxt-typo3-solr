import { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import { SearchForm } from '.'

export interface SolrPiSearch extends Typo3.Content.Data.Header {
    data: SearchForm
}
