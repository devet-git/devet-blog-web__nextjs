import dynamic from 'next/dynamic';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import DOMPurify from 'dompurify'
import MainLayout from '@/layouts/main-layout';
import { GetServerSideProps, NextPage } from 'next';
import withAuth from '@/middlewares/with-auth';
import TurndownService from 'turndown';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import sunEditorConfig from '@/configs/suneditor';
import SunEditorCore from "suneditor/src/lib/core";
import { useFormik } from 'formik';
const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});
import * as Yup from "yup"
import { classNames } from '@/utils/html-class';
import { UploadBeforeHandler, UploadBeforeReturn } from 'suneditor-react/dist/types/upload';

type Props = {
	name: string
}

const Page: NextPage<Props> = ({ name }) => {
	const turndownService = new TurndownService();

	// TODO: editor config
	const [editorContent, setEditorContent] = useState<string>('');
	const editorRef = useRef<SunEditorCore>()
	const getEditorInstance = (editor: SunEditorCore) => {
		editorRef.current = editor
	}
	const handlePost = () => {
		if (editorRef.current) {
			const content = editorRef.current.getContents(false);
			const cleanedContent = DOMPurify.sanitize(content) //TODO: clean HTML
			const markdown = turndownService.turndown(cleanedContent)
			// console.log(editorContent);
			// console.log(markdown);
		}
	}
	const onEditorChange = (content: string) => { setEditorContent(content) }
	const handleImageUploadBefore = (files: File[], info: object, uploadHandler: UploadBeforeHandler): UploadBeforeReturn => {
		// uploadHandler is a function
		console.log(files, info)
		setEditorContent(prevContent => prevContent + "hahah")
		return true;
	}
	const handleImageUpload = (targetImgElement: any, index: any, state: any, imageInfo: any, remainingFilesCount: any) => {
		// console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
		setEditorContent(prevContent => prevContent + "hahah")
		console.log(editorContent);


	}
	//TODO: formik
	const formik = useFormik({
		initialValues: {
			title: '',
			authors: '',
			description: ''
		},
		validationSchema: Yup.object({
			title: Yup.string().min(10).max(255).required("Title is required"),
			// authors: Yup.string().min(8).max(255).required("Password is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				handlePost()
			} catch (err) {
				helpers.setStatus({ success: false });
				// helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		},
	})
	return (
		<MainLayout>
			<form onSubmit={formik.handleSubmit} className='px-5 py-2'>
				<Card className='w-full'>
					<CardContent className='grid grid-flow-col gap-x-2'>
						<TextField
							id="articleTitle"
							name="title"
							type="text"
							label="Title"
							autoComplete="title"
							autoFocus
							error={!!(formik.touched.title && formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.title}
							required
						/>
						<TextField
							id="authors"
							name="authors"
							type="text"
							label="Author"
							autoComplete="author"
							error={!!(formik.touched.authors && formik.errors.authors)}
							helperText={formik.touched.authors && formik.errors.authors}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.authors}
						/>
						<TextField
							id="description"
							name="description"
							type="text"
							label="Description"
							autoComplete="description"
							error={!!(formik.touched.description && formik.errors.description)}
							helperText={formik.touched.description && formik.errors.description}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.description}
						/>
					</CardContent>
					<Divider />
					<CardActions className={classNames(
						(!editorContent || editorContent === `<p><br></p>` || !formik.isValid) && "hidden",
						"flex justify-end pr-6"
					)}
					>
						<Button
							variant="outlined"
							type="submit"
						>
							Post
						</Button>
					</CardActions>
				</Card>
			</form>
			<section className='px-5'>
				<SunEditor
					getSunEditorInstance={getEditorInstance}
					disable={!formik.isValid}
					name='editor'
					placeholder="Please type here..."
					setOptions={{
						buttonList: sunEditorConfig.toolbar,
					}}
					setContents={editorContent}
					onChange={onEditorChange}
					onImageUploadBefore={handleImageUploadBefore}
					onImageUpload={handleImageUpload}
				/>
			</section>
		</MainLayout>
	);
}
// export const getServerSideProps: GetServerSideProps<Repo> = async () => {
// 	return {
// 		props: {
// 			name: "haha"
// 		}
// 	}
// }

export default withAuth(Page)
