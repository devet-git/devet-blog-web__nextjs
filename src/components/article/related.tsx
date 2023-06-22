import pageRoutes from "@/constants/page-path";
import { Article } from "@/types/api-object";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
type Categories = "Tutorial" | "Article"
type Props = {
	article: Article
}
export default function ArticleRelated({ article }: Props) {
	return (
		<article className="max-w-xs">
			<Link href={pageRoutes.article.CONTENT(article.id)}>
				<img src={article.images[0]} className="mb-5 rounded-lg" alt={`${article.title}-cover image`} />
			</Link>
			<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
				<a href="#">{article.title}</a>
			</h2>
			<p className="line-clamp-3 mb-4 font-light text-gray-500 dark:text-gray-400">{article.description}</p>
			<Link
				href={pageRoutes.article.CONTENT(article.id)}
				className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
			>
				Read in 2 minutes
			</Link>
		</article>
	)
}
