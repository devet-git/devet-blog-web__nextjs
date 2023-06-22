import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, MagnifyingGlassIcon, XMarkIcon, } from '@heroicons/react/24/outline'
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from 'next/router'
import pageRoutes from '@/constants/page-path'
import { classNames } from '@/utils/html-class'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { selectIsAuth, setIsAuth } from '@/redux/authSlice'
import { Button } from '@mui/base'
import authService from '@/services/auth'
import notify from '@/configs/notify'
import { redirectTo } from '@/utils/browser'
import articleService from '@/services/article'
import { Article } from '@/types/api-object'
import navBarConfig from '@/configs/nav-bar'

export default function NavBar() {
	const router = useRouter()
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth)
	const currentPath = router.asPath;
	const { articleId } = router.query;
	const [searchValue, setSearchValue] = useState<string>('')
	const [searchResult, setSearchResult] = useState([])

	const navigation = [
		{ name: 'Home', href: pageRoutes.home, current: currentPath === pageRoutes.home },
		{ name: 'Feeds', href: pageRoutes.article, current: [pageRoutes.article, pageRoutes.articleContent(articleId)].includes(currentPath) },
		{ name: 'About me', href: pageRoutes.me.intro, current: currentPath === pageRoutes.me.intro },
	]

	const handleLogout = () => {
		authService.logout()
		dispatch(setIsAuth(false))
		notify.info("You're logged out. Redirecting...")
		redirectTo({ router, path: pageRoutes.auth.LOGIN })
	}
	const handleSearching = async (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}
	// TODO: Handle call API to get search result after 2s from user stop typing
	useEffect(() => {
		if (searchValue.trim() !== "" || searchValue.trim().length >= 3) {
			const searchTimeoutId = setTimeout(async () => {
				const apiRes = await articleService.searchByTitle(searchValue)
				apiRes.data && setSearchResult(apiRes.data)
			}, 2000);

			return () => { clearTimeout(searchTimeoutId) }
		} else {
			setSearchResult([])
		}
	}, [searchValue])

	return (
		<Disclosure as="nav" className="bg-gray-100 sticky top-0 z-30 backdrop-blur-sm bg-opacity-75">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex gap-x-5 h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									<Image
										className="block h-8 w-auto lg:hidden"
										src="/favicon-512x512.png"
										alt="Your Company"
										width={200}
										height={200}
									/>
									<Image
										className="hidden h-10 w-auto lg:block"
										src="/favicon-512x512.png"
										alt="Your Company"
										width={200}
										height={200}
									/>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={classNames(
													item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-700 hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>

							{/* TODO: SEARCH BAR */}
							<Menu as="div" className="relative flex-1 ml-3 w-max">
								<form className="flex items-center flex-1 w-full">
									<label htmlFor="voice-search" className="sr-only">Search</label>
									<div className="relative w-full">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
										</div>
										<input type="text" id="voice-search"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Search users, posts, ...."
											required
											onChange={handleSearching}
										/>
										<button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
											<svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path></svg>
										</button>
									</div>
								</form>
								<div className={classNames(
									searchValue.trim() === "" && "hidden",
									`search-results absolute w-full right-0 left-0 z-30 mt-1 origin-top-right 
									rounded-md bg-white py-1 shadow-lg ring-1 ring-black 
									ring-opacity-5 focus:outline-none max-h-[80vh] overflow-y-auto`
								)}>
									{searchResult.map((article: Article, index) => (
										<Menu.Item key={index}>
											{({ active }) => (
												<Link
													href={pageRoutes.articleContent(article.id)}
													className={classNames(
														active ? 'bg-gray-100' : '',
														'block px-4 py-2 text-sm text-gray-700'
													)}
												>
													{article.title}
												</Link>
											)}
										</Menu.Item>
									))}
									{!searchResult.length && (
										<span className='block px-4 py-2 text-sm text-gray-700 select-none'>
											No result
										</span>
									)}
								</div>
							</Menu>

							{/* TODO: TOOLS */}
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
											<span className="sr-only">Open user menu</span>
											<Image
												className="h-8 w-8 rounded-full"
												src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
												width={100}
												height={100}
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											{(isAuth ? navBarConfig.menuItems.forUser : navBarConfig.menuItems.forGuest).map((menuItem, index) => (
												<Menu.Item key={index}>
													{({ active }) => (
														<Link
															href={menuItem.href}
															className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														>
															{menuItem.name}
														</Link>
													)}
												</Menu.Item>
											))}
											{isAuth && (
												<Menu.Item >
													<Button
														className={classNames('w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-200')}
														onClick={handleLogout}
													>
														Logout
													</Button>
												</Menu.Item>
											)}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
