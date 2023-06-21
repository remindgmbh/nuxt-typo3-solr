import { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import { Form } from '.'

export interface SolrPiSearch extends Typo3.Content.Data.Base {
    data: {
        form: Form
    }
}
