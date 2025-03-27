# FitPro响应式设计规范

## 布局原则
1. **避免固定尺寸**：
   - 不使用固定像素高度/宽度，而是使用相对单位（vw, vh, em, rem）或弹性布局
   - 对于容器高度，优先使用min-height而非固定height
   - 对于内边距，使用vw单位或相对单位代替固定像素值

2. **弹性布局优先**：
   - 使用flex布局实现元素对齐和分布
   - 通过align-items和justify-content控制元素对齐方式
   - 避免使用绝对定位，优先考虑弹性布局

3. **适配不同设备**：
   - 头部区域内边距使用视窗相对单位：padding-top: 8vw; padding-bottom: 2vw;
   - 内容区域使用相对于字体的单位：min-height: 2.5em;
   - 按钮内边距使用em单位：padding: 0 0.75em;

## 组件适配
1. **Vant组件适配**：
   - 避免为Vant组件设置固定高度
   - 使用custom-class和custom-style传递相对单位样式
   - 使用:deep()选择器覆盖组件内部样式时也应使用相对单位

2. **文本适配**：
   - 使用相对字体大小（em, rem）
   - 通过类名（text-sm, text-md, text-lg）控制字体大小，而非直接设置固定像素值

## 实践示例

### 头部区域响应式布局
```vue
<template>
  <view class="header p-md">
    <view class="header-content">
      <view class="weather-info">
        <text class="text-md text-bold">{{ userStore.currentWeather }}</text>
      </view>
      <view class="role-switch-area">
        <van-button 
          custom-class="role-switch-btn" 
          round
          size="small"
          color="rgba(0, 0, 0, 0.1)"
        >
          <text class="text-sm">切换角色</text>
        </van-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  padding-top: 8vw; // 使用视窗宽度的百分比
  padding-bottom: 2vw;
  
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 2.5em; // 使用相对于字体大小的单位
  }
  
  .role-switch-btn {
    padding: 0 0.75em;
  }
}
</style>
```

### 卡片组件响应式布局
```vue
<template>
  <van-cell-group inset custom-class="responsive-card">
    <van-cell border="false">
      <template #title>
        <view class="card-content">
          <text class="text-md text-bold">卡片标题</text>
          <text class="text-sm">卡片内容</text>
        </view>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style lang="scss" scoped>
.responsive-card {
  margin: 3vw;
  border-radius: 1rem;
  
  .card-content {
    padding: 0.5em 0;
  }
}
</style>
```

## 测试与验证
- 在不同分辨率设备上测试布局
- 确保在小屏设备上内容不会溢出或被截断
- 验证在大屏设备上布局不会过度拉伸
