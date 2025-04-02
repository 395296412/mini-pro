<template>
    <view class="card-container" :class="customClass">
        <!-- 标题区域 -->
        <view class="card-header" v-if="title || description || statusText">
            <view class="title-area">
                <text class="card-title" v-if="title">{{ title }}</text>
                <text class="card-desc" v-if="description">{{ description }}</text>
            </view>
            <text class="card-status" v-if="statusText">{{ statusText }}</text>
        </view>

        <!-- 内容区域 -->
        <view class="card-content">
            <!-- 进度条作为内容的一部分 -->
            <view v-if="showProgress">
                <van-progress 
                    :color="progressColor"
                    :percentage="progress" 
                    :show-pivot="false" 
                    stroke-width="4px"
                />
                <view class="progress-text flex-between mt-xs">
                    <text class="text-sm text-light">总体进度</text>
                    <text class="text-sm text-bold">{{ progress }}%</text>
                </view>
            </view>
            
            <!-- 默认插槽内容 -->
            <view class="mt-md" v-if="$slots.default">
                <slot></slot>
            </view>
        </view>

        <!-- 课程列表插槽 -->
        <view class="courses-container mt-md">
            <slot name="courses"></slot>
        </view>

        <!-- 底部操作区 -->
        <view class="card-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </view>
    </view>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    // 容器标题
    title: {
      type: String,
      default: ''
    },
    // 容器描述
    description: {
      type: String,
      default: ''
    },
    // 状态文本
    statusText: {
      type: String,
      default: ''
    },
    // 自定义类名
    customClass: {
      type: String,
      default: ''
    },
    // 是否显示进度条
    showProgress: {
      type: Boolean,
      default: true
    },
    // 进度百分比
    progress: {
      type: Number,
      default: 0
    },
    // 进度条颜色
    progressColor: {
      type: String,
      default: 'var(--progress-color)'
    }
  });
</script>

<style lang="scss">
@use '@/assets/styles/index.scss' as styles;

// 容器样式
.card-container {
  background-color: styles.$white;
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  position: relative;
  box-shadow: styles.$shadow-card;
  padding: 4vw;
}

// 标题区域
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
}

.title-area {
  flex: 1;
}

.card-title {
  font-size: styles.$font-size-lg;
  font-weight: styles.$font-weight-bold;
  color: styles.$text-color-primary;
  display: block;
}

.card-desc {
  font-size: styles.$font-size-sm;
  color: styles.$text-color-secondary;
  margin-top: 1vw;
}

.card-status {
  font-size: styles.$font-size-sm;
  color: styles.$text-color-secondary;
}

// 底部区域
.card-footer {
  margin-top: 4vw;
}

// 课程列表容器
.courses-container {
  display: flex;
  flex-direction: column;
  gap: 3vw;
}

// 工具类
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// 文本样式
.text-sm {
  font-size: styles.$font-size-sm;
}

.text-light {
  color: styles.$text-color-light;
}

.text-bold {
  font-weight: bold;
}

.mt-xs {
  margin-top: 1vw;
}

.mt-sm {
  margin-top: 2vw;
}

.mt-md {
  margin-top: 3vw;
}
</style>
