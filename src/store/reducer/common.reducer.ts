import { commonDecrementType, commonIncrementType, commonNameChangeType } from "../types";
const defStore = { count: 1, name: '' }
export const commonReducer = (state = defStore, action: any) => {
  switch (action.type) {
    case commonIncrementType:
      return { ...state, count: state.count + 1 };
    case commonDecrementType:
      return { ...state, count: state.count - 1 };
    case commonNameChangeType:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
