import projectArchiveCheck from '@/components/projectArchive/projectArchiveCheck'
import projectArchiveManage from '@/components/projectArchive/projectArchiveManage'
const projectArchiveRouter = [{
  path: 'projectArchiveManage',
  component: projectArchiveManage,
  name: 'projectArchiveManage',
  meta: {title: '归档任务管理'}
},
{
  path: 'projectArchiveCheck',
  component: projectArchiveCheck,
  name: 'projectArchiveCheck',
  meta: {title: '项目归档审核'}
}]
export {projectArchiveRouter}
