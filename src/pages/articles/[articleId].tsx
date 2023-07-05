import ArticleComment from "@/components/article/comment";
import ArticleCommentForm from "@/components/article/comment-form";
import { ArticlePageProps } from "@/components/article/preview";
import ArticleRelatedList from "@/components/article/related-list";
import SignupEmailNotification from "@/components/article/signup-email-notification";
import api from "@/configs/api";
import apiEndpoints from "@/constants/api-endpoints";
import MainLayout from "@/layouts/main-layout";
import { Article } from "@/types/api-object";
import dateTimeUtils from "@/utils/datetime";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Custom404 from "../404";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";



type Props = {
	article: Article
}
/* eslint-disable @next/next/no-img-element */
const Page: NextPageWithLayout<Props> = ({ article }) => {
	if (!article) return <Custom404 />

	const PosterInfo = () => (
		<header className="mb-4 lg:mb-6 not-format">
			<address className="flex items-center mb-6 not-italic">
				<div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
					<Image
						className="mr-4 w-16 h-16 rounded-full"
						src="/me.jpg"
						alt="Jese Leos"
						width={100}
						height={100}
					/>
					<div>
						<a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{article.poster.email}</a>
						<p className="text-base font-light text-gray-500 dark:text-gray-400">Graphic Designer, educator & CEO Flowbite</p>
						<p className="text-base font-light text-gray-500 dark:text-gray-400">
							{dateTimeUtils.format(article.createdDate)}
						</p>
					</div>
				</div>
			</address>
		</header>
	)
	return (
		<>
			<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
				<div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
					<article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
						<PosterInfo />
						<section className="not-format">
							<h1 className="font-bold text-4xl mb-3">{article.title}</h1>
							<div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
						</section>
						<section className="not-format mt-10">
							<div className="flex justify-between items-center mb-3">
								<h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion</h2>
							</div>
							<ArticleCommentForm />
							{/* <ArticleComment /> */}
						</section>
					</article>
				</div>
			</main>
			<ArticleRelatedList articles={[article]} />
			{/* <SignupEmailNotification /> */}
		</>
	)
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const { query } = context;
	if (query && query.articleId) {
		try {
			const apiRes = await api.get(apiEndpoints.article.GET_BY_ID(query.articleId as string))
			const article = apiRes.data.data;
			return {
				props: {
					article
				}
			}
		} catch (error) {
			return {
				props: {
					article: null
				}
			}
		}
	}
	return {
		props: {
			article: null
		}
	}
}

Page.getLayout = (page: ReactElement) => (<MainLayout>{page}</MainLayout>)
export default Page;
