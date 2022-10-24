<script lang="ts">
export { default } from '#nuxt-typo3-solr/components/T3CeSolrPiSearch.vue'
</script>

<style lang="scss">
.t3-ce-solr-search {
    &__submit {
        padding: 0 1rem;

        &::after {
            content: '🔎︎';
        }

        &--loading {
            &::after {
                content: '...';
            }
        }
    }

    .t3-autocomplete {
        &__options {
            a {
                color: green;
            }
        }
    }

    &__submit-label {
        display: none;
    }
}
</style>
