import { classNames } from "@/utils/html-class"

type Props = {
	className?: string
}
const Hr = {
	Basic: ({ className }: Props) => {
		return (
			<hr className={classNames(className, "h-px bg-gray-200 border-0 dark:bg-gray-700")} />
		)
	}
}
export default Hr;