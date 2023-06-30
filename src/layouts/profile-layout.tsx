import NavBar from "@/components/nav-bar";
import pageRoutes from "@/constants/page-path";
import { classNames } from "@/utils/html-class";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, ReactElement } from "react";

type SidebarType = {
	name: string,
	path: string,
	icon: ReactElement,
	badge?: any
	current?: boolean
}

const Aside = () => {
	const router = useRouter();
	const pathname = router.pathname

	const sidebarItems: SidebarType[] = [
		{
			name: "Information",
			path: pageRoutes.user.INFO,
			icon: <InformationCircleIcon width={25} />,
			current: pathname === pageRoutes.user.INFO
		}
	]

	return (
		<aside
			id="logo-sidebar"
			className={classNames(
				"fixed left-0 z-40 w-64 h-screen pt-5",
				"bg-white border-r border-gray-200 sm:translate-x-0",
				"dark:bg-gray-800 dark:border-gray-70"
			)}
			aria-label="Sidebar"
		>
			<div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
				<ul className="space-y-2 font-medium">
					{sidebarItems.map((item, index) => (
						<li key={index}>
							<Link
								href={item.path}
								className={classNames(
									item.current ? "bg-slate-200" : "hover:bg-gray-100",
									"flex items-center p-2 text-black rounded-lg dark:text-white  dark:hover:bg-gray-700"
								)}
							>
								{item.icon}
								<span className="ml-3">{item.name}</span>
								{item.badge && (
									<span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
										{item.badge}
									</span>
								)}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</aside >
	)
}
export default function ProfileLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<NavBar />
			<Aside />
			<main className="p-4 sm:ml-64">
				{children}
			</main>
		</>
	)
}
