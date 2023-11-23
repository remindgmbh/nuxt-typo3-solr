import { computed, ref } from 'vue'
import { navigateTo } from '#app'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { type RouteLocationRaw } from 'vue-router'
import { debounce } from 'perfect-debounce'
import { Input } from '@remindgmbh/nuxt-typo3/dist/runtime/models'
import { T3SolrModel, useT3Api, useRoute } from '#imports'

export function useT3SolrSearchForm(searchForm: T3SolrModel.Typo3.SearchForm) {
    const inputName = 'search_term'
    const api = useT3Api()
    const route = useRoute()
    const { handleSubmit } = useForm()
    const { t } = useI18n()
    const optionGroups = ref<Input.Autocomplete.OptionGroup[]>([])
    const loading = ref(false)

    const query = computed(
        () => route.query[searchForm.search.queryParam]?.toString(),
    )

    const placeholder = computed(() => t('solr.placeholder'))

    const submitLabel = computed(() =>
        loading.value ? t('solr.loading') : t('solr.submit'),
    )

    async function onInput(value: string) {
        if (!value) {
            optionGroups.value = []
            return
        }

        const path = searchForm.suggest.url
        const params = {
            [searchForm.suggest.queryParam]: value,
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
                    }),
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

    function getRoute(term: string): RouteLocationRaw {
        const path = searchForm.search.url

        const query = {
            [searchForm.search.queryParam]: term,
        }

        return {
            path,
            query,
        }
    }

    async function search(data: { [key: string]: any }) {
        const term = data[inputName] || '*'

        const route = getRoute(term)

        loading.value = true

        await navigateTo(route)

        loading.value = false
    }

    const submit = handleSubmit(search)

    return {
        inputName,
        loading,
        optionGroups,
        placeholder,
        query,
        submitLabel,
        getRoute,
        onInput: debounce(onInput, 300),
        submit,
    }
}
