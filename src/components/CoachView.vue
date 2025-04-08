<template>
  <view class="coach-view">
    <!-- 今日课程标题 -->
    <view class="section-header flex-between">
      <text class="section-title">今日安排</text>
      <text class="text-sm text-secondary">{{ todayClasses.length }}节课</text>
    </view>

    <!-- 课程列表 - 每个课程作为独立卡片 -->
    <view class="card-container">
      <transition-group name='card-fade' tag="view" class="class-list">
        <view
            v-for="(classItem,index) in todayClasses"
            :key="classItem.id"
            class="card-item"
            :style="{ marginBottom: index !== todayClasses.length - 1 ? 'var(--card-vertical-gap)' : '0' }"
        >
          <card
              :title="classItem.title"
              :student-name="classItem.studentName"
              :start-time="classItem.startTime"
              :status="classItem.status"
              :duration="classItem.duration"
              :location="classItem.location"
              :progress="classItem.progress"
              :remaining-lessons="classItem.remainingLessons"
              :show-status-button="true"
              :style="{ opacity: classItem.opacity !== undefined ? classItem.opacity : 1 }"
              :role="USER_ROLE.COACH"
              @status-change="handleStatusChange(classItem.id, $event)"
              @complete="handleClassComplete(classItem.id)"
          />
        </view>
      </transition-group>
    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue';
import Card from './Card.vue';
import {USER_ROLE, COURSE_STATUS} from '@/constants/status';

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
    status: COURSE_STATUS.ACTIVE,
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
    status: COURSE_STATUS.PENDING,
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
    status: COURSE_STATUS.PENDING,
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
    status: COURSE_STATUS.PENDING,
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
    status: COURSE_STATUS.PENDING,
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
    status: COURSE_STATUS.PENDING,
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
    status: COURSE_STATUS.PENDING,
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
    todayClasses.value[index].status = COURSE_STATUS.COMPLETED;

    // 创建一个逐渐减少透明度的动画效果
    let opacity = 1;
    const fadeInterval = setInterval(() => {
      opacity -= 0.05; // 每次减少0.05
      if (opacity <= 0) {
        clearInterval(fadeInterval);
        // 当透明度降到0时移除卡片
        todayClasses.value.splice(index, 1);
      } else {
        // 更新透明度值
        todayClasses.value[index].opacity = opacity;
      }
    }, 35); // 大约700ms内完成渐变(0.05 * 20 ≈ 1)
  }
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;

.coach-view {
  padding: $spacing-lg; // 使用相对单位
  --card-vertical-gap: #{$spacing-lg}; // 卡片垂直间距变量

  .section-header {
    margin-bottom: $spacing-md;
  }
}

.section-title {
  font-size: styles.$font-size-lg;
  font-weight: bold;
  color: styles.$text-color-primary;
}

// 卡片容器样式
.card-container {
  margin-bottom: var(--card-vertical-gap); // 使用变量控制间距
}

// 课程列表容器
.class-list {
  display: flex;
  flex-direction: column;
}
</style>
