import ko from 'knockout'

import viewModel from './clickcounter-viewmodel'

// read template as string
import template from "raw-loader!./clickcounter-template.html"

ko.components.register('leanux-clickcounter', {
    viewModel,
    template
})