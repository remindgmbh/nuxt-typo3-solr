<template>
    <form ref="formRef" class="t3-solr-search-form" @submit="submit">
        <T3Autocomplete
            class="t3-solr-search-form__input"
            :default-value="defaultValue"
            :disabled="loading"
            :name="inputName"
            :option-groups="optionGroups"
            :placeholder="placeholder"
            @input="onInput"
            @select="onSelect"
        />
        <button
            class="t3-solr-search-form__submit"
            :disabled="loading"
            type="submit"
        >
            <slot :loading="loading" name="submit">
                {{ submitLabel }}
            </slot>
        </button>
    </form>
</template>

<script setup lang="ts">
import { type T3SolrModel, useT3SolrSearchForm } from '#imports'
import { ref, toRef } from 'vue'

const props = defineProps<{
    searchForm: T3SolrModel.Typo3.SearchForm
    defaultValue?: string
}>()

const formRef = ref<HTMLFormElement>()

const {
    defaultValue,
    inputName,
    loading,
    optionGroups,
    placeholder,
    submitLabel,
    onInput,
    submit,
} = useT3SolrSearchForm(
    toRef(() => props.searchForm),
    toRef(() => props.defaultValue),
)

function onSelect() {
    formRef.value?.requestSubmit()
}
</script>
