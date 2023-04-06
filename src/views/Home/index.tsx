import { useDispatch } from "react-redux";
import Calc from "./components/calc";
import { useSelector } from "react-redux";
import { commonNameChangeAction } from "@/store/actions/common.actions";

export default function Home() {
  const dispatch = useDispatch()
  const name = useSelector(({ common }: any) => common.name)
  return <div className="page-ctx">
    <Calc />
    <div>姓名：{ name }</div>
    <input type="text" value={name} onChange={(e) => {
      dispatch(commonNameChangeAction(e.target.value))
    }} />
  </div>
}