import ArticleList from "@/components/article/list";
import api from "@/configs/api";
import apiEndpoints from "@/constants/api-endpoints";
import MainLayout from "@/layouts/main-layout";
import { GetServerSideProps, NextPage } from "next";
import { Article } from "@/types/api-object";
import Pagination from "@/components/pagination";
import DontHaveArticle from "@/components/article/dont-have";


type Props = {
	articles: Article[],
	totalPage: number,
	currentPage: any
}

const Page: NextPage<Props> = ({ articles, totalPage, currentPage }) => {
	return (
		<MainLayout>
			{!articles.length ? (<DontHaveArticle />) : (
				<>
					<ArticleList articles={articles} />
					<div className="flex justify-center w-full">
						<Pagination
							totalPage={totalPage}
							urlTemplate="/articles?page="
							currentPage={currentPage}
						/>
					</div>
				</>
			)}
		</MainLayout >
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const { query } = context;
	const { page } = query;

	// TODO: Redirect to /articles?page=1 when url have not ?page= param
	if (!query.page) {
		return {
			redirect: {
				destination: '/articles?page=1',
				permanent: true, // Set it to false if the redirection is temporary
			},
		};
	}

	//TODO: Fetch data from API
	try {
		const pageSize = 6; //* can editor this var
		const apiRes = await api.get(apiEndpoints.article.GET_ALL(page, pageSize))
		const articles = apiRes.data.data.articles;
		const totalArticle = apiRes.data.data.totalArticle;
		const totalPage = Math.ceil(totalArticle / pageSize)

		return {
			props: {
				articles,
				totalPage,
				currentPage: page
			}
		}
	} catch (error) {
		return {
			props: {
				articles: [],
				totalPage: 0,
				currentPage: 0
			}
		}
	}
}
// Page.getLayout = (page: ReactElement) => (<MainLayout>{page}</MainLayout>)
export default Page;
