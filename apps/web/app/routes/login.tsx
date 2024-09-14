import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Form, redirect } from '@remix-run/react'
import { Button, type ButtonProps } from '@sscan/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@sscan/shared/ui/card'
import { Input } from '@sscan/shared/ui/input'
import { Label } from '@sscan/shared/ui/label'
import { getAuthenticator, type AuthStrategy } from '@/services/auth.server'
import { AuthStrategies } from '@/services/auth_strategies'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authenticator = await getAuthenticator({ context })
  const profile = await authenticator.isAuthenticated(request)

  if (profile) {
    return redirect('/dashboard')
  }

  return { profile }
}

interface SocialButtonProps extends ButtonProps {
  provider: AuthStrategy
  label: string
}

const SocialButton = ({ provider, label, ...props }: SocialButtonProps) => (
  <Form action={`/auth/${provider}`} method="post">
    <Button className="w-full rounded" {...props}>
      {label}
    </Button>
  </Form>
)

export default function LoginRoute() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm bg-muted/40 p-4">
          <CardHeader className="mb-4 space-y-2">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription className="text-sm">
              Enter your credentials to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form action="/auth/form" method="post">
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="me@example.com"
                    required={true}
                    className="rounded border p-2"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required={true}
                    className="rounded border p-2"
                  />
                </div>
                <Button type="submit" className="w-full rounded">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col justify-between gap-2 border-t pt-4">
            <SocialButton provider={AuthStrategies.GOOGLE} label="Login with Google" disabled />
            <SocialButton provider={AuthStrategies.AUTH0} label="Login with Auth0" disabled />
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
