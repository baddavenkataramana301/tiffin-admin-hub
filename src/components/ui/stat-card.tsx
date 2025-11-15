import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  iconBg?: string;
}

export const StatCard = ({ title, value, change, icon, iconBg = "bg-primary/10" }: StatCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-smooth">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-foreground mb-2">{value}</h3>
            {change !== undefined && (
              <div className="flex items-center gap-1">
                {isPositive && <ArrowUp className="h-4 w-4 text-success" />}
                {isNegative && <ArrowDown className="h-4 w-4 text-destructive" />}
                <span
                  className={cn(
                    "text-sm font-medium",
                    isPositive && "text-success",
                    isNegative && "text-destructive"
                  )}
                >
                  {Math.abs(change)}%
                </span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", iconBg)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
