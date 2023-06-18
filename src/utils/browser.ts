import { NextRouter } from "next/router";
type Params = {
	router: NextRouter,
	path: string,
	continuePath?: string
}

export const redirectTo = ({ router, path, continuePath }: Params) => {
	setTimeout(() => {
		continuePath ? router.push(path || continuePath) : router.push(path)
	}, 2000);
}