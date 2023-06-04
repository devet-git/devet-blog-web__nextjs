import { ReactElement } from 'react'
import MainLayout from "@/layouts/main-layout";
import Image from 'next/image';


const skillList: string[] = [
	"HTML",
	"CSS/SCSS",
	"JavaScript",
	"ReactJS/NextJS",
	"NodeJS/ExpressJS",
	"Spring Boot"
]
const Page = () => {
	return (
		<>
			<div className="container mx-auto p-4">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<div className="flex gap-x-3">
						<div className="flex-shrink-0 mr-4">
							<Image
								src="/me.jpg"
								alt="Avatar"
								className="w-28 h-28 rounded-full"
								width={200}
								height={200}
							/>
						</div>
						<div className='flex-shrink-0'>
							<h2 className="text-2xl font-bold text-gray-800">Bui Quang Thang</h2>
							<p className="text-gray-600">FE & BE Developer</p>
							<p className="text-gray-600">devet.279@gmail.com</p>
							<p className="text-gray-600">Cao Thang, Eakao, Buon Ma Thuot</p>
						</div>
						<div className='flex items-start justify-end w-full [&_a]:mx-1 [&_a]:block'>
							<a
								href='https://www.facebook.com/thangq.279/'
								className="flex-grow-0 bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"
								target='_blank'
							>
								Facebook
							</a>
							<a
								href='https://github.com/devet-git'
								className="bg-black hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
								target='_blank'
							>
								Github
							</a>
							{/* <button
								className="middle none center rounded-lg bg-pink-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								data-ripple-light="true"
							>
								<i className="material-icons">dashboard</i>
							</button> */}
						</div>
					</div>

					<hr className="my-8 border-t-2 border-gray-200" />
					<div className="flex flex-col md:flex-row">
						<div className="md:w-1/3">
							<h3 className="text-lg font-bold mb-4">Objective</h3>
							<p className="text-gray-800">
								To obtain a challenging position as a front-end developer in a reputable organization where my skills and experience can be effectively utilized.
							</p>
						</div>
						<div className="md:w-2/3 md:pl-8">
							<h3 className="text-lg font-bold mb-4">Skills</h3>
							<ul className="">
								{skillList.map((skillName, index) => (
									<li className='flex items-center space-x-3' key={index}>
										<svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
										<span>{skillName}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<hr className="my-8 border-t-2 border-gray-200" />
					<h3 className="text-lg font-bold mb-4">Experience</h3>
					<div>
						<div className="flex mb-4">
							<div className="w-1/3">
								<p className="text-gray-800">Feb 2023 - May 2023</p>
								<p className="text-gray-600 font-bold">Backend developer</p>
							</div>
							<div className="w-2/3 md:pl-8">
								<p className="text-gray-800 font-bold">TMA Solutions Binh Dinh</p>
								<p className="text-gray-600">Designed and developed the Human Resources Management API</p>
							</div>
						</div>

					</div>

					<hr className="my-8 border-t-2 border-gray-200" />
					<h3 className="text-lg font-bold mb-4">Education</h3>
					<div>
						<div className="flex mb-4">
							<div className="w-1/3">
								<p className="text-gray-800">2019 - 2023</p>
								<p className="text-gray-600 font-bold">Bachelors Degree</p>
							</div>
							<div className="w-2/3 md:pl-8">
								<p className="text-gray-800 font-bold">Tay Nguyen University</p>
								<p className="text-gray-600">Graduated with honors with a degree in Information Technology</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

Page.getLayout = (page: ReactElement) => (<MainLayout>{page}</MainLayout>)
export default Page;
