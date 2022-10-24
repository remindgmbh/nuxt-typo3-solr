<template>
    <div class="t3-ce-solr-search">
        <T3SolrSearch :content-element="contentElement" />
    </div>
</template>

<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'
import { T3SolrApi } from '#nuxt-typo3-solr'

defineProps<{
    contentElement: T3Api.ContentElement<
        T3SolrApi.SolrPiSearch | T3SolrApi.SolrPiResults
    >
}>()
</script>
