import Categories from "@/components/category/categories";
import ArticleList from "@/components/article/list";
import Slider from "@/components/slider";
import MainLayout from "@/layouts/main-layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
	return (
		<>
			<Slider />
			<Categories />
			{/* <ArticleList  /> */}
		</>
	)
}
Page.getLayout = (page: ReactElement) => (<MainLayout>{page}</MainLayout>)
export default Page;
