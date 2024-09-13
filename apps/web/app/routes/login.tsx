import { Form } from '@remix-run/react'
import { Button } from '@sscan/shared/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@sscan/shared/ui/card'

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form action="/auth/auth0" method="post">
        <Card className="w-full max-w-sm bg-muted/40 p-4">
          <CardHeader className="mb-4 space-y-2">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription className="text-sm">
              Enter your credentials to login to your account.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button className="w-full rounded" type="submit">
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  )
}
