import routerview from '@/components/common/routerview'

import archivesCheckList from '@/components/archivesManage/archives_check_list'
import archivesCheck from '@/components/archivesManage/archives_check'
const archivesCheckRouter =
    {
      path: 'archivesCheck',
      component: routerview,
      redirect: 'archivesCheck/list',
      name: '项目归档管理',
      meta: {title: '项目归档管理'},
      children: [
        {
          path: 'list',
          component: archivesCheckList,
          title: '项目归档管理',
          meta: {title: '项目归档管理'}
        },
        {
          path: 'check',
          component: archivesCheck,
          title: '项目归档审核',
          meta: {title: '项目归档审核'}
        }
      ]
    }

export { archivesCheckRouter }
