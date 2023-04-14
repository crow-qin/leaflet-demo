import L from 'leaflet'
import 'leaflet-polylinedecorator'
import '@/utils/animatedMarker'
import { useEffect, useRef, useState } from 'react'
import "leaflet/dist/leaflet.css";
import styled from 'styled-components';
import urlTemplate from '@/utils/urlTemplate';
import { getImageUrl } from "@/utils/img";
import { cleanContainer } from '@/utils/leafletExtends';
import { arr } from './utils';

const newCenter = '121.473667,31.230525'

const center: L.LatLngExpression = [36.670201, 117.020725]
const zoom = 8
const id = 'map4'
export default function Leaflet4() {
  const [map, setMap] = useState<L.Map | null>(null)
  const group = useRef<L.FeatureGroup<any> | any>(null)
  const [kw, setKw] = useState('')
  const [list, setList] = useState<any[]>([])
  const [data, setData] = useState<any>({})
  // 添加多边形
  const addPloyLine = ({polyline, center, name}: any) => {
    clearGroup()
    const vArr: any[] = polyline.split('|')
    for (let v1 of vArr) {
      const v1Arr = v1.split(';').map((v1: string) => v1.split(',').reverse())
      let ployLine = L.polygon(v1Arr, {
        color: '#0084ff',
        fillOpacity: 0,
        weight: 3
      })

      group.current.addLayer(ployLine)
    }
    group.current.on('mouseover', (e: any) => {
      group.current.setStyle({
        color: '#c91623'
      })
        .bindPopup(name)
        .openPopup()
    })
    group.current.on('mouseout', (e: any) => {
      group.current
        .setStyle({
          color: '#0084ff'
        })
        .closePopup()
    })

    map?.setView(center.split(',').reverse())
  }

  const clearGroup = () => {
    if (group.current) {
      group.current.clearLayers()
    }
    if (map) {
      const g = new L.FeatureGroup().addTo(map)
      group.current = g
    }
  }
  const drawMap = (data: any) => {
    addPloyLine(data)
  }
  const getLatLngs = () => {
    fetch(
      `https://restapi.amap.com/v3/config/district?key=${import.meta.env.VITE_APP_MAP_KEY}&keywords=${kw}&extensions=all`).then(res => res.json()).then(res => {
        console.log('test-res', res)
        setList(res.districts || [])
      })
  }
  useEffect(() => {
    if (!cleanContainer(id)) return
    var m = L.map(id, {
      preferCanvas: true // 使用canvas模式渲染矢量图形 
    }).setView(center, zoom)
    L.tileLayer(urlTemplate.url2, {
      // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 20,
      minZoom: 2,
    }).addTo(m)
    setMap(m)

    return () => {
      cleanContainer(id)
    }
  }, [])

  return <Wrapper className="page-ctx">
    <div>绘制行政区边界</div>
    <input type="text" onInput={(e: any) => setKw(e?.target?.value)} />
    <button onClick={() => getLatLngs()}>查询</button>
    {/* <button onClick={() => addPloyLine(arr, newCenter)}>绘制</button> */}
    <button onClick={() => clearGroup()}>清除</button>
    <div>
      {list.map(v => (
        <div className='item' onClick={() => drawMap(v)} key={v.adcode}>{v.name}</div>
      )
      )}
    </div>
    <div id={id} className='map-box'></div>
  </Wrapper>
}
const Wrapper = styled.div`
  .map-box {
    height: 600px;
  }
  .item {
    line-height: 30px;
    cursor: pointer;
  }
`