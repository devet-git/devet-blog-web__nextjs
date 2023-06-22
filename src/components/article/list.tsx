/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import ArticlePreview from "./preview";
import pageRoutes from "@/constants/page-path";
import { Article } from "@/types/api-object";

type Props = {
	articles: Article[]
}
export default function ArticleList({ articles }: Props) {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
					<h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
					<p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
				</div>
				<div className="grid gap-8 lg:grid-cols-2">
					{articles && articles.map((article) => (
						<ArticlePreview
							key={article.id}
							id={article.id}
							title={article.title}
							postTime={article.createdDate}
							description={article.description}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
