import uploadList from '@/components/upload/upload_list'

const uploadRouter =
    {
      path: 'upload',
      component: uploadList,
      name: '项目资料上传',
      meta: {title: '项目资料上传'}
    }

export { uploadRouter }