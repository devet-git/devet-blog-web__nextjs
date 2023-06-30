import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import ProfileLayout from "@/layouts/profile-layout";
import Image from "next/image";
import { User } from "@/types/api-object";
import Hr from "@/components/hr";
import Link from "next/link";
import pageRoutes from "@/constants/page-path";
import browserUtils from "@/utils/browser";
import storageKeys from "@/constants/local-storage-keys";
import { useRouter } from "next/router";
import dateTimeUtils from "@/utils/datetime";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";

const Page: NextPageWithLayout = () => {
	const router = useRouter();
	const userId = router.query.userId
	const currentUser: User = browserUtils.store.get(storageKeys.USER)
	return (
		<div className="profile-page h-[50vh] p-5 px-14 pt-20 rounded bg-cover bg-[url('https://images.unsplash.com/photo-1516687401797-25297ff1462c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60')]" >
			<div className="bg-white rounded shadow-md py-2 px-5">
				<section className="statistic-container -translate-y-12  flex justify-around items-end">
					<section className="w-2/6 flex gap-5">
						<div className="flex flex-col items-center w-fit">
							<span className="text-lg font-bold">1k</span>
							<span className="text-slate-600">Follower</span>
						</div>
						<Link
							href={pageRoutes.myAccount.ARTICLES(userId)}
							className="flex flex-col items-center w-fit"
						>
							<span className="text-lg font-bold">23</span>
							<span className="text-slate-600">Posts</span>
						</Link>
						<div className="flex flex-col items-center  w-fit">
							<span className="text-lg font-bold">23</span>
							<span className="text-slate-600">Following</span>
						</div>
					</section>
					<div className="relative">
						<Image
							className="inline-block rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
							width={100}
							height={100}
						/>
						<Tooltip title="Change avatar" arrow placement="top-start">
							<PencilSquareIcon className="w-6 cursor-pointer absolute bottom-0 right-0" />
						</Tooltip>
					</div>
					<div className="w-2/6 ">
						<button className="float-right px-7 py-2 bg-blue-500 font-bold text-white rounded hover:ring-2">
							Follow
						</button>
					</div>
				</section>
				<section className="flex flex-col items-center justify-center p-5 pt-0">
					<h1 className="font-bold text-2xl">{currentUser?.fullName}</h1>
					<p>{currentUser.email}</p>
					<p>{dateTimeUtils.format(currentUser.createdDate)}</p>
					<p className="mt-5">Fullstack developer</p>
					<p className="">Tay Nguyen University</p>
				</section>
				<Hr.Basic />
				<section className="text-center px-20 py-5">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis consequuntur nostrum velit quae officia voluptates, expedita sit, error vel sapiente debitis! Porro quibusdam deleniti laudantium eveniet voluptatem nemo blanditiis consequuntur!
				</section>
			</div>
		</div>
	)
}

Page.getLayout = (page: ReactElement) => (<ProfileLayout>{page}</ProfileLayout>)
export default Page;
