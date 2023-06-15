import { useEffect } from 'react';
import localStorageNames from '@/constants/local-storage-names';
import { NextApiHandler, NextApiRequest, NextApiResponse, NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Custom404 from '@/pages/404';
import AuthGuard from '@/guard/auth';
import { ReactNode, ComponentType } from 'react';

type Props = {
	children: ReactNode;
}
// eslint-disable-next-line react/display-name
const withAuth = (Component: ComponentType<Props>) => (props: any) => (
	<AuthGuard>
		<Component {...props} />
	</AuthGuard>
)

export default withAuth;