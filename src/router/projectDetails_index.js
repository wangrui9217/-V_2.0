import routerview from '@/components/common/routerview'
import index from '@/components/projectDetails/index'

const projectDetailsRouter =
  {
    path: 'projectDetails',
    component: routerview,
    redirect: 'projectDetails/index',
    meta: {title: '项目详情'},
    children: [
      {
        path: 'index',
        component: index,
        title: '担保信息',
        meta: {title: '项目详情'}
      }
    ]
  }

export {projectDetailsRouter}
