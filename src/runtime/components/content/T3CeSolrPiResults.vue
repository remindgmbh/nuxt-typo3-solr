<template>
    <div class="t3-ce-solr-results">
        <template v-if="contentElement.content.data.count">
            <T3Pagination
                v-if="pagination && paginationTop"
                class="t3-ce-solr-results__pagination t3-ce-solr-results__pagination--top"
                :pagination="pagination"
            />
            <div class="t3-ce-solr-results__list">
                <T3SolrListItem
                    v-for="item in contentElement.content.data.documents"
                    :key="item.url"
                    :list-item="item"
                />
            </div>
            <T3Pagination
                v-if="pagination && paginationBottom"
                class="t3-ce-solr-results__pagination t3-ce-solr-results__pagination--bottom"
                :pagination="pagination"
            />
        </template>
        <div v-else class="t3-ce-solr-results__no-results">
            {{ noResultsFound }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3Model, T3SolrModel, useT3CeSolrPiResults } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3SolrModel.SolrPiResults>
}>()

const { noResultsFound, pagination, paginationBottom, paginationTop } =
    useT3CeSolrPiResults(props.contentElement)
</script>
