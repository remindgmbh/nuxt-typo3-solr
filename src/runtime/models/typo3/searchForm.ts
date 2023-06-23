export interface SearchForm {
    query?: string
    search: {
        url: string
        queryParam: string
    }
    suggest: {
        url: string
        queryParam: string
    }
}
