<template>
    <div class="t3-solr-list-item">
        <NuxtLink class="t3-solr-list-item__title" :to="listItem.url">{{
            listItem.title
        }}</NuxtLink>
        <T3HtmlParser
            class="t3-solr-list-item__content"
            :content="listItem.content"
        />
        <NuxtLink :to="listItem.url">{{ listItem.url }}</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { T3SolrApi } from '#nuxt-typo3-solr'

defineProps<{
    listItem: T3SolrApi.Document
}>()
</script>
