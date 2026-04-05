import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Service } from "../database/ServiceModel";
import { logActivity } from "../middleware/ActivityLog";

interface CustomRequest extends Request {
  user?: { id: number; email: string };
}

const serviceRepository = AppDataSource.getRepository(Service);

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceRepository.find({
      where: { isActive: true },
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceRepository.find({
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req: CustomRequest, res: Response) => {
  try {
    const { title, description, icon, features, order } = req.body;

    if (!title || !description || !icon) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and icon are required",
      });
    }

    const service = serviceRepository.create({
      title,
      description,
      icon,
      features: features || [],
      order: order || 0,
    });

    await serviceRepository.save(service);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Created service",
      targetId: service.id.toString(),
      targetType: "Service",
      details: `Created service "${title}"`,
    });

    res.status(201).json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateService = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, icon, features, isActive, order } = req.body;

    const service = await serviceRepository.findOne({ where: { id: Number(id) } });

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (icon !== undefined) service.icon = icon;
    if (features !== undefined) service.features = features;
    if (isActive !== undefined) service.isActive = isActive;
    if (order !== undefined) service.order = order;

    await serviceRepository.save(service);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Updated service",
      targetId: id,
      targetType: "Service",
      details: `Updated service "${service.title}"`,
    });

    res.status(200).json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

    const service = await serviceRepository.findOne({ where: { id: Number(id) } });

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Deleted service",
      targetId: id,
      targetType: "Service",
      details: `Deleted service "${service.title}"`,
    });

    await serviceRepository.remove(service);
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
