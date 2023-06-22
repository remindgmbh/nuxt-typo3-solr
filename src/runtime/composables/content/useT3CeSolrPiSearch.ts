import { computed, ref } from 'vue'
import { navigateTo } from '#app'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { debounce } from 'perfect-debounce'
import { Autocomplete } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import { T3Model, T3SolrModel, useT3Api } from '#imports'

export function useT3CeSolrPiSearch(
    contentElement: T3Model.Typo3.Content.Element<T3SolrModel.Typo3.SolrPiSearch>
) {
    const inputName = 'search_term'
    const api = useT3Api()
    const { handleSubmit } = useForm()
    const { t } = useI18n()
    const optionGroups = ref<Autocomplete.OptionGroup[]>([])
    const loading = ref(false)

    const defaultValue = computed(() => contentElement.content.data.query)

    const placeholder = computed(() => t('solr.placeholder'))

    const submitLabel = computed(() =>
        loading.value ? t('solr.loading') : t('solr.submit')
    )

    async function onInput(value: string) {
        if (!value) {
            optionGroups.value = []
            return
        }

        const path = contentElement.content.data.suggest.url
        const params = {
            [contentElement.content.data.suggest.queryParam]: value,
        }

        const suggestions: T3SolrModel.Typo3.Suggestions = await api.get(path, {
            params,
        })

        optionGroups.value = [
            {
                name: 'default',
                options: Object.keys(suggestions.suggestions ?? []).map(
                    (key) => ({
                        key,
                        label: key,
                    })
                ),
            },
            {
                name: 'links',
                label: t('solr.topResults'),
                options: (suggestions.documents ?? []).map((document) => ({
                    key: document.link ? document.link : document.title,
                    label: document.title,
                    link: document.link,
                })),
            },
        ]
    }

    async function search(data: { [key: string]: any }) {
        const term = data[inputName] || '*'

        const path = contentElement.content.data.search.url

        const query = {
            [contentElement.content.data.search.queryParam]: term,
        }

        loading.value = true

        await navigateTo({ path, query })

        loading.value = false
    }

    const submit = handleSubmit(search)

    return {
        defaultValue,
        inputName,
        loading,
        optionGroups,
        placeholder,
        submitLabel,
        onInput: debounce(onInput, 300),
        submit,
    }
}
