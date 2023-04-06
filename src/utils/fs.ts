
import { lazy } from "react";

class TraversalFile {

constructor() {
  this.traversalRoutes()
}

public LocRoutes: any[] = [];
public LocHeaders: any[] = [];
public traversalRoutes = () => {
  /**
   * 以“default”这个选项作为默认的导出内容，从而避免对象为'unknown'时获取default的报错
   * 以glob导出的是动态组件
   */
  const ctxs = import.meta.glob("../views/*/index.tsx", {
    eager: true,
    import: "default",
  });
  this.LocHeaders = []
  const arr = Object.keys(ctxs).map((v: string) => {
    this.LocHeaders.push({
      name: (ctxs[v] as any)!.name,
      path: `/${(ctxs[v] as any)!.name}`
    })
    return {
      path: (ctxs[v] as any)!.name,
      // component: lazy(() => import(v)),
      component: ctxs[v],
    };
  });
  this.LocRoutes = arr;
};
}
export const traversalFile = new TraversalFile()