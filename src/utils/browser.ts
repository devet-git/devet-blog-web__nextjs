'use client'
import { NextRouter } from "next/router";
type Params = {
	router: NextRouter,
	path: string,
	continuePath?: string
}
const browserUtils = {
	store: {
		get: (key: string): any | null => {
			if (typeof window !== "undefined" && window.localStorage) {
				const value = localStorage.getItem(key)
				return value ? JSON.parse(value) : null;
			}
		},
		set: (key: string, value: any): void => {
			if (typeof window !== "undefined" && window.localStorage) {
				localStorage.setItem(key, JSON.stringify(value))
			}
		}
	}
}
export const redirectTo = ({ router, path, continuePath }: Params) => {
	setTimeout(() => {
		continuePath ? router.push(path || continuePath) : router.push(path)
	}, 2000);
}
export default browserUtils