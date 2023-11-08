<template>
    <div class="solr-list-item">
        <NuxtLink class="solr-list-item__title" :to="listItem.link">{{
            listItem.title
        }}</NuxtLink>
        <component
            :is="HtmlParser"
            class="solr-list-item__content"
            :content="listItem.content"
        />
        <NuxtLink :to="listItem.link">{{ listItem.link }}</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { T3SolrModel, useT3DynamicComponent } from '#imports'
import { T3HtmlParser } from '#components'

defineProps<{
    listItem: T3SolrModel.Typo3.Document
}>()

const HtmlParser = useT3DynamicComponent<typeof T3HtmlParser>('HtmlParser')
</script>
