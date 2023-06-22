import pageRoutes from "@/constants/page-path";
import Link from "next/link";

const DontHaveArticle = () => (
	<div className="h-[85vh] flex flex-col gap-4 justify-center items-center ">
		<h1 className="text-4xl">Don&apos;t have any article</h1>
		<p>Please type other keyword</p>
		<Link
			href={pageRoutes.article.CREATE}
			className="bg-blue-500 select-none text-white rounded-md p-2 hover:bg-blue-600"
		>
			Create article
		</Link>
	</div>
)
export default DontHaveArticle