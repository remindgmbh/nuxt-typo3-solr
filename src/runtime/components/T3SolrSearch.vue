<template>
    <div class="t3-solr-search">
        <T3Header :content="contentElement.content" />
        <form class="t3-solr-search__form" @submit="submit">
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
    </div>
</template>

<script setup lang="ts">
import { T3Model, T3SolrModel } from '#imports'
import { useT3SolrSearch } from '#nuxt-typo3-solr/composables/useT3SolrSearch'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<
        T3SolrModel.SolrPiSearch | T3SolrModel.SolrPiResults
    >
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
} = useT3SolrSearch(props.contentElement.content)
</script>

<style lang="scss">
.t3-solr-search {
    &__form {
        display: flex;
    }

    &__input {
        flex-grow: 1;
    }
}
</style>
