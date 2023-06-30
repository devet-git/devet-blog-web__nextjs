import dynamic from 'next/dynamic';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { useEffect, useState, useRef, SetStateAction, ReactElement } from 'react';
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
import fileService from '@/services/file';
import articleService, { CreateArticleParams } from '@/services/article';
import notify from '@/configs/notify';
import { NextPageWithLayout } from '../_app';

type ArticleImage = {
	id: string,
	url: string
}
/**
* Convert HTML to Markdown
* @date 6/21/2023 - 8:56:11 AM
*
* @param {string} html
* @returns {string}
*/
export const htmlToMarkdown = (html: string): string => {
	const turndownService = new TurndownService();
	const cleanedValue = DOMPurify.sanitize(html) //TODO: clean HTML
	const markdown = turndownService.turndown(cleanedValue)
	return markdown;
}

const Page: NextPageWithLayout = () => {
	const [articleImages, setArticleImages] = useState<ArticleImage[]>([])
	const [editorContent, setEditorContent] = useState<string>('');
	const editorRef = useRef<SunEditorCore>()
	const formik = useFormik({
		initialValues: {
			title: '',
			authors: '',
			description: ''
		},
		validationSchema: Yup.object({
			title: Yup.string().min(10).max(255).required("Title is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				const { title, authors, description } = values;
				const content = editorRef.current?.getContents(false) || "";
				const images = removeImageInCloudFollowContent(content);

				handlePostArticle({ title, authors: [authors], images, description, content })
			} catch (err) {
				helpers.setStatus({ success: false });
				// helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		},
	})

	const getEditorInstance = (editor: SunEditorCore) => {
		editorRef.current = editor
	}
	const onEditorChange = (content: string) => { setEditorContent(content) }

	/**
	 * Replace src of image when insert: an url from API instead data:base64
	 * @date 6/20/2023 - 10:17:45 PM
	 *
	 * @param {File[]} files
	 * @param {object} info
	 * @param {UploadBeforeHandler} uploadHandler
	 * @returns {UploadBeforeReturn}
	 */
	const handleImageUploadBefore = (files: File[], info: object, uploadHandler: UploadBeforeHandler): UploadBeforeReturn => {

		files && (async () => {
			notify.info("Your image is uploading...")
			const apiRes = await fileService.upload(files[0])
			const { url, publicId } = apiRes.data[0];

			setArticleImages(prev => [...prev, { id: publicId, url }])
			editorRef.current?.insertHTML(`<img name="${publicId}" src="${url}" loading="lazy" />`);
			notify.success("Your image is upload successfully")
		})()
		return false;
	}
	const handleImageUpload = (targetImgElement: HTMLImageElement | null, index: any, state: any, imageInfo: { src: string }, remainingFilesCount: any) => {
		const url = imageInfo?.src;
		setArticleImages(prev => [...prev, { id: index, url }])
	}
	/**
	 * Remove images in cloud which is not exist in article
	 * @date 6/27/2023 - 4:08:50 PM
	 *
	 * @param {(string | undefined)} content
	 * @returns {string[]} List of image urls
	 */
	const removeImageInCloudFollowContent = (content: string | undefined): string[] => {
		const realArticleImages: string[] = []
		articleImages.forEach(async (image) => {
			if (content && !content.includes(image.url)) {
				await fileService.deleteById(image.id)
			} else {
				realArticleImages.push(image.url)
			}
		})
		return realArticleImages;
	}
	/**
	 * Post article: get content from editor and send to API
	 * @date 6/26/2023 - 11:22:36 PM
	 *
	 * @async
	 * @param {CreateArticleParams} params
	 * @returns {Promise<void>}
	 */
	const handlePostArticle = async (params: CreateArticleParams): Promise<void> => {

		const apiRes = await articleService.create(params)
		if (apiRes?.statusCode === 200) {
			formik.resetForm()
			editorRef.current?.setContents('');
			notify.success("Your article have posted successfully")
			notify.info("We will censor the content as soon as possible")
		}
		// console.log(apiRes);
		// console.log(imgIdsOfArticle);
		// console.log(content);
	}


	return (
		<>
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
					disable={!formik.isValid}
					name='editor'
					placeholder="Please type here..."
					setOptions={{
						buttonList: sunEditorConfig.toolbar,

					}}
					getSunEditorInstance={getEditorInstance}
					setContents={editorContent}
					onChange={onEditorChange}
					onImageUploadBefore={handleImageUploadBefore}
					onImageUpload={handleImageUpload}
				/>
			</section>
		</>
	);
}
Page.getLayout = (page: ReactElement) => (<MainLayout>{page}</MainLayout>)

export default withAuth(Page)
