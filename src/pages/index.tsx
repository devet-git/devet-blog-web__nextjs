import Categories from "@/components/category/categories";
import ArticleCollection from "@/components/article/collection";
import Slider from "@/components/slider";
import MainLayout from "@/layouts/main-layout";

const Page = () => {
	return (
		<>
			<Slider />
			<Categories />
			<ArticleCollection />
		</>
	)
}
Page.getLayout = (page: any) => (<MainLayout>{page}</MainLayout>)
export default Page;
