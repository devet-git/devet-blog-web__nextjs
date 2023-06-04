import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from 'next/router'
import pagePaths from '@/constants/page-path'
import { classNames } from '@/utils/html-class'

const menuItems = {
	forGuest: [
		{ name: "Resgister", href: pagePaths.auth.register },
		{ name: "Login", href: pagePaths.auth.login },
	],
	forUser: [
		{ name: "My profile", href: "#" },
		{ name: "Setting", href: "#" },
		{ name: "Sign out", href: "#" },
		{ name: "Create your article", href: pagePaths.createArticle },
	],
}

export default function NavBar() {
	const router = useRouter()
	const currentPath = router.asPath;
	const { articleId } = router.query;

	const navigation = [
		{ name: 'Home', href: pagePaths.home, current: currentPath === pagePaths.home },
		{ name: 'Feeds', href: pagePaths.article, current: [pagePaths.article, pagePaths.articleContent(articleId)].includes(currentPath) },
		{ name: 'Post article', href: pagePaths.createArticle, current: currentPath === pagePaths.createArticle },
		{ name: 'About me', href: pagePaths.me.intro, current: currentPath === pagePaths.me.intro },
	]
	return (
		<Disclosure as="nav" className="bg-gray-100 sticky top-0 z-30 backdrop-blur-sm bg-opacity-75">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
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
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
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
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<button
									type="button"
									className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
								>
									<span className="sr-only">View notifications</span>
									<BellIcon className="h-6 w-6" aria-hidden="true" />
								</button>

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
											{("user" === "user" ? menuItems.forGuest : menuItems.forUser).map((menuItem, index) => (
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
