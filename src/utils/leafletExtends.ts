import L from 'leaflet'
// 清除地图
export const cleanContainer = (id: string) => {
  var container = L.DomUtil.get(id);
  if (container != null) {
    (container as any)._leaflet_id = null;
    if (container.childNodes.length) {
      return false
    }
  }
  return true
}