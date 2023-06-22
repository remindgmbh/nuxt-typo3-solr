import { FacetOption } from '.'

export interface Facet {
    field: string
    name: string
    label: string
    allOptions: {
        active: boolean
        link: string
    }
    options: FacetOption[]
}
