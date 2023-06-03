/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-gray-100 shadow dark:bg-gray-900 mt-4">
			<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Link href="/" className="flex items-center mb-4 sm:mb-0">
						<img src="/favicon-512x512.png" className="h-8 mr-3" alt="Devet Logo" />
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Devet Blog</span>
					</Link>
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
						</li>
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
						</li>
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
						</li>
						<li>
							<a href="#" className="hover:underline">Contact</a>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <span className="hover:underline">Devet Blog™</span>. All Rights Reserved.</span>
			</div>
		</footer>


	)
}