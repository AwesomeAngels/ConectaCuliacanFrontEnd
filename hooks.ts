import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "./src/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()