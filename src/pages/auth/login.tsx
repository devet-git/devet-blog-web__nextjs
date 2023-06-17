import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup"
import { TextField } from "@mui/material";
import authService from "@/services/auth";
import { useRouter } from "next/router";
import pagePaths from "@/constants/page-path";
import notify from "@/configs/notify";
import { NextPage } from "next";
import withoutAuth from "@/middlewares/without-auth";
import { setIsAuth } from "@/redux/authSlice";
import { useDispatch } from "react-redux"

const Page: NextPage = () => {
	const router = useRouter();
	const dispatch = useDispatch()

	const handleLogin = async (values: any) => {
		const { email, password } = values
		const data = await authService.login({ email, password })
		if (data) {
			dispatch(setIsAuth(true)); //TODO: set global state
			notify.success() //TODO: show notify
			//TODO: redirect to home page or before page
			setTimeout(() => {
				router.push(router.query.continueUrl?.toString() || pagePaths.home)
			}, 2000);
		}
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
			password: Yup.string().min(8).max(255).required("Password is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				handleLogin(values);
			} catch (err) {
				helpers.setStatus({ success: false });
				// helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		},
	})
	return (
		<>
			<Head>
				<title>Login - Devet Blog</title>
			</Head>
			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-5 lg:px-8 bg-white">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Link href={'/'}>
						<Image
							className="mx-auto h-10 w-auto"
							src="/favicon-512x512.png"
							alt="Logo"
							width={600}
							height={600}
						/>
					</Link>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
					<section className="flex justify-evenly mt-10">
						<button
							type="button"
							className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
							onClick={() => {
								notify.info("The function is developing")
							}}
						>
							<svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
							With Facebook
						</button>
						<button
							type="button"
							className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
							onClick={() => {
								notify.info("The function is developing")
							}}
						>
							<svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
							With Google
						</button>
					</section>
				</div>
				<div className="inline-flex items-center justify-center w-full">
					<hr className="w-64 h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
					<span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
				</div>
				<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={formik.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email Address"
							autoComplete="email"
							fullWidth
							error={!!(formik.touched.email && formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
						<div>
							<div className="flex items-center justify-between flex-row-reverse">
								<div className="text-sm mb-2">
									<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
										Forgot password?
									</a>
								</div>
							</div>
							<TextField
								id="password"
								name="password"
								type="password"
								label="Password"
								autoComplete="password"
								fullWidth
								error={!!(formik.touched.password && formik.errors.password)}
								helperText={formik.touched.password && formik.errors.password}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</div>

						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in
						</button>
					</form>

					<p className="mt-5 text-center text-sm text-gray-500">
						Not have account?{' '}
						<Link href="register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Register
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}
export default withoutAuth(Page);