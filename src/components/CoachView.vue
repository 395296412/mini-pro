<template>
  <view class="coach-view">
    <!-- 今日课程标题 -->
    <view class="section-header flex-between">
      <text class="section-title">今日安排</text>
      <text class="text-sm text-secondary">{{ todayClasses.length }}节课</text>
    </view>
    
    <!-- 课程列表 - 每个课程作为独立卡片 -->
    <card
      v-for="(classItem) in todayClasses" 
      :key="classItem.id"
      :title="classItem.title"
      :student-name="classItem.studentName"
      :start-time="classItem.startTime"
      :status="classItem.status"
      :status-text="'训练中'"
      :duration="classItem.duration"
      :location="classItem.location"
      :progress="classItem.progress"
      :remaining-lessons="classItem.remainingLessons"
      :show-status-button="true"
      @status-change="handleStatusChange(classItem.id, $event)"
      @complete="handleClassComplete(classItem.id)"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import Card from './Card.vue';

// 生成唯一ID的函数
const generateId = (() => {
  let id = 0;
  return () => id++;
})();

// 今日课程数据
const todayClasses = ref([
  { 
    id: generateId(),
    studentName: '李学员', 
    title: '增肌训练1', 
    startTime: '10:00', 
    status: '进行中',
    duration: 45,
    location: '私教区域',
    progress: 75,
    remainingLessons: 8
  },
  { 
    id: generateId(),
    studentName: '王学员', 
    title: '减脂训练2', 
    startTime: '14:00', 
    status: '待开始',
    duration: 90,
    location: 'A区训练室',
    progress: 42,
    remainingLessons: 12
  },
  { 
    id: generateId(),
    studentName: '王学员2', 
    title: '减脂训练3', 
    startTime: '14:00', 
    status: '待开始',
    duration: 90,
    location: 'A区训练室',
    progress: 42,
    remainingLessons: 12
  },
  { 
    id: generateId(),
    studentName: '王学员3', 
    title: '减脂训练4', 
    startTime: '14:00', 
    status: '待开始',
    duration: 90,
    location: 'A区训练室',
    progress: 42,
    remainingLessons: 12
  },
  { 
    id: generateId(),
    studentName: '王学员4', 
    title: '减脂训练5', 
    startTime: '14:00', 
    status: '待开始',
    duration: 90,
    location: 'A区训练室',
    progress: 42,
    remainingLessons: 12
  },
  { 
    id: generateId(),
    studentName: '王学员5', 
    title: '减脂训练6', 
    startTime: '14:00', 
    status: '待开始',
    duration: 90,
    location: 'A区训练室',
    progress: 42,
    remainingLessons: 12
  },
  { 
    id: generateId(),
    studentName: '王学员6', 
    title: '减脂训练7', 
    startTime: '14:00', 
    status: '待开始',
    duration: 90,
    location: 'A区训练室',
    progress: 42,
    remainingLessons: 12
  }
]);

// 处理状态变更
const handleStatusChange = (id, newStatus) => {
  const index = todayClasses.value.findIndex(item => item.id === id);
  if (index !== -1) {
    todayClasses.value[index].status = newStatus;
  }
};

// 处理课程完成
const handleClassComplete = (id) => {
  const index = todayClasses.value.findIndex(item => item.id === id);
  if (index !== -1) {
    // 将课程状态设置为已完成
    todayClasses.value[index].status = '已完成';
    // 延迟移除，给用户一个视觉反馈
    setTimeout(() => {
      todayClasses.value.splice(index, 1);
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;

.coach-view {
  padding: 0 16px; // 添加水平内边距
}

// 区域标题样式
.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-size: styles.$font-size-lg;
  font-weight: bold;
  color: styles.$text-color-primary;
}

// 文本样式
.text-sm{
  font-size :styles.$font-size-sm;
}

.text-secondary{
  color: styles.$text-color-secondary;
}
</style>
