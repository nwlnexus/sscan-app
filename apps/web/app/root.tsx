import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react'
import '@/css/global.css'
import { ThemeProvider } from 'next-themes'

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
              return location.pathname
            }}
          />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="mb-4 text-4xl font-bold">Oops!</h1>
      <p className="mb-4 text-xl">
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : error instanceof Error
            ? error.message
            : 'Unknown Error'}
      </p>
      <Link
        to="/"
        className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Go back to homepage
      </Link>
    </div>
  )
}
