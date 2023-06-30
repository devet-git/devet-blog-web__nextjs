import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import ProfileLayout from "@/layouts/profile-layout"
import pageRoutes from "@/constants/page-path"
import { GetServerSideProps } from "next"
import { Article } from "@/types/api-object"
import DontHaveArticle from "@/components/article/dont-have"
import ArticleList from "@/components/article/list"
import api from "@/configs/api"
import apiEndpoints from "@/constants/api-endpoints"
import wrapper from "@/redux/store"
import { selectUserId } from "@/redux/authSlice"
import { useSelector } from "react-redux"

type Props = {
	articles: Article[]
}
const Page: NextPageWithLayout<Props> = ({ articles }) => {

	if (!articles.length) return <DontHaveArticle />

	return (
		<div className="flex h-full justify-center items-center">
			<ArticleList articles={articles} />

		</div>
	)
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	try {
		const userId = context.query.uid
		const pageSize = 6; //* can editor this var

		const apiRes = await api.get(apiEndpoints.article.GET_ALL_BY_USER_ID(userId, 1, pageSize))
		const articles = apiRes.data.data.articles;
		// const totalArticle = apiRes.data.data.totalArticle;
		// const totalPage = Math.ceil(totalArticle / pageSize)
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
Page.getLayout = (page: ReactElement) => (<ProfileLayout>{page}</ProfileLayout>)
export default Page;