import L from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import "leaflet/dist/leaflet.css";
import styled from 'styled-components';
// 纬度，经度
const center: L.LatLngExpression = [23.132610, 113.330970]
const zoom = 13
const id = 'map2'
export default function Leaflet2() {
  const [map, setMap] = useState<L.Map | null>(null)
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
  const mapInit = (center: L.LatLngExpression) => {
    let myMap = L.map(id, {
      // 坐标参考系统
      crs: L.CRS.EPSG3857,
      zoomControl: true,
      attributionControl: false,
      // 使用canvas绘制
      preferCanvas: true,
    }).setView(center, zoom)
    setMap(myMap)
    /**
     * 瓦片
     * attribution: 地图右下角的声明
     * maxZoom, minZoom: 缩放控件
     *  */
    // let BaseLayer = L.tileLayer(urlTemplate.mapbox_Image, {
    let BaseLayer = L.tileLayer('http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      minZoom: 4,
    }).addTo(myMap)
    console.log('test-BaseLayer', BaseLayer)
    L.marker(center, {
      // highlight: 'permanent '
    }).addTo(myMap)

  }
  const sucFn: PositionCallback = (position) => {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    console.log('test-可用', [lat, lng])
    return mapInit([lat, lng])
  }
  const failFn = () => {
    console.log('test-不可用')
    mapInit(center)
  }
  const checkGeoLocation = () => {
    try {

      if (navigator.geolocation) {
        console.log('test-only-地理位置服务可用')
        navigator.geolocation.getCurrentPosition(sucFn, failFn)
        return
      }
      console.log('test-only-地理位置服务不可用')
      mapInit(center)
    } catch (e) {
      console.log('test-e', e)
    }
  }
  const getGeo = () => {
    if (!cleanContainer()) return
    checkGeoLocation()
  }

  const iconCon = () => {
    return L.divIcon({
      className: 'icon1',
      iconSize: [30, 30],
      // 图标中心点位置，不配置缩放时图标会偏移，点位会不准确
      iconAnchor: [15, 30],
    })
  }
  const popupCon = (item: any) => `
  <div  style="color:#66c9ff;font-size:16px">${item.join(',')}</div>
  `
  // const
  const addMarkers = () => {
    const data: L.LatLngBoundsExpression = [[22.97935, 113.17509], [22.98680, 113.030550]]
    const list: L.Layer[] = 
    data.map((v: any) => {
      return L.marker(v, {
        icon: iconCon(),
      })
        .bindPopup(popupCon(v), {
          //绑定弹出框
          closeButton: false,
          keepInView: false, //在边界弹出时，不会被边界遮挡
          offset: L.point(0, -16), //往上偏移，不遮挡标点
        })
      .on("mouseover",  function() {
        const self: any = (this as any)
        //鼠标移入事件
        self.openPopup();
      })
      .on("mouseout",  function() {
        const self: any = (this as any)
        //鼠标移出事件
        self.closePopup();
      })
      // .on("click", function (e) {
      //   //鼠标点击事件，可以弹出弹出框
      //   setModalData(item);
      //   setModalOpen(true);
      // });
    })
    console.log('test-list', list)
    const group = L.layerGroup(list);
    // setMarkList(group);
    map?.addLayer(group);
    // 获取地图的中心
    // map?.getCenter()
    //刷新地图对象
    map?.setView(data[0]);
  }
  useEffect(() => {
    if (!cleanContainer()) return
    mapInit(center)

    return () => {
      cleanContainer()
    }
  }, [])

  return <Wrapper className="page-ctx">
    <div className='btn-ctx'>
      <button onClick={addMarkers}>添加多个marker</button>
      <button onClick={() => getGeo()}>获取位置</button>
    </div>
    <div id={id} className='map-box'></div>
  </Wrapper>
}
const Wrapper = styled.div`
  .btn-ctx {
    display: flex;
  }
  .map-box {
    height: 600px;
  }
  .icon1 {
    /* width: 10px;
    height: 10px; */
    background-color: #0084ff;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 1px #fffcfcd3 inset;
    position:  relative;
    &::after {
      content: '';
      position: absolute;
      left: 10px;
      top: 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fff;
    }
  }
`