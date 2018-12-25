import routerview from '@/components/common/routerview'

import assetsPushList from '@/components/assetsPush/assetsPush_list'
import assetsPushSupplement from '@/components/assetsPush/assetsPush_supplement'
import assetsPushDetails from '@/components/assetsPush/assetsPush_details'

const assetsPushRouter = {
  path: 'assetsPush',
  component: routerview,
  redirect: 'assetsPush/list',
  name: '资产推送',
  meta: {
    title: '资产推送'
  },
  children: [{
      path: 'list',
      component: assetsPushList,
      title: '资产推送',
      meta: {
        title: '资产推送'
      }
    },
    {
      path: 'supplement',
      component: assetsPushSupplement,
      title: '资产推送',
      meta: {
        title: '资产推送'
      }
    },
    {
      path: 'details',
      component: assetsPushDetails,
      title: '资产推送详情',
      meta: {
        title: '资产推送详情'
      }
    }
  ]
}

export {
  assetsPushRouter
}
