import { FacetOption } from '.'

export interface Facet {
    field: string
    name: string
    label: string
    options: FacetOption[]
}
