<template>
    <div class="t3-ce-solr-search">
        <T3Header :content="contentElement.content" />
        <form class="t3-ce-solr-search__form" @submit="submit">
            <T3Autocomplete
                class="t3-ce-solr-search__input"
                :disabled="loading"
                :name="inputName"
                :placeholder="placeholder"
                :default-value="defaultValue"
                :option-groups="optionGroups"
                @input="onInput"
            />
            <button
                class="t3-ce-solr-search__submit"
                type="submit"
                :disabled="loading"
            >
                <slot name="submit" :loading="loading">
                    {{ submitLabel }}
                </slot>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { T3Model, T3SolrModel, useT3CeSolrPiSearch } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3SolrModel.Typo3.SolrPiSearch>
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
} = useT3CeSolrPiSearch(props.contentElement)
</script>
