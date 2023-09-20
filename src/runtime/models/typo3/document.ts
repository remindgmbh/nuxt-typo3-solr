import { Typo3 } from '@remindgmbh/nuxt-typo3/dist/runtime/models'

export interface Document {
    title: string
    content: string
    link: string
    image?: Typo3.Asset
    [key: string]: any
}
