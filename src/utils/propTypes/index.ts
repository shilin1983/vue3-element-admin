import { createTypes, VueTypesInterface } from 'vue-types'

type PropTypes = VueTypesInterface & {}

const propTypes = createTypes({}) as PropTypes

export { propTypes }
