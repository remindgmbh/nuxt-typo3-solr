<template>
    <div class="t3-ce-solr-results">
        <T3SolrSearch :content-element="contentElement">
            <template #submit="{ loading }">
                <slot name="submit" :loading="loading"></slot>
            </template>
        </T3SolrSearch>
        <template v-if="content.data.results.count">
            <T3Pagination
                v-if="pagination && paginationTop"
                class="t3-ce-solr-results__pagination t3-ce-solr-results__pagination--top"
                :pagination="pagination"
            />
            <div class="t3-ce-solr-results__list">
                <T3SolrListItem
                    v-for="item in content.data.results.documents"
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
import { computed } from 'vue'
import { T3Model, T3SolrModel, useT3CeSolrPiResults } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3SolrModel.SolrPiResults>
}>()

const content = computed(() => props.contentElement.content)

const { noResultsFound, pagination, paginationBottom, paginationTop } =
    useT3CeSolrPiResults(content)
</script>
