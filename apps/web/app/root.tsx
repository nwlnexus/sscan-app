import { type LinksFunction } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from '@sscan/shared/styles/global.css?url';
import { ThemeProvider } from 'next-themes';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
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

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>An error occurred: {JSON.stringify(error, null, 2)}</div>;
}
