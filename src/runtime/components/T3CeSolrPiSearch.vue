<template>
    <div class="t3-ce-solr-search">
        <T3SolrSearch :content-element="contentElement" />
    </div>
</template>

<script setup lang="ts">
import { T3Model, T3SolrModel } from '#imports'

defineProps<{
    contentElement: T3Model.Typo3.Content.Element<
        T3SolrModel.SolrPiSearch | T3SolrModel.SolrPiResults
    >
}>()
</script>
