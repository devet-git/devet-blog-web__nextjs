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
		<>
			{typeof window !== 'undefined' && (
				<ReactQuill
					theme="snow"
					value={value}
					onChange={setValue}
					className='h-[80vh] overflow-y-auto bg-white [&_.ql-toolbar]:sticky [&_.ql-toolbar]:top-0 [&_.ql-toolbar]:bg-indigo-100 [&_.ql-toolbar]:z-10'
					modules={{
						toolbar: { container: toolbarOptions },
					}}
					placeholder='Type your content...'
				/>
			)}
			{/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
			<Button
				variant="outlined"
				size="large"
				onClick={handlePost}
				className='right-0'
			>
				Post
			</Button>
		</>
	)
}
Page.getLayout = (page: ReactElement) => (<MainLayout>	{page}</MainLayout>)

export default Page;
