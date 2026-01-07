import dotenv from "dotenv";
import mongoose from "mongoose";
import { navigationModel } from "../models/navigationModel.js";
import { labelModel } from "../models/labelModel.js";
import { tableDataModel } from "../models/tableDataModel.js";

dotenv.config({ path: "./.env" });

const navItems = [
  { nav: "/", title: "Dashboard" },
  { nav: "/analytics", title: "Analytics" },
];

const labelItems = [
  { key: "totalRevenue", title: "Total Revenue", usedIn: ["dashboard_card"] },
  { key: "totalOrders", title: "Total Orders", usedIn: ["dashboard_card"] },
  { key: "totalCustomers", title: "Total Customers", usedIn: ["dashboard_card"] },
  { key: "revenueByMonth", title: "Revenue Over Time", usedIn: ["revenue_chart"] },
  { key: "ordersByCategory", title: "Orders by Category", usedIn: ["category_chart"] },
  { key: "recentOrders", title: "Recent Orders", usedIn: ["orders_table"] },
  { key: "orderId", title: "Order ID", usedIn: ["orders_table"] },
  { key: "customer", title: "Customer", usedIn: ["orders_table"] },
  { key: "amount", title: "Amount", usedIn: ["orders_table"] },
  { key: "status", title: "Status", usedIn: ["orders_table"] },
];

const tableDocs = [
  {
    tableName: "dashboard_summary",
    columns: ["key", "value"],
    rows: [
      { key: "totalRevenue", value: "$47,600" },
      { key: "totalOrders", value: 1298 },
      { key: "totalCustomers", value: 876 },
    ],
  },
  {
    tableName: "analytics_summary",
    columns: ["key", "value"],
    rows: [
      { key: "totalVisits", value: "12,840" },
      { key: "activeUsers", value: "391" },
      { key: "conversionRate", value: "4.7%" },
    ],
  },
  {
    tableName: "revenue_by_month",
    columns: ["label", "value"],
    rows: [
      { label: "Jan", value: 3200 },
      { label: "Feb", value: 2100 },
      { label: "Mar", value: 4310 },
      { label: "Apr", value: 3850 },
      { label: "May", value: 7000 },
      { label: "Jun", value: 6600 },
      { label: "Jul", value: 8100 },
      { label: "Aug", value: 9400 },
      { label: "Sep", value: 8000 },
      { label: "Oct", value: 7600 },
    ],
  },
  {
    tableName: "orders_by_category",
    columns: ["label", "value"],
    rows: [
      { label: "Electronics", value: 355 },
      { label: "Clothes", value: 399 },
      { label: "Home", value: 210 },
      { label: "Toys", value: 110 },
      { label: "Other", value: 224 },
    ],
  },
  {
    tableName: "orders",
    columns: ["Order ID", "Customer", "Amount", "Status"],
    rows: [
      { "Order ID": "#0010", Customer: "Alice Chan", Amount: "$228.00", Status: "Delivered" },
      { "Order ID": "#0009", Customer: "Sarah Brown", Amount: "$410.00", Status: "Pending" },
      { "Order ID": "#0008", Customer: "Michael Smith", Amount: "$159.99", Status: "Processing" },
      { "Order ID": "#0007", Customer: "Jane Doe", Amount: "$85.25", Status: "Cancelled" },
      { "Order ID": "#0006", Customer: "Chris Evans", Amount: "$312.49", Status: "Delivered" },
    ],
  },
  {
    tableName: "analytics_top_pages",
    columns: ["pageName", "views", "avgTime", "bounceRate"],
    rows: [
      { pageName: "/home", views: 5812, avgTime: "00:02:53", bounceRate: "27%" },
      { pageName: "/pricing", views: 2270, avgTime: "00:01:19", bounceRate: "19%" },
      { pageName: "/features", views: 1584, avgTime: "00:01:45", bounceRate: "23%" },
      { pageName: "/blog", views: 1210, avgTime: "00:03:01", bounceRate: "34%" },
      { pageName: "/contact", views: 964, avgTime: "00:00:57", bounceRate: "45%" },
    ],
  },
];

async function seed() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not set");
    }

    await mongoose.connect(mongoUrl);
    console.log("Connected to Mongo");

    await navigationModel.bulkWrite(
      navItems.map((item) => ({
        updateOne: {
          filter: { nav: item.nav },
          update: { $set: item },
          upsert: true,
        },
      }))
    );
    console.log("Navigation seeded");

    await labelModel.bulkWrite(
      labelItems.map((item) => ({
        updateOne: {
          filter: { key: item.key },
          update: { $set: item },
          upsert: true,
        },
      }))
    );
    console.log("Labels seeded");

    await tableDataModel.bulkWrite(
      tableDocs.map((doc) => ({
        updateOne: {
          filter: { tableName: doc.tableName },
          update: { $set: doc },
          upsert: true,
        },
      }))
    );
    console.log("Tables seeded");

    await mongoose.disconnect();
    console.log("Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed", err);
    process.exit(1);
  }
}

seed();
