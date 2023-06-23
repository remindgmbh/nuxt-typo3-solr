<template>
    <form class="t3-solr-search" @submit="submit">
        <T3Autocomplete
            class="t3-solr-search__input"
            :disabled="loading"
            :name="inputName"
            :placeholder="placeholder"
            :default-value="defaultValue"
            :option-groups="optionGroups"
            @input="onInput"
        />
        <button
            class="t3-solr-search__submit"
            type="submit"
            :disabled="loading"
        >
            <slot name="submit" :loading="loading">
                {{ submitLabel }}
            </slot>
        </button>
    </form>
</template>

<script setup lang="ts">
import { T3SolrModel, useT3SolrSearchForm } from '#imports'

const props = defineProps<{
    searchForm: T3SolrModel.Typo3.SearchForm
}>()

const {
    defaultValue,
    inputName,
    loading,
    optionGroups,
    placeholder,
    submitLabel,
    onInput,
    submit,
} = useT3SolrSearchForm(props.searchForm)
</script>
