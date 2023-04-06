import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
export default function () {
  return <Wrapper>
    <Header />
    <Outlet />
  </Wrapper>
}
const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
`