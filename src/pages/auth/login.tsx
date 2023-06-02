import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup"
import { TextField } from "@mui/material";
export default function LoginPage() {

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
				//
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
			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Link href={'/'}>
						<Image
							className="mx-auto h-10 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt="Logo"
							width={600}
							height={600}
						/>
					</Link>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={formik.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email Address"
							autoComplete="email"
							fullWidth
							required
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
								required
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

					<p className="mt-10 text-center text-sm text-gray-500">
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
