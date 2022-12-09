import { T3Api } from '#nuxt-typo3'
import { Document } from '.'

export interface Result {
    documents: Document[]
    count: number
    query?: string
    pagination: T3Api.Pagination
}
