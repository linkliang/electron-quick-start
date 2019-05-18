import ko from 'knockout'

import {FileSyncViewModel as viewModel} from './filesync-viewmodel'

// read template as string
import template from "raw-loader!./filesync-template.html"

ko.components.register('leanux-filesync', {
    viewModel,
    template
})