import Image from "next/image";
import Head from "next/head";
import '@/app/globals.css'
import Link from "next/link";
import { useFormik } from "formik"
import * as Yup from "yup";
import { TextField } from "@mui/material";
export default function LoginPage() {

	const formik = useFormik({
		initialValues: {
			name: "",
			email: '',
			password: '',
			rePassword: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
			name: Yup.string().min(2).max(255).required("Name is required"),
			password: Yup.string().min(8).max(255).required("Password is required"),
			rePassword: Yup.string().oneOf([Yup.ref('password')], 'Password not match!!').required("Re-password is required")
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
				<title>Register - Devet Blog</title>
			</Head>
			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Link href={'/'}>
						<Image
							className="mx-auto h-10 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt="Your Company"
							width={500}
							height={500}
						/>
					</Link>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create new account
					</h2>
				</div>

				<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action="#" method="POST">
						<TextField
							id="name"
							name="name"
							type="name"
							label="Name"
							autoComplete="name"
							fullWidth
							required
							error={!!(formik.touched.name && formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.name}
						/>
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
						<div className="mt-2">
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
						<div className="mt-2">
							<TextField
								id="rePassword"
								name="rePassword"
								type="password"
								label="Re-password"
								autoComplete="rePassword"
								required
								fullWidth
								error={!!(formik.touched.rePassword && formik.errors.rePassword)}
								helperText={formik.touched.rePassword && formik.errors.rePassword}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.rePassword}
							/>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Register
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already have account.{' '}
						<Link href="login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Login
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}
