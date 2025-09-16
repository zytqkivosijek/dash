import { IconInnerShadowTop } from "@tabler/icons-react"
import { AuthForm } from '@/components/auth-form'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Left side - Auth Form */}
      <div className="w-full max-w-md flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <IconInnerShadowTop className="size-5" />
              </div>
              <span className="text-xl font-semibold">Acme Inc.</span>
            </div>
          </div>
          
          {/* Auth Form */}
          <AuthForm />
        </div>
      </div>
    </div>
  )
}