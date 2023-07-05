import NavBar from "@/components/nav-bar";
import storageKeys from "@/constants/local-storage-keys";
import pageRoutes from "@/constants/page-path";
import withAuth from "@/middlewares/with-auth";
import { User } from "@/types/api-object";
import browserUtils from "@/utils/browser";
import { classNames } from "@/utils/html-class";
import { BookOpenIcon, InformationCircleIcon, QuestionMarkCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, ReactElement, useEffect, useState } from "react";

type SidebarType = {
	name: string,
	path: string,
	icon: ReactElement,
	badge?: any
	current?: boolean
}

const Aside = () => {
	const router = useRouter();
	const { pathname, asPath } = router
	const [currentUser, setCurrentUser] = useState<User>()

	useEffect(() => {
		const currentUser = browserUtils.store.get(storageKeys.USER)
		currentUser && setCurrentUser(currentUser)
	}, [])
	const sidebarItems: SidebarType[] = [
		{
			name: "General",
			path: pageRoutes.myAccount.INFO,
			icon: <InformationCircleIcon width={25} />,
			current: pathname === pageRoutes.myAccount.INFO
		},
		{
			name: "Post",
			path: pageRoutes.myAccount.ARTICLES(currentUser?.id),
			icon: <BookOpenIcon width={25} />,
			current: asPath === pageRoutes.myAccount.ARTICLES(currentUser?.id)
		},
		{
			name: "Account",
			path: pageRoutes.myAccount.ACCOUNT,
			icon: <UserIcon width={25} />,
			current: pathname === pageRoutes.myAccount.ACCOUNT
		},
		{
			name: "Help & Report",
			path: pageRoutes.myAccount.HELP,
			icon: <QuestionMarkCircleIcon width={25} />,
			current: pathname === pageRoutes.myAccount.HELP
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
									item.current ? "bg-slate-200 pointer-events-none" : "hover:bg-gray-100",
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
function ProfileLayout({ children }: { children: ReactNode }) {

	return (
		<>
			<NavBar />
			<Aside />
			<main className="px-4 py-5 sm:ml-64">
				{children}
			</main>
		</>
	)
}
export default withAuth(ProfileLayout)