import workBench from '@/components/work/work_bench'
import workInformation from '@/components/work/work_information'
import workCompany from '@/components/work/work_company'
import field from '@/components/work/field'
import routerview from '@/components/common/routerview'

const workRouter =
  {
    path: 'work',
    component: routerview,
    name: '工作台',
    redirect: 'work/work',
    children: [{
      path: 'work',
      component: workBench,
      name: '工作台',
      meta: {title: '工作台'}
    },
    {
      path: 'workinformation',
      component: workInformation,
      name: 'workinformationList',
      meta: {title: '项目信息完善'}
    },
     {
      path: 'workcompany/',
      component: workCompany,
      name: 'companyyq',
      meta: {title: '企业信息完善'}
    },
      {
        path: 'field',
        component: field,
        name: '字段',
        meta: {title: '字段'}
      }]


  }

export {workRouter}
