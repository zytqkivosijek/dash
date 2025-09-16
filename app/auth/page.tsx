import { IconInnerShadowTop } from "@tabler/icons-react"
import { AuthForm } from '@/components/auth-form'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background pattern/texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <IconInnerShadowTop className="size-5" />
          </div>
          <span className="text-xl font-semibold text-white">Acme Inc</span>
        </div>
        <button className="text-slate-300 hover:text-white transition-colors">
          Login
        </button>
      </header>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
      
      {/* Bottom testimonial */}
      <div className="absolute bottom-6 left-6 max-w-md text-slate-400 text-sm">
        <p>
          "This library has saved me countless hours of work and helped me deliver 
          stunning designs to my clients faster than ever before." - Sofia Davis
        </p>
      </div>
    </div>
  )
}