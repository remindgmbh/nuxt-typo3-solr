<template>
    <div class="t3-ce-solr-results">
        <template v-if="contentElement.content.data.count">
            <div class="t3-ce-solr-results__list">
                <T3SolrListItem
                    v-for="item in contentElement.content.data.documents"
                    :key="item.link"
                    :list-item="item"
                />
            </div>
            <T3Pagination
                v-if="contentElement.content.data.pagination"
                class="t3-ce-solr-results__pagination"
                :pagination="contentElement.content.data.pagination"
            />
        </template>
        <div v-else class="t3-ce-solr-results__no-results">
            {{ $t('solr.noResults') }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3SolrModel, useT3ContentInjection } from '#imports'
import { T3SolrListItem } from '#components'

const { injectContentElement } = useT3ContentInjection()

const contentElement = injectContentElement<T3SolrModel.Typo3.SolrPiResults>()
</script>
