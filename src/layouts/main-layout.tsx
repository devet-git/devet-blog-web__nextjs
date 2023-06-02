import NavBar from "@/components/nav-bar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<NavBar />
			{children}
		</>
	)
}
