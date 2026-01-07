"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SummaryCard from "@/components/common/SummaryCard";
import BaseChart from "@/components/common/BaseChart";
import BaseTable from "@/components/common/BaseTable";
import LabelWithEdit from "@/components/common/LabelWithEdit";
import EditLabelModal from "@/components/common/EditLabelModal";
import { useLabelStore } from "@/lib/labelStore";
import { getNav } from "@/services/navigationService";
import { getLabels, updateLabel } from "@/services/labelService";
import { getTable } from "@/services/tableService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ANALYTICS_LABEL_DEFAULT_USAGE: Record<string, string[]> = {
  totalVisits: ["analytics_summary"],
  activeUsers: ["analytics_summary"],
  conversionRate: ["analytics_summary"],
  userGrowth: ["analytics_chart"],
  trafficSources: ["analytics_chart"],
  topPages: ["analytics_table"],
  revenueByMonth: ["dashboard_chart", "analytics_chart"],
  ordersByCategory: ["dashboard_chart", "analytics_chart"],
  recentOrders: ["dashboard_table", "analytics_table"],
  orderId: ["dashboard_table", "analytics_table"],
  customer: ["dashboard_table", "analytics_table"],
  amount: ["dashboard_table", "analytics_table"],
  status: ["dashboard_table", "analytics_table"],
};

