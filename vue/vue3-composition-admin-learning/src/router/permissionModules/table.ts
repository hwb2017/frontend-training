import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const tableRouter: Array<RouteRecordRaw> = [
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
      title: 'table',
      icon: '#icontable'
    },
    children: [
      {
        path: 'dynamic-table',
        component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/table/dynamic-table/Index.vue'),
        name: 'DynamicTable',
        meta: { title: 'dynamicTable' }
      },
      {
        path: 'draggable-table',
        component: () => import(/* webpackChunkName: "draggable-table" */ '@/views/table/DraggableTable.vue'),
        name: 'DraggableTable',
        meta: { title: 'draggableTable' }
      },
      {
        path: 'inline-edit-table',
        component: () => import(/* webpackChunkName: "inline-edit-table" */ '@/views/table/InlineEditTable.vue'),
        name: 'InlineEditTable',
        meta: { title: 'inlineEditTable' }
      },
      {
        path: 'complex-table',
        component: () => import(/* webpackChunkName: "complex-table" */ '@/views/table/ComplexTable.vue'),
        name: 'ComplexTable',
        meta: { title: 'complexTable' }
      }
    ]
  }
]
