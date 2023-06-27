import pageRoutes from "@/constants/page-path";

const navBarConfig = {
	menuItems: {
		forGuest: [
			{ name: "Resgister", href: pageRoutes.auth.REGISTER },
			{ name: "Login", href: pageRoutes.auth.LOGIN },
		],
		forUser: [
			{ name: "My profile", href: "#" },
			{ name: "Setting", href: "#" },
			{ name: "Create article", href: pageRoutes.article.CREATE },
		],
	}
}

export default navBarConfig