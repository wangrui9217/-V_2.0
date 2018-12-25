import Vue from 'vue'
import Router from 'vue-router'

import { systemRouter } from '@/router/system_index'
import { customerRouter } from '@/router/customer_index'
import { guaranteeRouter } from '@/router/guarantee_index'
import { uploadRouter } from '@/router/upload_index'
import { assetsPushRouter } from '@/router/assetsPush_index'
import { archivesApplyRouter } from '@/router/archives_apply_index'
import { archivesCheckRouter } from '@/router/archives_check_index'
import { archivesAdminCheckRouter } from '@/router/archives_adminCheck_index'
import { archivesManageRouter } from '@/router/archives_manage_index'
import { archivesDetailsRouter } from '@/router/archives_details_index'
import { loanInspectionRouter } from '@/router/loanInspection_index'
import { workRouter } from '@/router/work_index'
import { projectRouter} from '@/router/project_index'
import { approveRouter } from '@/router/approve_index'
import { projectDetailsRouter } from '@/router/projectDetails_index'
import { paymentsRouter } from '@/router/payments_index'
import { moneyBackRouter } from '@/router/moneyBack_index'
import {systemParameterRouter} from '@/router/systemParameter_index'
import {dictionaryManageRouter} from '@/router/dictionaryManage_index'
import login from '@/components/login'
import admin from '@/components/admin'
import home from '@/components/home'
import empty from '@/components/common/empty'
import processImg from '@/components/common/processImg'// 流程图

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: login,
      name: 'index',
      meta: {
        title: '系统登录',
        noRequireAuth: true,
        user: true
      }
    },
    {
      path: '/login',
      component: login,
      name: 'login',
      meta: {
        title: '系统登录',
        noRequireAuth: true,
        user: true
      }
    },
    {
      path: '/processImg',
      component: processImg,
      name: 'processImg',
      meta: {
        title: '流程图',
        noRequireAuth: true,
        user: true
      }
    },
    {
      path: '/sys',
      component: admin,
      name: '系统',
      redirect: '/sys/home',
      meta: {title: '首页'},
      children: [
        {
          path: 'home',
          component: home,
          name: '首页'
        },
        {
          path: 'empty',
          component: empty
        },
        workRouter,
        systemRouter,
        customerRouter,
        guaranteeRouter,
        assetsPushRouter,
        archivesApplyRouter,
        archivesCheckRouter,
        archivesAdminCheckRouter,
        archivesManageRouter,
        archivesDetailsRouter,
        loanInspectionRouter,
        uploadRouter,
        approveRouter,
        projectRouter,
        projectDetailsRouter,
        paymentsRouter,
        moneyBackRouter,
        systemParameterRouter,
        dictionaryManageRouter
      ]
    },
    {
      path: '*',
      redirect: '/sys/empty'
    }
  ]
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  next()
})

export default router
