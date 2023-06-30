import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../_app"
import ProfileLayout from "@/layouts/profile-layout"
import pageRoutes from "@/constants/page-path"
import Hr from "@/components/hr"
import { classNames } from "@/utils/html-class"
import { TextField } from "@mui/material"
import { User } from "@/types/api-object"
import browserUtils from "@/utils/browser"
import storageKeys from "@/constants/local-storage-keys"

const Page: NextPageWithLayout = () => {
	const [currentUser, setCurrentUser] = useState<User>()
	useEffect(() => {
		const currentUser = browserUtils.store.get(storageKeys.USER)
		currentUser && setCurrentUser(currentUser)
	}, [])
	return (
		<div className="h-full">
			<section className="bg-gray-900 hidden">
				<h1>HAHAhh</h1>
				<div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen">
					<div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
						<h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Change Password
						</h2>
						<form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
							<div>
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
								<input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
							</div>
							<div>
								<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
								<input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
							</div>
							<div>
								<label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
								<input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
								</div>
								<div className="ml-3 text-sm">
									<label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
								</div>
							</div>
							<button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
						</form>
					</div>
				</div>
			</section>
			<section className="rounded shadow-lg px-5 py-3 mb-5">
				<h1 className="font-bold text-xl">Change password</h1>
				<p className="py-2 px-1">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minima veniam molestiae odio voluptatum tempora praesentium hic sint magni temporibus pariatur, laudantium inventore atque quisquam recusandae. Error, dignissimos rem! Laboriosam.
				</p>
				<div className="flex gap-2 p-1">
					<TextField
						label="Current password"
						type="password"
						autoComplete="password"
						onBlur={undefined}
						fullWidth
						value={"fsfđf"}
					/>
					<TextField
						label="New password"
						type="password"
						autoComplete="password"
						onBlur={undefined}
						fullWidth
						value={"fsfđf"}
					/>
					<TextField
						label="Confirm"
						type="password"
						autoComplete="password"
						onBlur={undefined}
						fullWidth
						value={"fsfđf"}
					/>
				</div>
				<Hr.Basic />
				<button className={classNames(
					"bg-blue-500 mt-2 text-white border-blue-100 hover:border-blue-500",
					"font-bold rounded-md px-4 py-2 border-2 "
				)}
				>
					Change
				</button>
			</section>
			<section className="rounded shadow-lg px-5 py-3 mb-5">
				<h1 className="font-bold text-xl">Forget password?</h1>
				<p className="py-2 px-1">
					Type your email and password here to reset password in this account
				</p>
				<div className="flex gap-2 p-1">
					<TextField
						label="Email"
						type="email"
						autoComplete="email"
						onBlur={undefined}
						fullWidth
						value={currentUser?.email}
					/>
					<TextField
						label="Password"
						type="password"
						autoComplete="email"
						onBlur={undefined}
						fullWidth
						value={"fsfđf"}
					/>
				</div>
				<Hr.Basic className="mt-2" />
				<button className={classNames(
					"bg-slate-100 mt-2 text-black hover:bg-slate-300",
					"font-bold rounded-md px-4 py-2 "
				)}
				>
					Reset
				</button>
			</section>
			<section className="rounded shadow-lg px-5 py-3 mb-5">
				<h1 className="font-bold text-xl">Delete account</h1>
				<p className="py-2 px-1">
					This action will delete your account forever and you cannot use it to login to our website.
				</p>
				<div className="py-2 px-4 rounded bg-slate-50 mb-2">
					<h2 className="font-medium mb-2">Why do you want to delete your account?</h2>
					<div className="flex items-center mb-4 cursor-pointer">
						<input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
						<label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
					</div>
					<div className="flex items-center mb-4">
						<input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
						<label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
					</div>
					<div className="flex items-center">
						<input checked id="default-radio-3" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
						<label htmlFor="default-radio-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Others...</label>
					</div>
				</div>

				<div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
					<span className="sr-only">Info</span>
					<div>
						<span className="font-medium">Dangerous! </span>
						Think carefully before doing it
					</div>
				</div>
				<Hr.Basic />
				<button className={classNames(
					"bg-red-500 mt-2 text-white border-red-100 hover:border-red-500",
					"font-bold rounded-md px-4 py-2 border-2 "
				)}
				>
					Delete your account
				</button>
			</section>
		</div>
	)
}

Page.getLayout = (page: ReactElement) => (<ProfileLayout>{page}</ProfileLayout>)
export default Page;