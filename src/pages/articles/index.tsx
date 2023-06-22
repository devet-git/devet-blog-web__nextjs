import ArticleList, { Article } from "@/components/article/list";
import api from "@/configs/api";
import apiEndpoints from "@/constants/api-endpoints";
import MainLayout from "@/layouts/main-layout";
import { GetServerSideProps, NextPage } from "next";
import { ReactElement, useEffect } from "react";
import Custom500 from "../500";


type Props = {
	articles: Article[],
}
const Page: NextPage<Props> = ({ articles }) => {

	return (
		<MainLayout>
			{articles.length ? (<ArticleList articles={articles} />) : <Custom500 />}
		</MainLayout>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	try {
		const apiRes = await api.get(apiEndpoints.article.GET_ALL)
		const articles = apiRes.data.data;
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

// Page.getLayout = (page: ReactElement) => (<MainLayout>{page}</MainLayout>)


export default Page;
