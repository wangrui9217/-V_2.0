import routerview from '@/components/common/routerview'

import archivesApplyList from '@/components/archivesManage/archives_apply_list'
import archivesApply from '@/components/archivesManage/archives_apply'
const archivesApplyRouter =
    {
      path: 'archivesApply',
      component: routerview,
      redirect: 'archivesApply/list',
      name: '项目归档列表',
      meta: {title: '项目归档列表'},
      children: [
        {
          path: 'list',
          component: archivesApplyList,
          title: '项目归档列表',
          meta: {title: '项目归档列表'}
        },
        {
          path: 'apply',
          component: archivesApply,
          title: '项目归档申请',
          meta: {title: '项目归档申请'}
        }
      ]
    }

export { archivesApplyRouter }
