import type { FacetOption } from '../typo3'

export interface Facet {
    field: string
    name: string
    label: string
    allOptions: {
        link: string
        count: number
        active: boolean
    }
    options: FacetOption[]
}
