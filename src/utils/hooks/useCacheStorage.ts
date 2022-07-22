export const useCacheStorage = <DataT>(key: string) => {
	if (localStorage.getItem(key)) {
		const localCache = JSON.parse(localStorage.getItem(key) as string);
		if (new Date() <= new Date(localCache.expiresIn)) {
			return localCache as {
				data: DataT;
				error: null;
				expiresIn: Date;
				status: "success";
			};
		}
	}
	if (sessionStorage.getItem(key)) {
		const sessionCache = JSON.parse(sessionStorage.getItem(key) as string);
		if (new Date() <= new Date(sessionCache.expiresIn)) {
			return sessionCache as {
				data: DataT;
				error: null;
				expiresIn: Date;
				status: "success";
			};
		}
	}

	return undefined;
};
