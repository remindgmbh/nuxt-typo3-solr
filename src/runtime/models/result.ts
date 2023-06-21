import { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import { Document } from '.'

export interface Result {
    documents: Document[]
    count: number
    query?: string
    pagination: Typo3.Extbase.Pagination
}
