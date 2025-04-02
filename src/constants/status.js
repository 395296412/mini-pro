// 课程状态常量
export const COURSE_STATUS ={
    PENDING:0, 
    ACTIVE:1,
    COMPLETED:2,   
};

// 角色状态常量
export const USER_ROLE ={
    COACH:1,
    STUDENT:2,
};

// 教练课程状态文本
export const COACH_STATUS_TEXT = {
    [COURSE_STATUS.PENDING]: '待开始',
    [COURSE_STATUS.ACTIVE]: '正在指导',
    [COURSE_STATUS.COMPLETED]: '已完成指导'
};

// 学生课程状态文本
export const STUDENT_STATUS_TEXT = {
    [COURSE_STATUS.PENDING]: '即将开始',
    [COURSE_STATUS.ACTIVE]: '正在训练',
    [COURSE_STATUS.COMPLETED]: '已完成训练'
};