import { AuthGuard } from '@/components/auth-guard'
import { AppSidebar } from '@/components/app-sidebar'
import { DocumentosAcessosManager } from '@/components/documentos-acessos-manager'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'

export default function DocumentosAcessosPage() {
  return (
    <AuthGuard>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold">Documentos, Planilhas e Acessos</h1>
                    <p className="text-muted-foreground">
                      Centralize documentos internos, planilhas e credenciais de acesso
                    </p>
                  </div>
                </div>
                <DocumentosAcessosManager />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </AuthGuard>
  )
}