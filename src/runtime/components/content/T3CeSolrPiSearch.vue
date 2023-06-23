<template>
    <div class="t3-ce-solr-search">
        <T3Header :content="contentElement.content" />
        <T3SolrSearchForm :search-form="contentElement.content.data" />
    </div>
</template>

<script setup lang="ts">
import { T3Model, T3SolrModel } from '#imports'

defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3SolrModel.Typo3.SolrPiSearch>
}>()
</script>
