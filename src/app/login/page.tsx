import { login, signup } from './actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-slate-800">Welcome Back</CardTitle>
          <CardDescription className="text-slate-600">
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="rounded-lg focus-visible:ring-slate-400"
                placeholder="example@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="rounded-lg focus-visible:ring-slate-400"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex flex-col space-y-2 pt-4">
              <Button 
                formAction={login}
                className="w-full h-11 rounded-lg bg-slate-800 hover:bg-slate-900 text-white transition-colors"
                type="submit"
              >
                Sign In
              </Button>
              <Separator className="my-4" />
              <Button
                formAction={signup}
                variant="outline"
                className="w-full h-11 rounded-lg border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
                type="submit"
              >
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="mt-2">
          <p className="text-center text-sm text-slate-500">
            By continuing, you agree to our Terms of Service
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}