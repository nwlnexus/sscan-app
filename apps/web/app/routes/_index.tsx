import { Link as RemixLink } from '@remix-run/react'
import { Button } from '@sscan/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@sscan/shared/ui/card'
import { Input } from '@sscan/shared/ui/input'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <RemixLink className="flex items-center justify-center" to="#">
          <Star className="h-6 w-6" />
          <span className="sr-only">SSCAN</span>
        </RemixLink>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Button asChild={true}>
            <RemixLink to="/login">Login</RemixLink>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Our SSCAN
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Discover the power of our innovative solution. Boost your productivity and
                  streamline your workflow.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild={true}>
                  <RemixLink to="/login">Login</RemixLink>
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div id="features" className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CheckCircle className="mb-2 h-8 w-8" />
                  <CardTitle>Easy Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Seamlessly integrate with your existing tools and workflows.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="mb-2 h-8 w-8" />
                  <CardTitle>Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Gain valuable insights with our powerful analytics dashboard.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="mb-2 h-8 w-8" />
                  <CardTitle>24/7 Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our dedicated team is always here to help you succeed.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Customers Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>CEO, TechCorp</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    "This product has revolutionized our business processes. Highly recommended!"
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Jane Smith</CardTitle>
                  <CardDescription>CTO, InnovateCo</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    "The customer support is outstanding. They're always there when we need them."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Join thousands of satisfied customers and take your business to the next level.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input placeholder="Enter your email" type="email" />
                  <Button type="submit">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 NWLNEXUS. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <RemixLink className="text-xs underline-offset-4 hover:underline" to="/tos">
            Terms of Service
          </RemixLink>
          <RemixLink className="text-xs underline-offset-4 hover:underline" to="/privacy">
            Privacy
          </RemixLink>
        </nav>
      </footer>
    </div>
  )
}
