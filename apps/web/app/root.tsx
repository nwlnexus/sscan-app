import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { ThemeProvider } from 'next-themes';

import '@sscan/ui/styles/global.css?url';

import { type PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeProvider
					enableColorScheme={true}
					attribute={'class'}
					defaultTheme={'dark'}
					disableTransitionOnChange={true}
					storageKey={'sscan-theme'}
					enableSystem={true}
				>
					{children}
					<ScrollRestoration
						getKey={(location) => {
							return location.pathname;
						}}
					/>
					<Scripts />
				</ThemeProvider>
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
