<template>
    <div class="t3-ce-solr-search">
        <T3Header :content="contentElement.content" />
        <T3SolrSearchForm :search-form="contentElement.content.data" />
    </div>
</template>

<script setup lang="ts">
import { T3SolrModel, useT3ContentInjection } from '#imports'

const { injectContentElement } = useT3ContentInjection()

const contentElement = injectContentElement<T3SolrModel.Typo3.SolrPiSearch>()
</script>
