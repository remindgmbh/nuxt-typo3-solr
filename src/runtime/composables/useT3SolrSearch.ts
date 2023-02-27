import { computed, ref } from 'vue'
import { navigateTo } from '#app'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { debounce } from 'perfect-debounce'
import { T3Model } from '#nuxt-typo3'
import { useT3Api } from '#nuxt-typo3/composables/useT3Api'
import { T3SolrApi } from '#nuxt-typo3-solr'

export function useT3SolrSearch(
    content: T3SolrApi.SolrPiSearch | T3SolrApi.SolrPiResults
) {
    const inputName = 'search_term'
    const api = useT3Api()
    const { handleSubmit } = useForm()
    const { t } = useI18n()
    const optionGroups = ref<T3Model.AutocompleteOptionGroup[]>([])
    const loading = ref(false)

    const defaultValue = computed(
        () => (content as T3SolrApi.SolrPiResults).data.results.query
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

        const suggestions = await api.get<T3SolrApi.Suggestions>(path, {
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
