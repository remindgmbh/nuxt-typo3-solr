<template>
    <form ref="formRef" class="t3-solr-search-form" @submit="submit">
        <T3Autocomplete
            class="t3-solr-search-form__input"
            :disabled="loading"
            :name="inputName"
            :placeholder="placeholder"
            :default-value="defaultValue ?? query"
            :option-groups="optionGroups"
            @input="onInput"
            @select="onSelect"
        />
        <button
            class="t3-solr-search-form__submit"
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
import { ref } from 'vue'
import { T3SolrModel, useT3SolrSearchForm } from '#imports'

const props = defineProps<{
    searchForm: T3SolrModel.Typo3.SearchForm
    defaultValue?: string
}>()

const formRef = ref<HTMLFormElement>()

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

function onSelect() {
    formRef.value?.requestSubmit()
}
</script>
