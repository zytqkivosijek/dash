import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Cost {
  id: number
  name: string
  value: number
  percentage: number
  color: string
}

interface CostsDistributionProps {
  costsData: Cost[]
  totalValue: number
}

export function CostsDistribution({ costsData, totalValue }: CostsDistributionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Distribuição de Custos</h2>
          <p className="text-sm text-muted-foreground">
            Análise detalhada dos custos por categoria
          </p>
        </div>
        <Badge variant="outline" className="text-muted-foreground">
          {costsData.length} categorias de custos
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Custos Operacionais</CardTitle>
          <CardDescription>
            Total: US$ {totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {costsData.map((cost, index) => (
            <div
              key={cost.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${cost.color}`} />
                <div>
                  <div className="font-medium text-sm">{cost.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {cost.percentage}% do total
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-medium">
                  US$ {cost.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="w-16 h-1 bg-muted rounded-full mt-1">
                  <div
                    className={`h-full rounded-full ${cost.color}`}
                    style={{ width: `${Math.max(cost.percentage * 2, 2)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-3 mt-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div>
                  <div className="font-semibold text-sm">Total de Custos</div>
                  <div className="text-xs text-muted-foreground">
                    100% dos custos operacionais
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-bold">
                  US$ {totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="w-16 h-1 bg-destructive rounded-full mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}