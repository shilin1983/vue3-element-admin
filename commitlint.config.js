module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'chore', // 构建过程或辅助工具的变动
        'ci', // 持续集成修改
        'docs', // 文档(documentation)
        'feat', // 新功能(feature)
        'fix', // 修补bug
        'mod', // 不确定分类的修改
        'perf', // 优化相关，比如提升性能、体验
        'refactor', // 重构(即不是新增功能，也不是修改BUG的代码)
        'release', // 版本发布
        'revert', // 回滚到上一个版本
        'style', // 格式、样式(不影响代码运行的变动)
        'test', // 添加测试
        'types', // 类型修改
        'wip', // 开发中
        'workflow' // 工作流改进
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}
