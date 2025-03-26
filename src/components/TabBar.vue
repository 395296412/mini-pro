<template>
  <van-tabbar :active="activeTab" @change="onTabChange" fixed placeholder safe-area-inset-bottom>
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search">发现</van-tabbar-item>
    <van-tabbar-item icon="friends-o">社区</van-tabbar-item>
    <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { ROUTES } from '@/constants/routes';

const props = defineProps({
  active: {
    type: Number,
    default: 0
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
    case 1: // 发现
      if (getCurrentPage() !== ROUTES.MAIN.DISCOVER) {
        uni.switchTab({ url: ROUTES.MAIN.DISCOVER });
      }
      break;
    case 2: // 社区
      if (getCurrentPage() !== ROUTES.MAIN.COMMUNITY) {
        uni.switchTab({ url: ROUTES.MAIN.COMMUNITY });
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
@use '@/assets/styles/variables.scss' as variables;

// 底部导航栏样式可以在这里自定义
.van-tabbar {
  background-color: variables.$white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.van-tabbar-item--active {
  color: variables.$primary-color;
}
</style>
