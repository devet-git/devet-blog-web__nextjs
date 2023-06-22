/* eslint-disable @next/next/no-img-element */

import pageRoutes from "@/constants/page-path";
import dateTimeUtils from "@/utils/datetime";
import Link from "next/link";

type Categories = "Tutorial" | "Article"
export type ArticlePageProps = {
	id: string,
	postTime: string,
	title: string,
	description?: string,
	category?: Categories[],
	posterName?: string,
	content?: string
}

export default function ArticlePreview(props: ArticlePageProps) {
	const { id, postTime, title, description, posterName } = props;
	return (
		<article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
			<div className="flex justify-between items-center mb-5 text-gray-500">
				<span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
					<svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
					Article
				</span>
				<span className="text-sm">{dateTimeUtils.format(postTime)}</span>
			</div>
			<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				<Link href={pageRoutes.articleContent(id)}>{title}</Link>
			</h2>
			<p className="mb-5 font-light text-gray-500 dark:text-gray-400">
				{description}
			</p>
			<div className="flex justify-between items-center">
				<div className="flex items-center space-x-4">
					<img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar" />
					<span className="font-medium dark:text-white">
						Bonnie Green
					</span>
				</div>
				<Link href={pageRoutes.articleContent(id)} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
					Read more
					<svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
				</Link>
			</div>
		</article>
	)
}