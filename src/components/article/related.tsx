/* eslint-disable @next/next/no-img-element */
type Categories = "Tutorial" | "Article"
type Props = {
	postTime?: string,
	title?: string,
	description?: string,
	category?: Categories[],
	posterName?: string
}
export default function ArticleRelated(props: Props) {
	const { postTime, title, description, posterName } = props;
	return (
		<article className="max-w-xs">
			<a href="#">
				<img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" className="mb-5 rounded-lg" alt="Image 1" />
			</a>
			<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
				<a href="#">Our first office</a>
			</h2>
			<p className="mb-4 font-light text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
			<a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
				Read in 2 minutes
			</a>
		</article>
	)
}
