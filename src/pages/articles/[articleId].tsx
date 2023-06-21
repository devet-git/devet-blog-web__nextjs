import ArticleComment from "@/components/article/comment";
import ArticleCommentForm from "@/components/article/comment -form";
import ArticleRelatedCollection from "@/components/article/related-collection";
import SignupEmailNotification from "@/components/article/signup-email-notification";
import MainLayout from "@/layouts/main-layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";


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
	const markdown = `
	fsfsdfsdf
---------

![](http://localhost:3000/_next/image?url=%2Fme.jpg&w=256&q=75)
	`

	return (
		<>
			<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
				<div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
					<article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
						<PosterInfo />
						<section>
							{/*eslint-disable-next-line react/no-children-prop */}
							<ReactMarkdown children={markdown} />
							<div dangerouslySetInnerHTML={{ __html: `<h2>fsfsdfsdf</h2><div class="se-component se-image-container __se__float-none"><figure style=""><p><img src="http://localhost:3000/_next/image?url=%2Fme.jpg&amp;w=256&amp;q=75" alt="" data-rotate="" data-proportion="true" data-size="," data-align="none" data-percentage="auto,auto" data-file-name="image?url=%2Fme.jpg&amp;w=256&amp;q=75" data-file-size="0" data-origin="," style="transform: rotate(-180deg);"></p></figure></div>` }} />
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
