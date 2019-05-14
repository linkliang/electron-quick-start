import ko from 'knockout'

import viewModel from './files-viewmodel.ts'

// read template as string
import template from "raw-loader!./files-template.html"

ko.components.register('leanux-files', {
    viewModel,
    template
})