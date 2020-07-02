import layoutAside from '@/components/layout-aside'
import layoutHeader from '@/components/layout-header'
import breadCrumb from '@/components/common/bread-crumb'
export default {
  install: function (Vue) {
    Vue.component('layoutAside', layoutAside)
    Vue.component('layoutHeader', layoutHeader)
    Vue.component('berad-crumb', breadCrumb)
  }
}
