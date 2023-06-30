import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import ProfileLayout from "@/layouts/profile-layout"

const Page: NextPageWithLayout = () => {
	return (
		<h1>Help  and report</h1>
	)
}
Page.getLayout = (page: ReactElement) => (<ProfileLayout>{page}</ProfileLayout>)
export default Page