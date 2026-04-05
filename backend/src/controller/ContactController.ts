import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { ContactMessage } from "../database/ContactModel";
import { logActivity } from "../middleware/ActivityLog";

interface CustomRequest extends Request {
  user?: { id: number; email: string };
}

const contactRepository = AppDataSource.getRepository(ContactMessage);

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const contact = contactRepository.create({ name, email, subject, message });
    await contactRepository.save(contact);

    res.status(201).json({ success: true, data: contact });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await contactRepository.find({ order: { createdAt: "DESC" } });
    res.status(200).json({ success: true, data: contacts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleContactRead = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await contactRepository.findOne({ where: { id: Number(id) } });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    contact.isRead = !contact.isRead;
    await contactRepository.save(contact);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: contact.isRead ? "Marked contact as read" : "Marked contact as unread",
      targetId: id,
      targetType: "ContactMessage",
      details: `From "${contact.name}" (${contact.email})`,
    });

    res.status(200).json({ success: true, data: contact });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContact = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await contactRepository.findOne({ where: { id: Number(id) } });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Deleted contact message",
      targetId: id,
      targetType: "ContactMessage",
      details: `Deleted message from "${contact.name}" (${contact.email})`,
    });

    await contactRepository.remove(contact);
    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
