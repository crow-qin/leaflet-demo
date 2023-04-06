import { commonIncrementType, commonDecrementType, commonNameChangeType } from "../types";
export const countIncrementAction = () => {
  return {
    type: commonIncrementType
  }
}
export const countDecrementAction = () => {
  return {
    type: commonDecrementType
  }
}
export const commonNameChangeAction = (data: string) => {
  return {
    type: commonNameChangeType,
    payload: data
  }
}