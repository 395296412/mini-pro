<template>
  <view class="tab-bar-wrapper">
    <van-tabbar 
      :active="activeTab" 
      @change="onTabChange" 
      fixed
      safe-area-inset-bottom
      custom-class="custom-tabbar"
      :active-color="activeColor"
      :inactive-color="inactiveColor"
    >
      <van-tabbar-item icon="wap-home" />
      <van-tabbar-item icon="fire" />
      <van-tabbar-item icon="wap-nav" />
      <van-tabbar-item icon="contact" />
    </van-tabbar>
  </view>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { ROUTES } from '@/constants/routes';

const props = defineProps({
  active: {
    type: Number,
    default: 0
  },
  activeColor: {
    type: String,
    default: 'var(--primary-color)'// 活动状态下的颜色
  },
  inactiveColor: {
    type: String,
    default: 'var(--dark-color)' // 不活动状态下的颜色
  }
});

const emit = defineEmits(['change']);

// 底部导航栏激活状态
const activeTab = ref(props.active);

// 处理底部导航切换
const onTabChange = (event) => {
  activeTab.value = event.detail;
  emit('change', event.detail);
  
  // 根据选中的标签进行页面跳转
  switch (event.detail) {
    case 0: // 首页
      if (getCurrentPage() !== ROUTES.MAIN.HOME) {
        uni.switchTab({ url: ROUTES.MAIN.HOME });
      }
      break;
    case 1: // 训练
      if (getCurrentPage() !== ROUTES.MAIN.TRAINING) {
        uni.switchTab({ url: ROUTES.MAIN.TRAINING });
      }
      break;
    case 2: // 数据
      if (getCurrentPage() !== ROUTES.MAIN.DATA) {
        uni.switchTab({ url: ROUTES.MAIN.DATA });
      }
      break;
    case 3: // 我的
      if (getCurrentPage() !== ROUTES.MAIN.PROFILE) {
        uni.switchTab({ url: ROUTES.MAIN.PROFILE });
      }
      break;
  }
};

// 获取当前页面路径
const getCurrentPage = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return '/' + currentPage.route;
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;

/* 微信小程序不支持:deep()选择器，改为使用全局选择器 */
.custom-tabbar {
  height: 56px;
  display: flex;
  align-items: center;
  background-color: styles.$white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.tab-bar-wrapper {
  width: 100%;
  height: 56px;
}

.van-tabbar-item {
  padding: 0;
}

.van-tabbar-item__icon {
  margin-bottom: 0;
  font-size: 22px;
}

.van-tabbar-item__text {
  display: none;
}

/* 微信小程序不支持v-bind()语法，改为使用固定颜色 */
.van-tabbar-item--active {
  color: styles.$text-color-primary;
}
</style>
