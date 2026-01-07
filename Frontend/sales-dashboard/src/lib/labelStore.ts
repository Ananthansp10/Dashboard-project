import { create } from "zustand";

type Labels = Record<string, string>;

const initialLabels: Labels = {
  // Dashboard labels
  totalRevenue: "Total Revenue",
  totalOrders: "Total Orders",
  totalCustomers: "Total Customers",
  revenueByMonth: "Revenue Over Time",
  ordersByCategory: "Orders by Category",
  recentOrders: "Recent Orders",

  // Analytics summary + charts
  totalVisits: "Total Visits",
  activeUsers: "Active Users",
  conversionRate: "Conversion Rate",
  userGrowth: "User Growth Over Time",
  trafficSources: "Traffic Sources",
  topPages: "Top Performing Pages",

  // Analytics tables
  pageName: "Page Name",
  views: "Views",
  avgTime: "Avg. Time",
  bounceRate: "Bounce Rate",

  // Shared recent orders table columns
  orderId: "Order ID",
  customer: "Customer",
  amount: "Amount",
  status: "Status",
};

type LabelStore = {
  labels: Labels;
  setLabel: (key: string, value: string) => void;
  setLabels: (incoming: Labels) => void;
  editModal: { open: boolean; key: string | null };
  openEditModal: (key: string) => void;
  closeEditModal: () => void;
};

export const useLabelStore = create<LabelStore>((set) => ({
  labels: initialLabels,
  editModal: { open: false, key: null },
  setLabels: (incoming) =>
    set((state) => ({
      labels: {
        ...state.labels,
        ...incoming,
      },
    })),
  setLabel: (key, value) =>
    set((state) => ({
      labels: {
        ...state.labels,
        [key]: value,
      },
    })),
  openEditModal: (key) =>
    set({
      editModal: { open: true, key },
    }),
  closeEditModal: () =>
    set({
      editModal: { open: false, key: null },
    }),
}));

