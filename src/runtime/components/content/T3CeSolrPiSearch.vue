<template>
    <div class="ce-solr-search">
        <component :is="Header" :content="contentElement.content" />
        <component
            :is="SolrSearchForm"
            :search-form="contentElement.content.data"
        />
    </div>
</template>

<script setup lang="ts">
import { T3SolrModel, useT3DynamicComponent, useT3Content } from '#imports'
import { T3Header, T3SolrSearchForm } from '#components'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement<T3SolrModel.Typo3.SolrPiSearch>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')
const SolrSearchForm =
    useT3DynamicComponent<typeof T3SolrSearchForm>('SolrSearchForm')
</script>
