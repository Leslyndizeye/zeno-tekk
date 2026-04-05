import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Product } from "../database/ProductModel";
import { logActivity } from "../middleware/ActivityLog";

interface CustomRequest extends Request {
  user?: { id: number; email: string };
}

const productRepository = AppDataSource.getRepository(Product);

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productRepository.find({
      where: { isActive: true },
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productRepository.find({
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: CustomRequest, res: Response) => {
  try {
    const { title, description, category, image, url, order } = req.body;

    if (!title || !description || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "Title, description, category, and image are required",
      });
    }

    const product = productRepository.create({
      title,
      description,
      category,
      image,
      url: url || null,
      order: order || 0,
    });

    await productRepository.save(product);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Created product",
      targetId: product.id.toString(),
      targetType: "Product",
      details: `Created product "${title}"`,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category, image, url, isActive, order } = req.body;

    const product = await productRepository.findOne({ where: { id: Number(id) } });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;
    if (image !== undefined) product.image = image;
    if (url !== undefined) product.url = url;
    if (isActive !== undefined) product.isActive = isActive;
    if (order !== undefined) product.order = order;

    await productRepository.save(product);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Updated product",
      targetId: id,
      targetType: "Product",
      details: `Updated product "${product.title}"`,
    });

    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

    const product = await productRepository.findOne({ where: { id: Number(id) } });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Deleted product",
      targetId: id,
      targetType: "Product",
      details: `Deleted product "${product.title}"`,
    });

    await productRepository.remove(product);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
