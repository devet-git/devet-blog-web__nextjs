import ArticleComment from "@/components/article/comment";
import ArticleCommentForm from "@/components/article/comment -form";
import ArticleRelatedCollection from "@/components/article/related-collection";
import SignupEmailNotification from "@/components/article/signup-email-notification";
import MainLayout from "@/layouts/main-layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useRouter } from "next/router";
const PosterInfo = () => (
	<header className="mb-4 lg:mb-6 not-format">
		<address className="flex items-center mb-6 not-italic">
			<div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
				<img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
				<div>
					<a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">Jese Leos</a>
					<p className="text-base font-light text-gray-500 dark:text-gray-400">Graphic Designer, educator & CEO Flowbite</p>
					<p className="text-base font-light text-gray-500 dark:text-gray-400"><time dateTime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
				</div>
			</div>
		</address>
	</header>
)
/* eslint-disable @next/next/no-img-element */
const Page = () => {
	const router = useRouter();
	const { articleId } = router.query;

	return (
		<>
			<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
				<div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
					<article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
						<PosterInfo />
						<section>
							main content
						</section>
						<section className="not-format">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
							</div>
							<ArticleCommentForm />
							{/* <ArticleComment /> */}
						</section>
					</article>
				</div>
			</main>
			<ArticleRelatedCollection />

			{/* <SignupEmailNotification /> */}
		</>
	)
}

Page.getLayout = (page: ReactJSXElement) => (<MainLayout>{page}</MainLayout>)
export default Page;
