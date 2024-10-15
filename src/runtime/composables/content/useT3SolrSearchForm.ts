import { type Ref, computed, ref } from 'vue'
import { type T3Model, type T3SolrModel, useRoute, useT3Api } from '#imports'
import { type RouteLocationRaw } from 'vue-router'
import { debounce } from 'perfect-debounce'
import { navigateTo } from '#app'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export function useT3SolrSearchForm(
    searchForm: Ref<T3SolrModel.Typo3.SearchForm>,
    defaultValueProp?: Ref<string | undefined>,
) {
    const inputName = 'search_term'
    const api = useT3Api()
    const route = useRoute()
    const { handleSubmit } = useForm()
    const { t } = useI18n()
    const optionGroups = ref<T3Model.Input.Autocomplete.OptionGroup[]>([])
    const loading = ref(false)

    const query = computed(() =>
        route.query[searchForm.value.search.queryParam]?.toString(),
    )

    const defaultValue = computed<T3Model.Input.Autocomplete.Option>(() => ({
        key: '',
        label: defaultValueProp?.value ?? query.value ?? '',
    }))

    const placeholder = computed(() => t('solr.placeholder'))

    const submitLabel = computed(() =>
        loading.value ? t('solr.loading') : t('solr.submit'),
    )

    async function onInput(value: T3Model.Input.Autocomplete.Option) {
        if (!value.label) {
            optionGroups.value = []
            return
        }

        const path = searchForm.value.suggest.url
        const params = {
            [searchForm.value.suggest.queryParam]: value.label,
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
                label: t('solr.topResults'),
                name: 'links',
                options: (suggestions.documents ?? []).map((document) => ({
                    key: document.link ? document.link : document.title,
                    label: document.title,
                    link: document.link,
                })),
            },
        ]
    }

    function getRoute(term: string): RouteLocationRaw {
        const path = searchForm.value.search.url

        const query = {
            [searchForm.value.search.queryParam]: term,
        }

        return {
            path,
            query,
        }
    }

    async function search(data: { [key: string]: any }) {
        const term = data[inputName].label || '*'

        const route = getRoute(term)

        loading.value = true

        await navigateTo(route)

        loading.value = false
    }

    const submit = handleSubmit(search)

    return {
        defaultValue,
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
