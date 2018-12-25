import loanApplication from '@/components/payments/loanApplication'
import loanCheck from '@/components/payments/loanCheck'
import loanDetail from '@/components/payments/loanDetail'
import loanRecordManage from '@/components/payments/loanRecordManage'
import loanRecordApply from '@/components/payments/loanRecordApply'
import loanList from '@/components/payments/loanList'
import routerview from '@/components/common/routerview'

const paymentsRouter = {
  path: 'payments',
  component: routerview,
  meta: {title: '放款管理'},
  children: [{
    path: 'loanApplication',
    component: loanApplication,
    name: 'loanApplication',
    meta: {title: '放款申请'}
  },
  {
    path: 'loanDetail',
    component: loanDetail,
    name: 'loanDetail',
    meta: {title: '放款审核详情'}
  },
  {
    path: 'loanCheck',
    component: loanCheck,
    name: 'loanCheck',
    meta: {title: '放款审核'}
  },
  {
    path: 'loanDetail',
    component: loanDetail,
    name: 'loanDetail',
    meta: {title: '放款审核详情'}
  },
  {
    path: 'loanRecordManage',
    component: loanRecordManage,
    name: 'loanRecordManage',
    meta: {title: '放款档案管理'}
  },
  {
    path: 'loanRecordApply',
    component: loanRecordApply,
    name: 'loanRecordApply',
    meta: {title: '项目归档'}
  },
  {
    path: 'loanList',
    component: loanList,
    name: 'loanList',
    meta: {title: '放款列表'}
  }]
}

export {paymentsRouter}
