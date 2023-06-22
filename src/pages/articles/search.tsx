import DontHaveArticle from "@/components/article/dont-have";
import ArticlePreview2 from "@/components/article/preview2";
import api from "@/configs/api";
import apiEndpoints from "@/constants/api-endpoints";
import MainLayout from "@/layouts/main-layout";
import { Article } from "@/types/api-object";
import { GetServerSideProps, NextPage } from "next";
type PageProps = {
	articles: Article[]
}
const Page: NextPage<PageProps> = ({ articles }) => {
	return (
		<MainLayout>
			{!articles.length ? (<DontHaveArticle />) : (
				<div className="grid grid-cols-3 gap-x-2 gap-y-5 px-8 py-5">
					{articles && articles.map((article: Article) => (
						<ArticlePreview2
							key={article.id}
							id={article.id}
							title={article.title}
							createdDate={article.createdDate}
							poster={article.poster} images={article.images} />
					))}
				</div>
			)}
		</MainLayout>
	)
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
	const { query } = context;
	const { q } = query
	try {
		const apiRes = await api.get(apiEndpoints.article.SEARCH(q))
		const articles = apiRes.data.data
		return {
			props: {
				articles
			}
		}
	} catch (error) {
		return {
			props: {
				articles: []
			}
		}
	}
}
export default Page;