import { Button } from '@mui/material';
import { ReactElement, useEffect, useState, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import DOMPurify from 'dompurify'
import MainLayout from '@/layouts/main-layout';
const toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'],
	[{ 'align': [] }],
	['blockquote', 'code-block'],
	// [{ 'header': 1 }, { 'header': 2 }],
	[{ 'list': 'ordered' }, { 'list': 'bullet' }],
	[{ 'script': 'sub' }, { 'script': 'super' }],
	[{ 'indent': '-1' }, { 'indent': '+1' }],
	// [{ 'direction': 'rtl' }],
	[{ 'size': ['small', false, 'large', 'huge'] }],
	[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	["link", "image", "video"],
	[{ 'color': [] }, { 'background': [] }],
	// [{ 'font': [] }],
	['clean'],// clean formatting button
]

const Page = () => {
	const [value, setValue] = useState('');
	const handlePost = () => {
		const cleanedValue = DOMPurify.sanitize(value)
		//CAll API
	}
	return (
		<div className='relative'>
			{typeof window !== 'undefined' && (
				<ReactQuill
					theme="snow"
					value={value}
					onChange={setValue}
					className='min-h-[85vh] overflow-y-auto mt-[10vh] bg-white [&_.ql-toolbar]:z-10'
					modules={{
						toolbar: { container: toolbarOptions },
					}}
					placeholder='Type your content...'
				/>
			)}
			{/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
			<button
				onClick={handlePost}
				className="fixed lg:top-[calc(10vh+10px)] md:top-[calc(10vh+30px)] right-5 z-10 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-black to-cyan-300 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
			>
				<span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
					Post
				</span>
			</button>
		</div>
	)
}
Page.getLayout = (page: ReactElement) => (<MainLayout>	{page}</MainLayout>)

export default Page;
