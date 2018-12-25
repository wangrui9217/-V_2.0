import routerview from '@/components/common/routerview'
import index from '@/components/approvalDetails/index'
import ready from '@/components/approvalDetails/already'

const approveRouter =
  {
    path: 'approve',
    component: routerview,
    redirect: 'approve/index',
    meta: {title: '审批详情'},
    children: [
      {
        path: 'index',
        component: index,
        title: '担保信息',
        meta: {title: '审批详情'}
      },
      {
        path: 'already',
        component: ready,
        meta: {title: '审批详情(已完成)'}
      }
    ]
  }

export {approveRouter}
