import { defu } from 'defu'
import * as T3SolrModel from '../models'
import { useAppConfig } from '#imports'

type Config = T3SolrModel.Config.AppConfigInput &
    T3SolrModel.Config.AppConfigDefaults

export function useT3SolrConfig(): Config {
    const appConfigDefaults: T3SolrModel.Config.AppConfigDefaults = {
        pagination: {
            position: 'bottom',
        },
    }

    const appConfig = useAppConfig()

    const config = defu(appConfig.typo3Solr, appConfigDefaults)

    return config
}
