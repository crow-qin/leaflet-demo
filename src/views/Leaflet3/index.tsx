import L from 'leaflet'
import 'leaflet-polylinedecorator'
import '@/utils/animatedMarker'
import { useEffect, useRef, useState } from 'react'
import "leaflet/dist/leaflet.css";
import styled from 'styled-components';
import urlTemplate from '@/utils/urlTemplate';
import { getImageUrl } from "@/utils/img";
import { cleanContainer } from '@/utils/leafletExtends';

const latLngArr: L.LatLngExpression[] = [
  [23.127673, 113.324522],
  [23.12856, 113.324511],
  [23.128805, 113.324433],
  [23.129152, 113.324393],
  [23.12929, 113.324393],
  [23.129417, 113.324009],
  [23.129452, 113.323734],
  [23.129485, 113.323432],
  [23.129654, 113.323428],
  [23.12968, 113.32329],
  [23.129958, 113.323334],
  [23.130699, 113.32336],
  [23.130738, 113.322656],
  [23.130828, 113.322663],
]
const speedList = Array.from({ length: latLngArr.length }, () => 1)
const center: L.LatLngExpression = latLngArr[0]
const zoom = 17
const id = 'map3'
export default function Leaflet3() {
  const [map, setMap] = useState<L.Map | null>(null)
  const [routeLine, setRouteLine] = useState<any | null>(null)
  const [realRouteLine, setRealRouteLine] = useState<any | null>(null)
  const [animatedMarker, setAnimatedMarker] = useState<any>(null)
  const newLatLngArr = useRef<any[]>([])

  const pIcon = L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    iconUrl: getImageUrl('person.jpg')
  })
  const updateRealRouteLine = function (latLng: any) {
    const arr = [...newLatLngArr.current, latLng]
    console.log('test-arr', arr)

    newLatLngArr.current = arr
    setRealRouteLine((v: any) => {
      console.log('test-v', v)
      v.setLatLngs(arr)
      return v
    })
  }
  const resetMarker = () => {

    animatedMarker.stop()
    // animatedMarker.resetIcon()
    newLatLngArr.current = [routeLine.getLatLngs()[0]]
    realRouteLine.setLatLngs(newLatLngArr.current)

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
    // 轨迹
    var routeLine = L.polyline(latLngArr, {
      weight: 8,
    }).addTo(m)
    setRouteLine(routeLine)
    newLatLngArr.current = [routeLine.getLatLngs()[0]]
    // 实时轨迹
    const rRouteLine = L.polyline([], {
      weight: 8,
      color: '#ff0000'
    }).addTo(m)
    setRealRouteLine(rRouteLine)
    // 带箭头的轨迹
    const decorator = L?.polylineDecorator(routeLine, {
      patterns: [{
        repeat: 50,
        symbol: L.Symbol?.arrowHead({
          pixelSize: 6,
          headAngle: 60,
          polygon: false,
          pathOptions: {
            stroke: true,
            weight: 2,
            color: '#fff'
          }
        })
      }]
    }).addTo(m)

    const aMarker = L?.animatedMarker(routeLine.getLatLngs(), {
      speedList: speedList,
      interval: 600,
      icon: pIcon,
      autoStart: false,
      playCall: updateRealRouteLine,
      onEnd: () => {
        console.log('test-only-结束')
      }
    }).addTo(m)
    setAnimatedMarker(aMarker)

    return () => {
      cleanContainer(id)
    }
  }, [])

  return <Wrapper className="page-ctx">
    <div>带箭头轨迹及沿轨迹方向运动的动态maker</div>
    <div className='btn-ctx'>
      <button onClick={() => {
        animatedMarker.start()
      }}>开始</button>
      <button onClick={() => {
        animatedMarker.pause()
      }}>暂停</button>
      <button onClick={() => resetMarker()}>重置</button>
    </div>
    <div id={id} className='map-box'></div>
  </Wrapper>
}
const Wrapper = styled.div`
  .map-box {
    height: 600px;
  }
`