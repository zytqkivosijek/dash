import { IconInnerShadowTop } from "@tabler/icons-react"
import { AuthForm } from '@/components/auth-form'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
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
      
      {/* Right side - Image/Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 relative">
        <div className="flex flex-col justify-center items-center p-12 text-center">
          <div className="max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Bem-vindo ao Sistema
            </h2>
            <p className="text-lg text-muted-foreground">
              Gerencie suas contas financeiras, visualize relatórios e controle seus ativos de forma simples e eficiente.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Dashboard</h3>
                <p className="text-muted-foreground">Visão geral completa dos seus dados</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Contas Ativas</h3>
                <p className="text-muted-foreground">Gerencie suas contas financeiras</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Relatórios</h3>
                <p className="text-muted-foreground">Análises detalhadas e gráficos</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Temas</h3>
                <p className="text-muted-foreground">Personalize a aparência</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}