import { Api } from '#nuxt-typo3'
import { Document } from '.'

export interface Result {
    documents: Document[]
    count: number
    query?: string
    pagination: Api.Pagination
}
