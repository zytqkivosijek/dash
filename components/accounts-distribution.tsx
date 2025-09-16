import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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

const totalValue = accountsData.reduce((sum, account) => sum + account.value, 0)

export function AccountsDistribution() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Distribuição por Contas</h2>
          <p className="text-sm text-muted-foreground">
            Análise detalhada dos ativos por categoria
          </p>
        </div>
        <Badge variant="outline" className="text-muted-foreground">
          8 contas ativas
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Contas Ativas</CardTitle>
          <CardDescription>
            Total: US$ {totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {accountsData.map((account, index) => (
            <div
              key={account.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${account.color}`} />
                <div>
                  <div className="font-medium text-sm">{account.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {account.percentage}% do total
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-medium">
                  US$ {account.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="w-16 h-1 bg-muted rounded-full mt-1">
                  <div
                    className={`h-full rounded-full ${account.color}`}
                    style={{ width: `${Math.max(account.percentage * 2, 2)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-3 mt-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div>
                  <div className="font-semibold text-sm">Total Geral</div>
                  <div className="text-xs text-muted-foreground">
                    100% do portfólio
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-bold">
                  US$ {totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="w-16 h-1 bg-primary rounded-full mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}