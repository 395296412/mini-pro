<template>
    <view 
      class="class-card"
      :class="{'active-class': status === '进行中'}"
    >
      <view class="class-header flex-between">
        <view>
          <text class="class-title">{{ title }}</text>
          <view class="class-subtitle">{{ studentName }} - {{ location }}</view>
        </view>
        <view v-if="showStatusButton" class="status-button" @click="handleStatusChange">
        <van-icon 
          :name="statusIconName" 
          :color="statusIconColor" 
          size="24px" 
          class="status-icon" 
        />
        <text class="status-button-text" :style="{color: statusIconColor}">{{ statusButtonText }}</text>
      </view>
      <text v-else class="time-display">{{ startTime }}</text>
      </view>
          
      <view class="class-info">
        <view class="info-item">
          <van-icon name="clock-o" size="16px" class="info-icon" />
          <text class="text-normal">{{ duration }}分钟</text>
        </view>
        <view class="info-item">
          <van-icon name="location-o" size="16px" class="info-icon" />
          <text class="text-normal">{{ location }}</text>
        </view>
      </view>
      
      <!-- 课程进度 -->
      <view class="mt-sm" v-if="showProgress">
        <van-progress 
          :color="progressColor"
          :percentage="progress" 
          :show-pivot="false" 
          stroke-width="4px"
        />
        <view class="progress-text flex-between mt-xs">
          <text class="text-sm text-light">剩余课时</text>
          <text class="text-sm text-bold">{{ remainingLessons }}节课</text>
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    // 课程标题
    title: {
      type: String,
      required: true
    },
    // 学员姓名
    studentName: {
      type: String,
      required: true
    },
    // 开始时间
    startTime: {
      type: String,
      required: false
    },
    // 状态按钮
    statusButton:{
      type: String,
      default: '待开始'
    },
    // 是否显示状态按钮
    showStatusButton: {
      type: Boolean,
      default: false
    },
    // 状态（进行中/待开始等）
    status: {
      type: String,
      default: '待开始'
    },
    // 状态文本（可自定义显示文本，如"RUN"）
    statusText: {
      type: String,
      default: 'RUN'
    },
    // 课程时长（分钟）
    duration: {
      type: Number,
      required: true
    },
    // 位置
    location: {
      type: String,
      required: false
    },
    // 是否显示进度
    showProgress: {
      type: Boolean,
      default: true
    },
    // 进度百分比
    progress: {
      type: Number,
      default: 0
    },
    // 剩余课时
    remainingLessons: {
      type: Number,
      default: 0
    },
    // 进度条颜色
    progressColor: {
      type: String,
      default: 'var(--progress-color)'
    }
  });

    const emit = defineEmits(['statusChange', 'complete']);   

    // 当前状态（内部状态，用于按钮状态切换）
    const currentStatus = ref(props.status);

    // 根据状态计算图标名称
    const statusIconName = computed(() => {
    switch(currentStatus.value) {
        case '进行中':
        return 'play-circle-o';
        case '已完成':
        return 'play-circle-o';
        default:
        return 'play-circle-o';
    }
    });

    // 根据状态计算图标颜色
    const statusIconColor = computed(() => {
    switch(currentStatus.value) {
        case '进行中':
        return 'var(--dark-color)';
        case '已完成':
        return 'var(--dark-color)';
        default:
        return 'var(--dark-color)';
    }
    });

    // 根据状态计算按钮文本
    const statusButtonText = computed(() => {
    switch(currentStatus.value) {
        case '进行中':
        return '完成';
        case '已完成':
        return '结束';
        default:
        return '开始';
    }
    });

    // 处理状态变更
    const handleStatusChange = () => {
        if (currentStatus.value === '待开始') {
            currentStatus.value = '进行中';
            emit('statusChange', '进行中');
        } else if (currentStatus.value === '进行中') {
            currentStatus.value = '已完成';
            emit('statusChange', '已完成');
            // 通知父组件该课程已完成，需要移除
            emit('complete');
        } else if (currentStatus.value === '已完成') {
            // 已经是完成状态，直接触发移除事件
            emit('complete');
        }
        };
  </script>
  
  <style lang="scss" scoped>
  @use '@/assets/styles/index.scss' as styles;
  
  // 课程卡片样式
  .class-card {
    background-color: styles.$white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    
    &.active-class {
      background-color: styles.$primary-color; // 活跃课程使用浅绿色背景
    }
  }
  
  .class-header {
    margin-bottom: 12px;
  }
  
  .class-title {
    font-size: styles.$font-size-md;
    font-weight: bold;
    color: styles.$text-color-primary;
    display: block;
  }
  
  .class-subtitle {
    font-size: styles.$font-size-sm;
    color: styles.$text-color-secondary;
    margin-top: 4px;
  }
  
  .time-display {
    font-size: styles.$font-size-lg;
    color: styles.$dark-color;
    font-weight: bold;
  }

    // 状态按钮样式
    .status-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent; /* 禁用iOS上的点击高亮 */
    user-select: none; /* 禁止选择文本 */
    }

    .status-icon {
    margin-bottom: 4px;
    }

    .status-button-text {
    font-size: styles.$font-size-sm;
    font-weight: 500;
    }
  
  .class-info {
    display: flex;
    align-items: center;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    margin-right: 16px;
    font-size: styles.$font-size-sm;
    color: styles.$text-color-secondary;
  }
  
  .info-icon {
    margin-right: 4px;
  }
  
  .class-status {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: transparent;
    border-radius: 12px;
    padding: 2px 8px;
  }
  
  .status-text {
    font-size: styles.$font-size-lg;
    color: styles.$dark-color;
  }
  
  // 文本样式
  .text-normal {
    font-size: styles.$font-size-sm;
    color: styles.$text-color-secondary;
  }
  
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
    margin-top: 4px;
  }
  
  .mt-sm {
    margin-top: 8px;
  }
  </style>