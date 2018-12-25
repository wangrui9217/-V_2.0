import routerview from '@/components/common/routerview'

import loanInspectionList from '@/components/loanInspection/loanInspection_list'
import loanInspectionReport from '@/components/loanInspection/loanInspection_report'
const loanInspectionRouter =
    {
      path: 'loanInspection',
      component: routerview,
      redirect: 'loanInspection/list',
      name: '贷后检查管理',
      meta: {title: '贷后检查管理'},
      children: [
        {
          path: 'list',
          component: loanInspectionList,
          title: '贷后检查管理',
          meta: {title: '贷后检查管理'}
        },
        {
          path: 'report',
          component: loanInspectionReport,
          title: '贷后检查报告',
          meta: {title: '贷后检查报告'}
        },
        // {
        //   path: 'check',
        //   component: archivesCheck,
        //   title: '项目归档',
        //   meta: {title: '项目归档'}
        // },
      ]
    }

export { loanInspectionRouter }
