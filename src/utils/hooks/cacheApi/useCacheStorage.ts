import { useEffect, useState } from "react";

type CacheStorageReturnType<DataT> = {
	cacheData: { data: DataT; error: null; expiresIn: Date; status: "success" } | undefined;
	isStale: boolean;
};

export const useCacheStorage = <DataT>(key: string): CacheStorageReturnType<DataT> => {
	if (localStorage.getItem(key)) {
		const localCache = JSON.parse(
			localStorage.getItem(key) as string
		) as CacheStorageReturnType<DataT>["cacheData"];

		if (localCache && new Date() <= new Date(localCache.expiresIn)) {
			return { cacheData: localCache, isStale: false };
		} else {
			return { cacheData: localCache, isStale: true };
		}
	} else if (sessionStorage.getItem(key)) {
		const sessionCache = JSON.parse(
			sessionStorage.getItem(key) as string
		) as CacheStorageReturnType<DataT>["cacheData"];
		if (sessionCache && new Date() <= new Date(sessionCache.expiresIn)) {
			return { cacheData: sessionCache, isStale: false };
		} else {
			return { cacheData: sessionCache, isStale: true };
		}
	}

	return { cacheData: undefined, isStale: false };
};
