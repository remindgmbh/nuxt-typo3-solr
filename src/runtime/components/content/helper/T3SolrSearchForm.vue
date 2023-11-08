<template>
    <form class="solr-search-form" @submit="submit">
        <component
            :is="Autocomplete"
            class="solr-search-form__input"
            :disabled="loading"
            :name="inputName"
            :placeholder="placeholder"
            :default-value="defaultValue ?? query"
            :option-groups="optionGroups"
            @input="onInput"
        />
        <button
            class="solr-search-form__submit"
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
import {
    T3SolrModel,
    useT3DynamicComponent,
    useT3SolrSearchForm,
} from '#imports'
import { T3Autocomplete } from '#components'

const props = defineProps<{
    searchForm: T3SolrModel.Typo3.SearchForm
    defaultValue?: string
}>()

const Autocomplete =
    useT3DynamicComponent<typeof T3Autocomplete>('Autocomplete')

const {
    inputName,
    loading,
    optionGroups,
    placeholder,
    query,
    submitLabel,
    onInput,
    submit,
} = useT3SolrSearchForm(props.searchForm)
</script>
