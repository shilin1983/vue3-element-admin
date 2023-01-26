import variables from '@/assets/styles/variables.module.less'

const useDesign = () => {
  const lessVariables = variables

  const getPrefixCls = (scope: string): string => `${lessVariables.namespace}-${scope}`

  return {
    variables: lessVariables,
    getPrefixCls
  }
}

export { useDesign }
