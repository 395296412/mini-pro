module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/multi-word-component-names': 'off',
    // 自定义规则：禁止使用固定像素值
    'no-restricted-properties': [
      'warn',
      {
        object: 'style',
        property: 'height',
        message: '避免使用固定高度，请使用min-height或相对单位'
      },
      {
        object: 'style',
        property: 'width',
        message: '避免使用固定宽度，请使用相对单位或弹性布局'
      }
    ],
    // 自定义规则：鼓励使用相对单位
    'vue/attribute-hyphenation': ['error', 'always']
  }
}
