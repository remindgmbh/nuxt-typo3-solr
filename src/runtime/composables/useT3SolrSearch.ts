import { computed, ref } from 'vue'
import { navigateTo } from '#app'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { debounce } from 'perfect-debounce'
import { Autocomplete } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import { T3SolrModel, useT3Api } from '#imports'

export function useT3SolrSearch(
    content: T3SolrModel.SolrPiSearch | T3SolrModel.SolrPiResults
) {
    const inputName = 'search_term'
    const api = useT3Api()
    const { handleSubmit } = useForm()
    const { t } = useI18n()
    const optionGroups = ref<Autocomplete.OptionGroup[]>([])
    const loading = ref(false)

    const defaultValue = computed(
        () => (content as T3SolrModel.SolrPiResults).data.results.query
    )

    const placeholder = computed(() => t('solr.placeholder'))

    const submitLabel = computed(() =>
        loading.value ? t('solr.loading') : t('solr.submit')
    )

    async function onInput(value: string) {
        if (!value) {
            optionGroups.value = []
            return
        }

        const path = content.data.form.suggest.url
        const params = {
            [content.data.form.suggest.queryParam]: value,
        }

        const suggestions: T3SolrModel.Suggestions = await api.get(path, {
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
                label: t('solr.directLinks'),
                options: (suggestions.documents ?? []).map((document) => ({
                    key: document.link,
                    label: document.title,
                    link: document.link,
                })),
            },
        ]
    }

    async function search(data: { [key: string]: any }) {
        const term = data[inputName] || '*'

        const path = content.data.form.search.url

        const query = {
            [content.data.form.search.queryParam]: term,
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
