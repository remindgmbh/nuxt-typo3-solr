import type { T3Model } from '#imports'

export interface Document {
    title: string
    content: string
    link: string
    image?: T3Model.Typo3.Asset
    [key: string]: any
}
