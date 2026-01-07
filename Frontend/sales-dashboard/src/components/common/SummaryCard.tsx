import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface SummaryCardProps {
  title: React.ReactNode;
  value: string | number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => {
  return (
    <Card className="w-full min-w-[150px] flex-grow">
      <CardHeader>
        <CardTitle className="text-base text-muted-foreground font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary py-2">{value}</div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
