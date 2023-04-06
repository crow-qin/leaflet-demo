namespace RouteList {
  export interface Route {
    path: string
    component: React.LazyExoticComponent<any>
    children?: Route[]
  }
}
import { traversalFile } from "@/utils/fs";
import React, { lazy, Suspense } from "react";
import { useRoutes, RouteObject } from "react-router-dom";

const routes: RouteList.Route[] = [
  {
    path: '/',
    component: lazy(() => import('@/layout/Page')),
    children: 
    traversalFile.LocRoutes,
    // [
    //   {
    //     path: 'home',
    //     component: lazy(() => import('@/views/Home')),
    //   },
    //   {
    //     path: 'leaflet1',
    //     component: lazy(() => import('@/views/Leaflet1')),
    //   },
    //   {
    //     path: 'leaflet2',
    //     component: lazy(() => import('@/views/Leaflet2')),
    //   },
    // ]
  }
]
console.log('test-routes', routes)
const formatRouter = (routes: RouteList.Route[]): RouteObject[] => {

  return routes.map((v: RouteList.Route) => ({
    path: v.path,
    element: (
      <Suspense fallback={<div>加载中...</div>}>
        <v.component />
      </Suspense>
    ),
    children: v.children && formatRouter(v.children)
  }))
}

export default () => useRoutes(formatRouter(routes))