import { traversalFile } from "@/utils/fs";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
// const HEADER_CONFIG = [
//   {
//     name: '首页',
//     path: '/home'
//   },
//   {
//     name: 'leaflet1',
//     path: '/leaflet1'
//   },
//   {
//     name: 'leaflet2',
//     path: '/leaflet2'
//   },
// ]
export default function Header () {
  const navigate = useNavigate()
  const openPage = (path: string) => {
    navigate(path)
  }
  return <Wrapper>
    {
      traversalFile.LocHeaders.map((v: any, i: number) => (
        <div className="nav-item" key={i} onClick={() => openPage(v.path)}>{v.name}</div>
      ))
    }
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  box-shadow: 1px 1px 20px 2px #888;
  
  .nav-item {
    padding: 15px;
    cursor: pointer;
    &:hover {
      color: #0084ff;
    }
  }
`