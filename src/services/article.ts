import api from "@/configs/api";
import apiEndpoints from "@/constants/api-endpoints";
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
			const res = await api.post(apiEndpoints.article.CREATE, article)
			return res.data || null;

		} catch (error) {
			apiErrorHandler(error);
		}
	},
	async getAll() {
		try {
			const res = await api.get(apiEndpoints.article.GET_ALL)
			return res.data || null;

		} catch (error) {
			apiErrorHandler(error);
		}
	},
	async searchByTitle(keyword: string) {
		try {
			const res = await api.get(apiEndpoints.article.SEARCH(keyword))
			return res.data || null;

		} catch (error) {
			apiErrorHandler(error);
		}
	},

}

export default articleService;