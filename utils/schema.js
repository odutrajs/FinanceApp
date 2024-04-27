import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budget", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

export const Expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull().default(0),
  budgetId: integer("budgetId").references(() => Budgets.id),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

export const Wage = pgTable("wage", {
  id: serial("id").primaryKey(),
  value: numeric("value").notNull(),
  createdBy: varchar("createdBy").notNull(),
});

export const Investiment = pgTable("investiment", {
  id: serial("id").primaryKey(),
  value: numeric("value").notNull(),
  createdBy: varchar("createdBy").notNull(),
});

export const Contribution = pgTable("contribution", {
  id: serial("id").primaryKey(),
  value: numeric("value").notNull(),
  createdBy: varchar("createdBy").notNull(),
});

export const Goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  shortTerm: numeric("shortTerm").notNull(),
  midTerm: numeric("midTerm").notNull(),
  longTerm: numeric("longTerm").notNull(),
  createdBy: varchar("createdBy").notNull(),
});
