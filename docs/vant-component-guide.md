# Vant组件使用指南

## 组件选择优先级
1. **优先使用Vant组件**：在开发新组件或修改现有组件时，必须首先查询Vant组件库，确认是否有满足需求的组件。
2. **组件选择流程**：
   - 第一步：查询Vant组件库是否有满足需求的组件
   - 第二步：如有，直接使用Vant组件，可根据需要进行样式定制
   - 第三步：如无，基于Vant组件进行二次封装
   - 第四步：只有在Vant组件无法满足需求时，才考虑创建自定义组件

## Vant组件使用准则
1. **保持原生功能**：使用Vant组件时，应尽量保留其原生功能和API
2. **样式定制**：通过custom-class属性和CSS变量覆盖默认样式，而不是直接修改组件内部结构
3. **插槽使用**：优先使用Vue 3的v-slot语法（如`<template #slotName>`）而非旧的slot属性
4. **属性传递**：使用v-bind传递动态属性，保持代码的灵活性

## 常用Vant组件参考
- **布局类**：
  - `van-cell`, `van-cell-group`: 用于列表项和卡片
  - `van-grid`, `van-grid-item`: 用于网格布局
  - `van-row`, `van-col`: 用于栅格布局
  
- **表单类**：
  - `van-field`: 输入框
  - `van-button`: 按钮
  - `van-checkbox`, `van-radio`: 复选框和单选框
  - `van-switch`: 开关
  
- **展示类**：
  - `van-image`: 图片
  - `van-progress`: 进度条
  - `van-tag`: 标签
  - `van-card`: 卡片
  
- **导航类**：
  - `van-nav-bar`: 导航栏
  - `van-tabbar`: 底部标签栏
  - `van-sidebar`: 侧边导航
  
- **反馈类**：
  - `van-dialog`: 对话框
  - `van-toast`: 轻提示
  - `van-action-sheet`: 动作面板

## 样式定制最佳实践

### 使用custom-class
```vue
<van-button 
  custom-class="my-custom-button" 
  type="primary"
>
  自定义按钮
</van-button>

<style lang="scss" scoped>
.my-custom-button {
  border-radius: 1rem;
  font-weight: bold;
}
</style>
```

### 使用:deep()选择器
```vue
<van-cell-group custom-class="custom-group">
  <van-cell title="标题" value="内容" />
</van-cell-group>

<style lang="scss" scoped>
.custom-group {
  margin: 1rem;
  
  :deep(.van-cell) {
    padding: 0.75rem 1rem;
  }
  
  :deep(.van-cell__title) {
    font-weight: bold;
  }
}
</style>
```

### 使用CSS变量
```vue
<style lang="scss">
page {
  --button-primary-background-color: #00c389;
  --button-primary-border-color: #00c389;
  --cell-background-color: #f8f8f8;
  --nav-bar-background-color: #00c389;
  --nav-bar-title-text-color: #ffffff;
}
</style>
```

## 常见问题与解决方案

### 1. 组件样式覆盖问题
**问题**: Vant组件样式无法被覆盖
**解决方案**: 
- 确保使用了`:deep()`选择器
- 提高CSS选择器的优先级
- 使用`!important`（谨慎使用）

### 2. 布局不一致问题
**问题**: 不同设备上布局显示不一致
**解决方案**:
- 使用相对单位而非固定像素值
- 遵循响应式设计规范
- 使用flex布局确保对齐

### 3. 组件事件处理
**问题**: 组件事件未正确触发
**解决方案**:
- 确保使用正确的事件名称（如`@click`而非`@tap`）
- 检查事件处理函数是否正确定义
- 使用事件修饰符如`.stop`防止事件冒泡

## 自定义组件规范
只有在确认Vant组件库无法满足需求时，才可以创建自定义组件，并且需要遵循以下规范：
1. 组件名使用PascalCase命名法
2. 样式使用scoped属性隔离
3. 使用SCSS预处理器和项目定义的变量
4. 组件应当是原子化的，专注于单一功能
