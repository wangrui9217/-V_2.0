import routerview from '@/components/common/routerview'

import archiveManageList from '@/components/archivesManage/archives_manage_list'
const archivesManageRouter =
    {
      path: 'archivesManage',
      component: routerview,
      redirect: 'archivesManage/list',
      name: '项目归档列表',
      meta: {title: '项目归档列表'},
      children: [
        {
          path: 'list',
          component: archiveManageList,
          title: '项目归档列表',
          meta: {title: '项目归档列表'}
        }
      ]
    }

export { archivesManageRouter }
