import { ReactElement } from "react"
import { NextPageWithLayout } from "../../_app"
import ProfileLayout from "@/layouts/profile-layout"
import pageRoutes from "@/constants/page-path"

const Page: NextPageWithLayout = () => {
	return (
		<div className="flex h-full justify-center items-center">
			Account
		</div>
	)
}

Page.getLayout = (page: ReactElement) => (<ProfileLayout>{page}</ProfileLayout>)
export default Page;