"use client";

import { useEffect } from "react";

export default function useTWElement() {
	useEffect(() => {
		const use = async () => {
			const { Carousel, initTE } = await import('tw-elements');
			initTE({ Carousel })
		};
		use();
	}, []);
}