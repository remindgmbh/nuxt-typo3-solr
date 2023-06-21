import { Result, SolrPiSearch } from '.'

export type SolrPiResults = SolrPiSearch & {
    data: {
        results: Result
    }
}