export default function AnalyticsPage() {
  const pathname = usePathname();
  const { labels, setLabel, setLabels, editModal, openEditModal, closeEditModal } = useLabelStore();

  const [sidebarNav, setSidebarNav] = React.useState<{ label: string; href: string }[]>([]);
  const [summaryData, setSummaryData] = React.useState<{ key: string; value: string | number }[]>([]);
  const [revenueData, setRevenueData] = React.useState<{ xAxisData: string[]; seriesData: number[] }>({
    xAxisData: [],
    seriesData: [],
  });
  const [ordersByCategoryData, setOrdersByCategoryData] = React.useState<{ xAxisData: string[]; seriesData: number[] }>({
    xAxisData: [],
    seriesData: [],
  });
  const [tableColumns, setTableColumns] = React.useState<string[]>([]);
  const [tableData, setTableData] = React.useState<Record<string, string | number>[]>([]);
  const [labelUsage, setLabelUsage] = React.useState<Record<string, string[]>>({});
  const [usageDialog, setUsageDialog] = React.useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  React.useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const res = await getNav();
        const items =
          res?.nav?.map((item: { nav: string; title: string }) => ({
            label: item.title || item.nav,
            href: item.nav,
          })) ?? [];
        setSidebarNav(items);
      } catch (error) {
        console.error("Failed to load navigation", error);
      }
    };

    fetchNavigation();
  }, []);

  const navItems = sidebarNav;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [labelRes, summaryRes, revenueRes, categoryRes, tableRes] = await Promise.allSettled([
          getLabels(),
          getTable("analytics_summary"),
          getTable("revenue_by_month"),
          getTable("orders_by_category"),
          getTable("orders"),
        ]);

        if (labelRes.status === "fulfilled" && Array.isArray(labelRes.value?.labels)) {
          const apiLabels = labelRes.value.labels.reduce((acc: Record<string, string>, item: { key: string; title: string }) => {
            acc[item.key] = item.title;
            return acc;
          }, {});
          setLabels(apiLabels);

          const usageMap = labelRes.value.labels.reduce((acc: Record<string, string[]>, item: { key: string; usedIn?: string[] }) => {
            const apiUsedIn = Array.isArray(item.usedIn) ? item.usedIn : [];
            acc[item.key] =
              apiUsedIn.length ? apiUsedIn : ANALYTICS_LABEL_DEFAULT_USAGE[item.key] || [];
            return acc;
          }, { ...ANALYTICS_LABEL_DEFAULT_USAGE });
          setLabelUsage(usageMap);
        } else {
          setLabelUsage(ANALYTICS_LABEL_DEFAULT_USAGE);
        }

        if (summaryRes.status === "fulfilled" && Array.isArray(summaryRes.value?.table?.rows)) {
          setSummaryData(
            summaryRes.value.table.rows.map((row: Record<string, string | number>) => ({
              key: String(row.key ?? ""),
              value: row.value ?? "",
            }))
          );
        }

        if (revenueRes.status === "fulfilled" && Array.isArray(revenueRes.value?.table?.rows)) {
          const xAxisData: string[] = [];
          const seriesData: number[] = [];
          revenueRes.value.table.rows.forEach((row: Record<string, string | number>) => {
            const label = row.label ?? row.month ?? row.x ?? "";
            const raw = row.value ?? row.y ?? 0;
            const value = typeof raw === "number" ? raw : Number(raw);
            if (label !== "" && Number.isFinite(value)) {
              xAxisData.push(String(label));
              seriesData.push(value);
            }
          });
          setRevenueData({ xAxisData, seriesData });
        }

        if (categoryRes.status === "fulfilled" && Array.isArray(categoryRes.value?.table?.rows)) {
          const xAxisData: string[] = [];
          const seriesData: number[] = [];
          categoryRes.value.table.rows.forEach((row: Record<string, string | number>) => {
            const label = row.label ?? row.category ?? "";
            const raw = row.value ?? row.count ?? 0;
            const value = typeof raw === "number" ? raw : Number(raw);
            if (label !== "" && Number.isFinite(value)) {
              xAxisData.push(String(label));
              seriesData.push(value);
            }
          });
          setOrdersByCategoryData({ xAxisData, seriesData });
        }

        if (tableRes.status === "fulfilled" && Array.isArray(tableRes.value?.table?.columns)) {
          setTableColumns(tableRes.value.table.columns);
          if (Array.isArray(tableRes.value.table.rows)) {
            setTableData(tableRes.value.table.rows);
          }
        }
      } catch (error) {
        console.error("Failed to load analytics data", error);
      }
    };

    fetchData();
  }, [setLabels]);

  const handleEditLabel = (key: string) => {
    const usages = labelUsage[key] ?? ANALYTICS_LABEL_DEFAULT_USAGE[key] ?? [];
    if (Array.isArray(usages) && usages.length > 1) {
      setUsageDialog({
        open: true,
        message: `This label is used in: ${usages.join(", ")}`,
      });
    }
    openEditModal(key);
  };

  const handleSaveLabel = (value: string) => {
    if (editModal.key) {
      updateLabel(editModal.key, value)
        .then(() => setLabel(editModal.key!, value))
        .catch((err) => console.error("Failed to update label", err));
    }
    closeEditModal();
  };

  return (
    <div className="flex min-h-screen bg-muted-50">
      <aside className="fixed inset-y-0 left-0 z-20 w-56 min-h-full bg-white border-r px-5 py-8 flex flex-col gap-6 shadow-sm max-md:hidden">
        <div className="text-xl font-bold tracking-tight mb-12 pl-2">Sales Dashboard</div>
        <nav className="flex flex-col gap-2">
          {navItems.map((nav) => {
            const isActive = pathname === nav.href;
            return (
              <a
                key={nav.label}
                href={nav.href}
                className={`flex items-center px-3 py-2 rounded-lg font-medium text-base transition-all group ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-primary"
                }`}
              >
                {nav.label}
              </a>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 ml-56 px-8 py-10 max-md:ml-0 max-md:px-2 max-md:py-4 w-full transition-all">
        <section className="grid grid-cols-3 gap-5 mb-8 max-md:grid-cols-1">
          {summaryData.length === 0 ? (
            <div className="col-span-3 text-muted-foreground text-sm">No summary data.</div>
          ) : (
            summaryData.map((card) => (
              <SummaryCard
                key={card.key}
                title={
                  <LabelWithEdit
                    label={labels[card.key as string]}
                    onEdit={() => handleEditLabel(card.key as string)}
                  />
                }
                value={card.value}
              />
            ))
          )}
        </section>
        <section className="grid grid-cols-2 gap-6 mb-10 max-lg:grid-cols-1">
          <div className="bg-white rounded-xl shadow-sm p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <LabelWithEdit
                label={labels.revenueByMonth}
                onEdit={() => handleEditLabel("revenueByMonth")}
              />
            </div>
            <BaseChart
              title={labels.revenueByMonth}
              xAxisData={revenueData.xAxisData}
              seriesData={revenueData.seriesData}
              type="line"
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <LabelWithEdit
                label={labels.ordersByCategory}
                onEdit={() => handleEditLabel("ordersByCategory")}
              />
            </div>
            <BaseChart
              title={labels.ordersByCategory}
              xAxisData={ordersByCategoryData.xAxisData}
              seriesData={ordersByCategoryData.seriesData}
              type="bar"
            />
          </div>
        </section>
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <LabelWithEdit label={labels.recentOrders} onEdit={() => handleEditLabel("recentOrders")} />
          </div>
          {tableColumns.length === 0 ? (
            <div className="text-muted-foreground text-sm">No table data.</div>
          ) : (
            <BaseTable
              columns={tableColumns.map((col) => ({
                key: col,
                header: (
                  <div className="flex items-center gap-2" key={col}>
                    <LabelWithEdit
                      label={
                        col === "Order ID"
                          ? labels.orderId
                          : col === "Customer"
                          ? labels.customer
                          : col === "Amount"
                          ? labels.amount
                          : labels.status
                      }
                      onEdit={() =>
                        handleEditLabel(
                          col === "Order ID"
                            ? "orderId"
                            : col === "Customer"
                            ? "customer"
                            : col === "Amount"
                            ? "amount"
                            : "status"
                        )
                      }
                    />
                  </div>
                ),
              }))}
              data={tableData}
            />
          )}
        </section>
      </main>
      <EditLabelModal
        isOpen={editModal.open}
        label={editModal.key ? labels[editModal.key] : ''}
        onClose={closeEditModal}
        onSave={handleSaveLabel}
      />
      <Dialog open={usageDialog.open} onOpenChange={(open) => setUsageDialog((prev) => ({ ...prev, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shared label</DialogTitle>
            <DialogDescription>{usageDialog.message}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
