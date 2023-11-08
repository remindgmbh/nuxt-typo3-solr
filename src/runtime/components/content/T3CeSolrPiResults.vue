<template>
    <div class="ce-solr-results">
        <template v-if="contentElement.content.data.count">
            <div class="ce-solr-results__list">
                <componenent
                    :is="SolrListItem"
                    v-for="item in contentElement.content.data.documents"
                    :key="item.link"
                    :list-item="item"
                />
            </div>
            <component
                :is="Pagination"
                v-if="contentElement.content.data.pagination"
                class="ce-solr-results__pagination"
                :pagination="contentElement.content.data.pagination"
            />
        </template>
        <div v-else class="ce-solr-results__no-results">
            {{ $t('solr.noResults') }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3SolrModel, useT3DynamicComponent, useT3Content } from '#imports'
import { T3SolrListItem, T3Pagination } from '#components'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement<T3SolrModel.Typo3.SolrPiResults>()

const SolrListItem =
    useT3DynamicComponent<typeof T3SolrListItem>('SolrListItem')
const Pagination = useT3DynamicComponent<typeof T3Pagination>('Pagination')
</script>
