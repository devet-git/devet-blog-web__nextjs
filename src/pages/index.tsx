import Categories from "@/components/category/categories";
import ArticleList from "@/components/article/list";
import Slider from "@/components/slider";
import MainLayout from "@/layouts/main-layout";

const Page = () => {
	return (
		<>
			<Slider />
			<Categories />
			{/* <ArticleList  /> */}
		</>
	)
}
Page.getLayout = (page: any) => (<MainLayout>{page}</MainLayout>)
export default Page;
