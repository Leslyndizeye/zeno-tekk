import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { FinanceEntry } from "../database/FinanceModel";
import { logActivity } from "../middleware/ActivityLog";

interface CustomRequest extends Request {
  user?: { id: number; email: string };
}

const repo = AppDataSource.getRepository(FinanceEntry);

const parse = (entries: FinanceEntry[]) =>
  entries.map((e) => ({ ...e, amount: parseFloat(e.amount as any) }));

export const getEntries = async (req: Request, res: Response) => {
  try {
    const entries = await repo.find({ order: { date: "DESC", createdAt: "DESC" } });
    res.json({ success: true, data: parse(entries) });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getSummary = async (req: Request, res: Response) => {
  try {
    const all = parse(await repo.find({ order: { date: "DESC", createdAt: "DESC" } }));

    const now = new Date();
    const yr = now.getFullYear();
    const mo = now.getMonth();

    const thisMonth = all.filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === yr && d.getMonth() === mo;
    });

    const sum = (arr: typeof all, type: "income" | "expense") =>
      arr.filter((e) => e.type === type).reduce((s, e) => s + e.amount, 0);

    const totalIncome = sum(all, "income");
    const totalExpenses = sum(all, "expense");
    const netProfit = totalIncome - totalExpenses;

    const thisMonthIncome = sum(thisMonth, "income");
    const thisMonthExpenses = sum(thisMonth, "expense");
    const thisMonthNet = thisMonthIncome - thisMonthExpenses;

    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        netProfit,
        isProfit: netProfit >= 0,
        thisMonthIncome,
        thisMonthExpenses,
        thisMonthNet,
        isThisMonthProfit: thisMonthNet >= 0,
        incomeCount: all.filter((e) => e.type === "income").length,
        expenseCount: all.filter((e) => e.type === "expense").length,
        recentEntries: all.slice(0, 6),
      },
    });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const createEntry = async (req: CustomRequest, res: Response) => {
  try {
    const { type, amount, label, category, description, date } = req.body;

    if (!type || amount == null || !label || !date) {
      return res
        .status(400)
        .json({ success: false, message: "type, amount, label and date are required" });
    }
    if (!["income", "expense"].includes(type)) {
      return res
        .status(400)
        .json({ success: false, message: "type must be 'income' or 'expense'" });
    }

    const entry = repo.create({ type, amount: parseFloat(amount), label, category, description, date });
    await repo.save(entry);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: `Created finance entry (${type})`,
      targetId: entry.id.toString(),
      targetType: "FinanceEntry",
      details: `${type === "income" ? "Income" : "Expense"}: "${label}" — ${amount}`,
    });

    res.status(201).json({ success: true, data: { ...entry, amount: parseFloat(entry.amount as any) } });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const updateEntry = async (req: CustomRequest, res: Response) => {
  try {
    const entry = await repo.findOne({ where: { id: Number(req.params.id) } });
    if (!entry) return res.status(404).json({ success: false, message: "Entry not found" });

    const { type, amount, label, category, description, date } = req.body;
    if (type !== undefined) entry.type = type;
    if (amount !== undefined) entry.amount = parseFloat(amount);
    if (label !== undefined) entry.label = label;
    if (category !== undefined) entry.category = category;
    if (description !== undefined) entry.description = description;
    if (date !== undefined) entry.date = date;

    await repo.save(entry);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Updated finance entry",
      targetId: req.params.id,
      targetType: "FinanceEntry",
      details: `Updated "${entry.label}"`,
    });

    res.json({ success: true, data: { ...entry, amount: parseFloat(entry.amount as any) } });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteEntry = async (req: CustomRequest, res: Response) => {
  try {
    const entry = await repo.findOne({ where: { id: Number(req.params.id) } });
    if (!entry) return res.status(404).json({ success: false, message: "Entry not found" });

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Deleted finance entry",
      targetId: req.params.id,
      targetType: "FinanceEntry",
      details: `Deleted "${entry.label}"`,
    });

    await repo.remove(entry);
    res.json({ success: true, message: "Entry deleted" });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};
