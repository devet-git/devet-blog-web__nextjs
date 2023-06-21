import api from "@/configs/api";
import endpoints from "@/constants/endpoints";
import apiErrorHandler from "@/handlers/apiError";
export type CreateArticleParams = {
	title: string,
	authors: string[],
	description: string,
	content: string
}
const articleService = {
	async create(article: CreateArticleParams) {
		try {
			const res = await api.post(endpoints.article.CREATE, article)
			return res.data || null;

		} catch (error) {
			apiErrorHandler(error);
		}
	},

}

export default articleService;