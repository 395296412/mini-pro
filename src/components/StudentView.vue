<template>
  <view class="student-view">

    <!-- 训练计划卡片 -->
    <view class="card mb-gap">
      <card-containers
          :title="trainingPlan.title"
          :progress="trainingPlan.progress"
          :stats="trainingPlan.stats"
      >
        <!-- 统计信息 -->
        <view class="stats-row">
          <view class="stat-item" v-for="(stat,index) in trainingPlan.stats" :key="index">
            <text class="stat-value">{{ stat.value }}</text>
            <text class="stat-label">{{ stat.label }}</text>
          </view>
        </view>

        <!-- 课程列表 - 使用Card组件 -->
        <template #courses>
          <view class="flex-column">
            <transition-group name="card-list" tag="view" class="card-list flex-column">
              <view
                  v-for="(course, index) in sortedCourses"
                  :key="course.id"
                  :style="{ marginBottom: index !== sortedCourses.length - 1 ? 'var(--card-vertical-gap)' : '0' }"
                  class="course-wrapper"
                  :class="{
                  'course-active': course.status === COURSE_STATUS.ACTIVE,
                  'course-completed': course.status === COURSE_STATUS.COMPLETED,
                  'course-pending': course.status === COURSE_STATUS.PENDING || !course.status
                }"
              >
                <card
                    :role="USER_ROLE.STUDENT"
                    :status="course.status"
                    :title="course.title"
                    :student-name="course.description"
                    :start-time="course.timeRange"
                    :duration="course.duration || 60"
                    :location="course.location || '训练区'"
                    :show-status-button="showStatusButtons"
                    :show-progress="course.showProgress"
                    :progress="course.progress"
                    :style="{ opacity: course.opacity !== undefined ? course.opacity : 1 }"
                    @status-change="handleStatusChange(course.id, $event)"
                    @complete="handleCourseComplete(course.id)"
                />
              </view>
            </transition-group>
          </view>
        </template>
      </card-containers>
    </view>

    <!-- 教练卡片 -->
    <view class="card coach-card mb-gap">
      <view class="flex align-center">
        <image class="coach-avatar" :src="coach.avatar" mode="aspectFill"></image>
        <view class="ml-md">
          <text class="text-md text-bold">{{ coach.name }}</text>
          <text class="text-sm text-light">{{ coach.description }}</text>
        </view>
        <view class="flex-1"></view>
        <view class="add-button button-scale-animation" @click="navigateToBooking">
          <van-icon name="plus" size="24px" color="var(--primary-color)"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref, computed} from 'vue';
import Card from './Card.vue';
import CardContainers from './CardContainers.vue';
import {USER_ROLE, COURSE_STATUS} from '@/constants/status';

// 生成唯一ID的函数
const generateId = (() => {
  let id = 0;
  return () => id++;
})();

// 是否显示状态按钮
const showStatusButtons = ref(true);

// 课程数据
const courses = ref([
  {
    id: generateId(),
    title: '全身燃脂 HIIT',
    timeRange: '15:00 - 16:00',
    description: '3个动作/约25分钟',
    location: '健身区A',
    status: COURSE_STATUS.IN_PROGRESS,
    role: 2
  },
  {
    id: generateId(),
    title: '增肌训练',
    timeRange: '10:00 - 11:30',
    description: '5个动作/约90分钟',
    location: '私教区域',
    status: COURSE_STATUS.PENDING,
    role: 2
  },
  {
    id: generateId(),
    title: '拉伸放松1',
    timeRange: '18:00 - 18:30',
    description: '4个动作/约30分钟',
    location: '瑜伽区',
    status: COURSE_STATUS.COMPLETED,
    completeTime: '2025-04-01T18:30:00',
  }
  ,
  {
    id: generateId(),
    title: '拉伸放松2',
    timeRange: '18:00 - 18:30',
    description: '4个动作/约30分钟',
    location: '瑜伽区',
    status: COURSE_STATUS.COMPLETED,
    completeTime: '2025-04-01T18:30:00',
    role: 2
  },
  {
    id: generateId(),
    title: '拉伸放松3',
    timeRange: '18:00 - 18:30',
    description: '4个动作/约30分钟',
    location: '瑜伽区',
    status: COURSE_STATUS.COMPLETED,
    completeTime: '2025-04-01T18:30:00',
    role: 2
  },
  {
    id: generateId(),
    title: '拉伸放松4',
    timeRange: '18:00 - 18:30',
    description: '4个动作/约30分钟',
    location: '瑜伽区',
    status: COURSE_STATUS.COMPLETED,
    completeTime: '2025-04-01T18:30:00',
    role: 2
  },
  {
    id: generateId(),
    title: '拉伸放松5',
    timeRange: '18:00 - 18:30',
    description: '4个动作/约30分钟',
    location: '瑜伽区',
    status: COURSE_STATUS.COMPLETED,
    completeTime: '2025-04-01T18:30:00',
    role: 2
  },
  {
    id: generateId(),
    title: '拉伸放松6',
    timeRange: '18:00 - 18:30',
    description: '4个动作/约30分钟',
    location: '瑜伽区',
    status: COURSE_STATUS.COMPLETED,
    completeTime: '2025-04-01T18:30:00',
    role: 2
  }
]);

