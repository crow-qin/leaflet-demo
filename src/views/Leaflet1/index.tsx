import L from 'leaflet'
import { useEffect, useRef } from 'react'
import "leaflet/dist/leaflet.css";
import styled from 'styled-components';
import urlTemplate from '@/utils/urlTemplate';

const center: L.LatLngExpression = [23.133420, 113.330930]
const zoom = 13
const id = 'map1'
export default function Leaflet1() {
  
  // 清除地图
  const cleanContainer = () => {
    var container = L.DomUtil.get(id);
    if (container != null) {
      (container as any)._leaflet_id = null;
      if (container.childNodes.length) {
        return false
      }
    }
    return true
  }
  
  useEffect(() => {
    if (!cleanContainer()) return
    var map = L.map(id).setView(center, zoom)
    /**
     * 瓦片
     * attribution: 地图右下角的声明
     * maxZoom, minZoom: 缩放控件
     *  */
    L.tileLayer(urlTemplate.url1, {
      // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      minZoom: 2,
    }).addTo(map)
    // 定位图标
    var marker = L.marker(center).addTo(map)
    // 圆形
    var circle = L.circle([29.508, 113.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);
    L.polygon([
      [29.509, 113.08],
      [29.503, 113.06],
      [29.51, 113.047]
    ]).addTo(map);
    // 点击对象弹窗提示
    marker.bindPopup('这是定位标志').openPopup()
    circle.bindPopup('这是圆形')
    var popup = L.popup()

    const onMapClick = (e: L.LeafletMouseEvent) => {
      console.log('test-e', e)
      // 通过定位显示弹窗
      // popup
      //   .setLatLng(e.latlng)
      //   .setContent("点击到了" + e.latlng.toString())
      //   .openOn(map);

      marker
      .setLatLng(e.latlng)
      .bindPopup("点击到了" + e.latlng.toString())
      .openPopup()
    }

    map.on('click', onMapClick)
    
    // map.setMaxBounds(L.latLngBounds(L.latLng(-90, -360), L.latLng(90, 180)))
    return () => {
      cleanContainer()
    }
  }, [])

  return <Wrapper className="page-ctx">
    <div id={id} className='map-box'></div>
  </Wrapper>
}
const Wrapper = styled.div`
  .map-box {
    height: 600px;
  }
`