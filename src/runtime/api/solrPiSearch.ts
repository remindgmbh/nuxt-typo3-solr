import { T3Api } from '#nuxt-typo3'
import { Form } from '.'

export interface SolrPiSearch extends T3Api.Content.Base {
    data: {
        form: Form
    }
}
