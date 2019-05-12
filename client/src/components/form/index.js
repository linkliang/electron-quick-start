import ko from 'knockout'

import viewModel from './form-viewmodel'

// read template as string
import template from "raw-loader!./form-template.html"

ko.components.register('leanux-form', {
    viewModel,
    template
})