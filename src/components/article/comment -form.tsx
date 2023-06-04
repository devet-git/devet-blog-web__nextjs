/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import ArticlePreview from "./preview";
import pagePaths from "@/constants/page-path";

export default function ArticleCommentForm() {
	return (
		<>
			<form className="mb-6">
				<div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
					<label htmlFor="comment" className="sr-only">Your comment</label>
					<textarea id="comment" rows={6}
						className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
						placeholder="Write a comment..." required></textarea>
				</div>
				<button type="submit"
					className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
					Post comment
				</button>
			</form>
		</>
	)
}