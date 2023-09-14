import { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'

export interface Document {
    title: string
    content: string
    link: string
    images: Typo3.Asset[]
    [key: string]: any
}
