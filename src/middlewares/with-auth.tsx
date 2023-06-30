import { ReactElement, useEffect } from 'react';
import storageKeys from '@/constants/local-storage-keys';
import { NextApiHandler, NextApiRequest, NextApiResponse, NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Custom404 from '@/pages/404';
import { ReactNode, ComponentType } from 'react';
import AuthGuard from '@/guard/auth';
import { NextPageWithLayout } from '@/pages/_app';

type Props = {
	children?: ReactNode,
	getLayout?: (page: ReactElement) => ReactNode

}
// const withAuth = (WrappedComponent: any) => {
// 	const EnhancedComponent = (props: any) => {
// 		const getLayout = WrappedComponent.getLayout ?? ((page: ReactElement) => page)
// 		return <WrappedComponent {...props} />
// 	}
// 	console.log(typeof EnhancedComponent);

// 	return (
// 		<AuthGuard>
// 			<EnhancedComponent />
// 		</AuthGuard>
// 	)
// }
//TODO: Advanced but the same above
// eslint-disable-next-line react/display-name
const withAuth = (Component: any) => (props: any) => {
	const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
	return (
		<AuthGuard>
			{getLayout(<Component {...props} />)}
		</AuthGuard>
	)
}

export default withAuth;