import { AppConfigInput } from '.'

type Pagination = AppConfigInput['pagination'] & {
    position: NonNullable<NonNullable<AppConfigInput['pagination']>['position']>
}

export interface AppConfigDefaults {
    pagination: Pagination
}
