import { FacetOption } from '.'

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
