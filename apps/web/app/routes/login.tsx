import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import authenticator from '@services/auth.server';
import { sessionStorage } from '@services/session.server';
import { Button } from '@sscan/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@sscan/shared/ui/card';
import { Input } from '@sscan/shared/ui/input';
import { Label } from '@sscan/shared/ui/label';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log('SESSION_SECRET', import.meta.env.SESSION_SECRET);
  console.log('VITE_SESSION_SECRET', import.meta.env.VITE_SESSION_SECRET);
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });

  const session = await sessionStorage.getSession(request.headers.get('Cookie'));

  const error = session.get('sessionErrorKey');
  return { error };
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const result = await authenticator.authenticate('user-pass', request, {
    successRedirect: '/',
    failureRedirect: '/login',
    throwOnError: true,
    context,
  });
  console.log(result);

  return result;
};

export default function Login() {
  const { error } = useLoaderData<typeof loader>();
  console.log(error);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form method="post">
        <Card className="w-full max-w-sm p-4 bg-muted/40">
          <CardHeader className="mb-4 space-y-2">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 mb-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="me@example.com"
                required={true}
                className="p-2 rounded border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required={true}
                className="p-2 rounded border"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button className="w-full rounded" type="submit">
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}
