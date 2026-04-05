import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Testimonial } from "../database/TestimonialModel";
import { logActivity } from "../middleware/ActivityLog";

interface CustomRequest extends Request {
  user?: { id: number; email: string };
}

const testimonialRepository = AppDataSource.getRepository(Testimonial);

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await testimonialRepository.find({
      where: { isActive: true },
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await testimonialRepository.find({
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTestimonial = async (req: CustomRequest, res: Response) => {
  try {
    const { clientName, clientCompany, content, clientImage, rating, order } = req.body;

    if (!clientName || !clientCompany || !content) {
      return res.status(400).json({
        success: false,
        message: "Client name, company, and content are required",
      });
    }

    const testimonial = testimonialRepository.create({
      clientName,
      clientCompany,
      content,
      clientImage: clientImage || null,
      rating: rating || 5,
      order: order || 0,
    });

    await testimonialRepository.save(testimonial);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Created testimonial",
      targetId: testimonial.id.toString(),
      targetType: "Testimonial",
      details: `Created testimonial from "${clientName}" at "${clientCompany}"`,
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { clientName, clientCompany, content, clientImage, rating, isActive, order } = req.body;

    const testimonial = await testimonialRepository.findOne({ where: { id: Number(id) } });

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    if (clientName !== undefined) testimonial.clientName = clientName;
    if (clientCompany !== undefined) testimonial.clientCompany = clientCompany;
    if (content !== undefined) testimonial.content = content;
    if (clientImage !== undefined) testimonial.clientImage = clientImage;
    if (rating !== undefined) testimonial.rating = rating;
    if (isActive !== undefined) testimonial.isActive = isActive;
    if (order !== undefined) testimonial.order = order;

    await testimonialRepository.save(testimonial);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Updated testimonial",
      targetId: id,
      targetType: "Testimonial",
      details: `Updated testimonial from "${testimonial.clientName}"`,
    });

    res.status(200).json({ success: true, data: testimonial });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

    const testimonial = await testimonialRepository.findOne({ where: { id: Number(id) } });

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Deleted testimonial",
      targetId: id,
      targetType: "Testimonial",
      details: `Deleted testimonial from "${testimonial.clientName}"`,
    });

    await testimonialRepository.remove(testimonial);
    res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
