import { deleteResponse } from "../../store/reducers/query.reducer";
import { useAppDispatch, useAppSelector } from "./reducer";

export const useInvalidateApi = () => {
	const cache = useAppSelector((state) => state.query);
	const dispatch = useAppDispatch();

	const invalidate = (keys: string[]) => {
		dispatch(deleteResponse(keys.join(" ")));
	};

	return { invalidate };
};
