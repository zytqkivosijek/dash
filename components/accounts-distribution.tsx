import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const accountsData = [
  {
    id: 1,
    name: "GUARDA",
    percentage: "2.2% do total",
    value: "US$ 7.367,39",
    color: "bg-blue-500",
    icon: "🛡️"
  },
  {
    id: 2,
    name: "OLD GOLD (BTC)",
    percentage: "7.4% do total",
    value: "US$ 24.300,05",
    color: "bg-yellow-500",
    icon: "₿"
  },
  {
    id: 3,
    name: "PAY RETAILERS",
    percentage: "39.2% do total",
    value: "US$ 128.383,86",
    color: "bg-purple-500",
    icon: "🏪"
  },
  {
    id: 4,
    name: "SCALA",
    percentage: "3.0% do total",
    value: "US$ 9.695,84",
    color: "bg-indigo-500",
    icon: "📊"
  },
  {
    id: 5,
    name: "CRYPTO PAY",
    percentage: "2.0% do total",
    value: "US$ 6.550,52",
    color: "bg-orange-500",
    icon: "₿"
  },
  {
    id: 6,
    name: "NEW GOLD",
    percentage: "44.1% do total",
    value: "US$ 144.562,17",
    color: "bg-green-500",
    icon: "🟢"
  },
  {
    id: 7,
    name: "NEW GOLD 2",
    percentage: "0.0% do total",
    value: "US$ 0,00",
    color: "bg-gray-400",
    icon: "⚪"
  },
  {
    id: 8,
    name: "ADS (Conta Simples)",
    percentage: "2.0% do total",
    value: "US$ 6.700,00",
    color: "bg-pink-500",
    icon: "📱"
  }
]

export function AccountsDistribution() {
  const totalValue = accountsData.reduce((sum, account) => {
    const numericValue = parseFloat(account.value.replace(/[US$\s,]/g, '').replace('.', ''))
    return sum + numericValue
  }, 0)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Distribuição por Contas</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Visão geral das contas e seus saldos
          </span>
          <span className="@[540px]/card:hidden">Contas e saldos</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {accountsData.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${account.color} flex items-center justify-center`}>
                <span className="text-xs opacity-0">{account.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{account.name}</span>
                <span className="text-xs text-muted-foreground">{account.percentage}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-semibold text-sm tabular-nums">{account.value}</span>
            </div>
          </div>
        ))}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span className="tabular-nums">US$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}