import { deleteResponse } from "../../store/reducers/apiCache.reducer";
import { useAppDispatch, useAppSelector } from "./reducer";

export const useInvalidateApi = () => {
	const cache = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const invalidate = (keys: string[]) => {
		dispatch(deleteResponse(keys.join(" ")));
	};

	return { invalidate };
};
