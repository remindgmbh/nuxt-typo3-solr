<template>
    <T3TopbarLayout>
        <T3TopbarLayoutHeader>
            <div>
                <NuxtLink
                    v-for="language in availableLanguages"
                    :key="language.link"
                    :to="language.link"
                    >{{ language.navigationTitle }}</NuxtLink
                >
            </div>
            <div>
                <template v-if="rootPageNavigation">
                    <NuxtLink :to="rootPageNavigation.link">{{
                        rootPageNavigation.title
                    }}</NuxtLink>
                    <template
                        v-for="navItem in rootPageNavigation.children"
                        :key="navItem.link"
                    >
                        <NuxtLink :to="navItem.link">{{
                            navItem.title
                        }}</NuxtLink>
                    </template>
                </template>
            </div>
            <T3SolrSearchForm
                v-if="searchForm"
                default-value=""
                :search-form="searchForm"
            />
        </T3TopbarLayoutHeader>
        <T3TopbarLayoutContent>
            <NuxtPage />
        </T3TopbarLayoutContent>
    </T3TopbarLayout>
</template>

<script setup lang="ts">
import { useT3Languages, useT3Navigation, useT3SolrData } from '#imports'

const { rootPageNavigation } = useT3Navigation()
const { searchForm } = useT3SolrData()
const { availableLanguages } = useT3Languages()
</script>
