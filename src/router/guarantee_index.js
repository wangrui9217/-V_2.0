import routerview from '@/components/common/routerview'

import guaranteeList from '@/components/guarantee/guarantee_list'
import guaranteePer from '@/components/guarantee/guarantee_person'
import guaranteeCorp from '@/components/guarantee/guarantee_corporate'
import guaranteeHome from '@/components/guarantee/guarantee_home'

const guaranteeRouter =
    {
      path: 'guarantee',
      component: routerview,
      redirect: 'guarantee/list',
      name: '担保信息',
      meta: {title: '担保信息'},
      children: [
        {
          path: 'list',
          component: guaranteeList,
          title: '担保信息',
          meta: {title: '担保信息'}
        },
        {
          path: 'edit_per',
          component: guaranteePer,
          title: '自然人担保',
          meta: {title: '自然人担保'}
        },
        {
          path: 'edit_home',
          component: guaranteeHome,
          name: 'edit_home',
          title: '家庭成员个人担保',
          meta: {title: '家庭成员个人担保'}
        },
        {
          path: 'edit_corp',
          component: guaranteeCorp,
          title: '公司担保',
          meta: {title: '公司担保'}
        },
      ]
    }

export { guaranteeRouter }
