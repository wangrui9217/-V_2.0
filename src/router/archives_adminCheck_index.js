import routerview from '@/components/common/routerview'

import archivesAdminCheckList from '@/components/archivesManage/archives_adminCheck_list'
import archivesAdminCheck from '@/components/archivesManage/archives_adminCheck'

const archivesAdminCheckRouter =
    {
      path: 'archivesAdminCheck',
      component: routerview,
      redirect: 'archivesAdminCheck/list',
      name: '档案审核列表',
      meta: {title: '档案审核列表'},
      children: [
        {
          path: 'list',
          component: archivesAdminCheckList,
          title: '档案审核列表',
          meta: {title: '档案审核列表'}
        },
        {
          path: 'check',
          component: archivesAdminCheck,
          title: '项目归档审核',
          meta: {title: '项目归档审核'}
        }
      ]
    }

export { archivesAdminCheckRouter }
