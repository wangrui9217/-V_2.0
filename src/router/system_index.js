import routerview from '@/components/common/routerview'

import roleList from '@/components/system/role_list'
import roleEdit from '@/components/system/role_edit'
import userList from '@/components/system/user_list'
import userEdit from '@/components/system/user_edit'
import menuList from '@/components/system/menu_list'
import menuEdit from '@/components/system/menu_edit'
import deptList from '@/components/system/dept_list'
import deptEdit from '@/components/system/dept_edit'
import sysLogList from '@/components/system/sys_log_list'

import message from '@/components/message/index'
import borrowerInfo from '@/components/customerEntry/borrower_info'

const systemRouter =
    {
      path: 'system',
      component: routerview,
      name: '系統设置',
      meta: {title: '系统设置'},
      children: [
        {
          path: 'dept',
          component: deptList,
          title: '部门管理',
          meta: {title: '部门管理'}
        },
        {
          path: 'dept/edit/:id',
          component: deptEdit,
          title: '部门编辑',
          meta: {title: '部门编辑'}
        },
        {
          path: 'role',
          component: roleList,
          title: '角色管理',
          meta: {title: '角色管理'}
        },
        {
          path: 'role/edit/:id',
          component: roleEdit,
          title: '角色编辑',
          meta: {title: '角色编辑'}
        },
        {
          path: 'user',
          component: userList,
          title: '用户管理',
          meta: {title: '用户管理'}
        },
        {
          path: 'user/edit/:id',
          component: userEdit,
          title: '用户编辑',
          meta: {title: '用户编辑'}

        },
        {
          path: 'menu',
          component: menuList,
          title: '菜单管理',
          meta: {title: '菜单管理'}
        },
        {
          path: 'menu/edit/:id',
          component: menuEdit,
          title: '菜单编辑',
          meta: {title: '菜单编辑'}
        },
        {
          path: 'sysLog',
          component: sysLogList,
          title: '系统日志',
          meta: {title: '系统日志'}
        },
        {
          name: 'messageList',
          path: 'message',
          component: message,
          meta: {title: '站内信列表'}
        },
        {
          name: 'borrowerInfo',
          path: 'borrowerInfo',
          component: borrowerInfo,
          meta: {title: '借款人信息完善'}
        }
      ]
    }

export { systemRouter }
