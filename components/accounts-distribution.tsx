import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Account {
  id: number
  name: string
  value: number
  percentage: number
  color: string
}

interface AccountsDistributionProps {
  accountsData: Account[]
  totalValue: number
}

export function AccountsDistribution({ accountsData, totalValue }: AccountsDistributionProps) {
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
          {accountsData.length} contas ativas
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