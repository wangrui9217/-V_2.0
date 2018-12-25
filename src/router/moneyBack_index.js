import moneyBackCheck from '@/components/payments/moneyBackCheck'
import moneyBackDetail from '@/components/payments/moneyBackDetail'
import moneyBackList from '@/components/payments/moneyBackList'
import moneyBackListDetail from '@/components/payments/moneyBackListDetail'
import routerview from '@/components/common/routerview'

const moneyBackRouter = {
  path: 'moneyBack',
  component: routerview,
  meta: {title: '回款管理'},
  children: [
    {
      path: 'moneyBackCheck',
      component: moneyBackCheck,
      name: 'moneyBackCheck',
      meta: {title: '项目回款审核'}
    },
    {
      path: 'moneyBackDetail',
      component: moneyBackDetail,
      name: 'moneyBackDetail',
      meta: {title: '还款详情'}
    },
    {
      path: 'moneyBackListDetail',
      component: moneyBackListDetail,
      name: 'moneyBackListDetail',
      meta: {title: '回款申请'}
    },
    {
      path: 'moneyBackList',
      component: moneyBackList,
      name: 'moneyBackList',
      meta: {title: '回款申请列表'}
    }]
}

export {moneyBackRouter}
