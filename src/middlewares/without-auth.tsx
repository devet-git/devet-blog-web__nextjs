import { useEffect } from 'react';
import localStorageKeys from '@/constants/local-storage-keys';
import { NextApiHandler, NextApiRequest, NextApiResponse, NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Custom404 from '@/pages/404';
import AuthGuard from '@/guard/auth';
import { ReactNode, ComponentType } from 'react';
import NoAuthGuard from '@/guard/no-auth';

type Props = {
	children: ReactNode;
}
// eslint-disable-next-line react/display-name
const withoutAuth = (Component: ComponentType<Props>) => (props: any) => (
	<NoAuthGuard>
		<Component {...props} />
	</NoAuthGuard>
)

export default withoutAuth;