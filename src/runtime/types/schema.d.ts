import type * as T3SolrModel from '../models'
import { CONFIG_KEY } from '../../module'

declare module '@nuxt/schema' {
    interface AppConfigInput {
        [CONFIG_KEY]: T3SolrModel.Config.AppConfigInput
    }

    interface AppConfig extends AppConfigInput {}
}
// It is always important to ensure you import/export something when augmenting a type
export {}
