import { countDecrementAction, countIncrementAction } from "@/store/actions/common.actions"
import { useSelector, useDispatch } from "react-redux"

export default () => {
  const dispatch = useDispatch()
  const count = useSelector((state: any) => state.common.count)
  return <div>
    <div>{ count }</div>
    <button onClick={() => dispatch(countIncrementAction())}>加一</button>
    <button onClick={() => dispatch(countDecrementAction())}>减一</button>
  </div>
}