// 按状态和时间排序课程
const sortedCourses = computed(() => {
  return [...courses.value].sort((a, b) => {
    // 当前课程（进行中）排在最前面
    if (a.status === COURSE_STATUS.IN_PROGRESS && b.status !== COURSE_STATUS.IN_PROGRESS) return -1;
    if (a.status !== COURSE_STATUS.IN_PROGRESS && b.status === COURSE_STATUS.IN_PROGRESS) return 1;

    // 已完成课程按时间倒序
    if (a.status === COURSE_STATUS.COMPLETED && b.status === COURSE_STATUS.COMPLETED) {
      return new Date(b.completeTime || 0) - new Date(a.completeTime || 0);
    }

    // 待开始课程按开始时间正序
    if ((a.status === COURSE_STATUS.PENDING || !a.status) && (b.status === COURSE_STATUS.PENDING || !b.status)) {
      // 将时间字符串转换为可比较的格式
      const aTime = a.timeRange.split(' - ')[0].split(':').map(Number);
      const bTime = b.timeRange.split(' - ')[0].split(':').map(Number);

      if (aTime[0] !== bTime[0]) return aTime[0] - bTime[0]; // 比较小时
      return aTime[1] - bTime[1]; // 比较分钟
    }

    return 0;
  });
});

// 训练计划数据
const trainingPlan = ref({
  title: '增肌强化 · 第4周',
  progress: 65,
  stats: [
    {label: '完成课程', value: '12节'},
    {label: '体重变化', value: '+3.2kg'},
    {label: '体脂率', value: '-1.8%'}
  ]
});

// 教练信息
const coach = ref({
  name: '王教练',
  description: '私教 · 5年经验',
  avatar: '/static/images/logo.png'
});

// 处理状态变更
const handleStatusChange = (id, newStatus) => {
  const index = courses.value.findIndex(item => item.id === id);
  if (index !== -1) {
    courses.value[index].status = newStatus;

    // 如果变为进行中状态，可以添加高亮动画
    if (newStatus === COURSE_STATUS.IN_PROGRESS) {
      // 这里可以添加高亮动画逻辑
    }
  }
};

// 处理课程完成
const handleCourseComplete = (id) => {
  const index = courses.value.findIndex(item => item.id === id);
  if (index !== -1) {
    // 将课程状态设置为已完成
    courses.value[index].status = COURSE_STATUS.COMPLETED;
    // 记录完成时间
    courses.value[index].completeTime = new Date().toISOString();
    // 创建一个逐渐减少透明度的动画效果
    let opacity = 1;
    const fadeInterval = setInterval(() => {
      opacity -= 0.05; // 每次减少0.05
      if (opacity <= 0) {
        clearInterval(fadeInterval);
        // 重置透明度，让排序后的动画正常显示
        courses.value[index].opacity = 1;
      } else {
        // 更新透明度值
        courses.value[index].opacity = opacity;
      }
    }, 35); // 大约700ms内完成渐变
  }
};

// 跳转到约课页面
const navigateToBooking = () => {
  uni.navigateTo({
    url: '/pages/booking/index'
  });
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;

.student-view {
  padding: $spacing-lg; // 相对单位
  --card-vertical-gap: #{$spacing-lg}; // 卡片垂直间距变量

  .course-wrapper {
    transition: border-color $transition-normal;
    border-left-width: 0.4em;

    &.course-active {
      border-left-color: $primary-color;
    }
  }
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.card-list {
  display: flex;
  flex-direction: column;
}

.mb-gap {
  margin-bottom: var(--card-vertical-gap); // 使用变量控制间距
}

// 统计数据横向布局
.stats-row {
  display: flex;
  gap: 2vw; // 增加项间距
  margin-bottom: 3vw; // 与下方内容保持间距
}

.stat-item {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.stat-value {
  font-size: styles.$font-size-xl;
  font-weight: bold;
  color: styles.$primary-color;
  display: block;
}

.stat-label {
  font-size: styles.$font-size-sm;
  color: styles.$text-color-secondary;
  margin-top: 0.25em;
}

// 教练头像
.coach-avatar {
  width: 3em;
  height: 3em;
  border-radius: 50%;
}

// 添加按钮
.add-button {
  width: calc(1em + 2vw);
  height: calc(1em + 2vw);
  min-width: 2.5em;
  min-height: 2.5em;
  border-radius: 50%;
  background-color: rgba(var(--primary-color-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
