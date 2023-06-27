/* eslint-disable @next/next/no-img-element */

import pageRoutes from "@/constants/page-path";
import { Article } from "@/types/api-object";
import dateTimeUtils from "@/utils/datetime";
import Link from "next/link";



export default function ArticlePreview2(props: Article) {
	const { title, createdDate, id, images, poster } = props;
	return (
		<div className="group relative overflow-hidden">
			<div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
				<img
					src={images[0]}
					alt={`cover image of ${title}`}
					className="h-full w-full object-cover object-center"
				/>
			</div>
			<h3 className="mt-2 text-sm text-gray-500">
				<Link href={pageRoutes.article.CONTENT(id)}>
					<span className="absolute inset-2" >
						{dateTimeUtils.format(createdDate)}
					</span>
					{poster.email}
				</Link>
			</h3>
			<p className="text-base font-semibold text-gray-900">{title}</p>
		</div>
	)
}