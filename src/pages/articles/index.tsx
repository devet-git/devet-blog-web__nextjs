import ArticleCollection from "@/components/article/collection";
import MainLayout from "@/layouts/main-layout";
import { ReactElement } from "react";

const Page = () => {
	return (
		<>
			<ArticleCollection />
		</>
	)
}
Page.getLayout = (page: ReactElement) => (<MainLayout>{page}</MainLayout>)
export default Page;
