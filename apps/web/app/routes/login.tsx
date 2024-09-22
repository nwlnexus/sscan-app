import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Form, useSearchParams } from '@remix-run/react'
import { Button, type ButtonProps } from '../../../../packages/shared/src/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../packages/shared/src/ui/card'
import { Input } from '../../../../packages/shared/src/ui/input'
import { Label } from '../../../../packages/shared/src/ui/label'
import { appAuthGuard, type AuthStrategy } from '@/services/auth.server'
import { AuthStrategies } from '@/services/auth_strategies'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  await appAuthGuard({ context, request })

  return null
}

interface SocialButtonProps extends ButtonProps {
  provider: AuthStrategy
  label: string
  redirectTo: string
}

const SocialButton = ({ provider, label, redirectTo, ...props }: SocialButtonProps) => (
  <Form action={`/auth/${provider}?redirectTo=${redirectTo}`} method="post" className="w-full">
    <Button className="w-full rounded" {...props}>
      {label}
    </Button>
  </Form>
)

export default function LoginRoute() {
  const [searchParams] = useSearchParams()
  const redirectTo =
    searchParams.get('redirectTo') ||
    btoa('/dashboard').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription className="text-sm">
              Enter your credentials to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form action={`/auth/${AuthStrategies.FORM}?redirectTo=${redirectTo}`} method="post">
              <input type="hidden" name="redirectTo" value={redirectTo} />
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
          <CardFooter className="flex w-full flex-col space-y-2">
            <SocialButton
              provider={AuthStrategies.GOOGLE}
              label="Login with Google"
              redirectTo={redirectTo}
              disabled
            />
            <SocialButton
              provider={AuthStrategies.AUTH0}
              label="Login with Auth0"
              redirectTo={redirectTo}
              disabled
            />
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
