import customerList from '@/components/customer/customer_list'

const customerRouter =
    {
      path: 'customer',
      component: customerList,
      name: '客户登记',
      meta: {title: '客户登记'}
    }

export { customerRouter }