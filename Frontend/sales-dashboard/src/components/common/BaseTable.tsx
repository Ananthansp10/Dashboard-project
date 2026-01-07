import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface BaseTableProps {
  columns: Array<
    | string
    | {
        key: string;
        header: React.ReactNode;
      }
  >;
  data: Record<string, any>[];
}

const BaseTable: React.FC<BaseTableProps> = ({ columns, data }) => {
  const normalizedColumns = columns.map((col) =>
    typeof col === "string" ? { key: col, header: col } : col
  );

  return (
    <div className="w-full overflow-auto rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            {normalizedColumns.map((col) => (
              <TableHead key={col.key} className="text-base font-semibold uppercase">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              {normalizedColumns.map((col) => (
                <TableCell key={col.key}>{row[col.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BaseTable;
