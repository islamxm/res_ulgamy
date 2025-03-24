import { 
  TypedUseSelectorHook, 
  useSelector as reduxUseSelector, 
  useDispatch as reduxUseDispatch 
} from "react-redux";
import { AppDispatch, RootState } from "./types";
export const useDispatch = () => reduxUseDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector
