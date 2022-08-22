import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta:{
    id:'employees'
 },
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' },
    },
    {
      path: 'details/:id',
      component: () => import('@/views/employees/details'),
      hidden: true,
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true,
    },
  ],
}
