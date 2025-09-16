import { AppSidebar } from '@/components/app-sidebar'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'

import data from "./data.json"

// Dados das contas centralizados
const accountsData = [
  {
    id: 1,
    name: "GUARDA",
    value: 7367.39,
    percentage: 2.2,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "OLD GOLD (BTC)",
    value: 24300.05,
    percentage: 7.4,
    color: "bg-yellow-500",
  },
  {
    id: 3,
    name: "PAY RETAILERS",
    value: 128383.86,
    percentage: 39.2,
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "SCALA",
    value: 9695.84,
    percentage: 3.0,
    color: "bg-indigo-500",
  },
  {
    id: 5,
    name: "CRYPTO PAY",
    value: 6550.52,
    percentage: 2.0,
    color: "bg-orange-500",
  },
  {
    id: 6,
    name: "NEW GOLD",
    value: 144562.17,
    percentage: 44.1,
    color: "bg-green-500",
  },
  {
    id: 7,
    name: "NEW GOLD 2",
    value: 0.00,
    percentage: 0.0,
    color: "bg-gray-400",
  },
  {
    id: 8,
    name: "ADS (Conta Simples)",
    value: 6700.00,
    percentage: 2.0,
    color: "bg-pink-500",
  },
]

// Calcular o total das contas
const totalValue = accountsData.reduce((sum, account) => sum + account.value, 0)

export default function Page() {
  return (
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
              <SectionCards totalAvailableBalance={totalValue} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} accountsData={accountsData} totalValue={totalValue} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
