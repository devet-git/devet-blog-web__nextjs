import Banner from "@/components/banner";
import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Banner />
			<NavBar />
			{children}
			<Footer />
		</>
	)
}
