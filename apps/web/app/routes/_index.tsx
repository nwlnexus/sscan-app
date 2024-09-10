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

export default function Landing() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-full max-w-sm p-4 bg-muted/40">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>Enter your email below to login to your account.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required={true}
							className="p-2 rounded"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" required={true} className="p-2 rounded" />
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full">Sign in</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
