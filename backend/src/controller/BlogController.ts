import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { BlogPost } from "../database/BlogModel";
import { logActivity } from "../middleware/ActivityLog";

interface CustomRequest extends Request {
  user?: { id: number; email: string };
}

const blogRepository = AppDataSource.getRepository(BlogPost);

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await blogRepository.find({
      where: { isActive: true },
      order: { isFeatured: "DESC", order: "ASC", createdAt: "DESC" },
    });
    res.status(200).json({ success: true, data: posts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await blogRepository.find({ order: { createdAt: "DESC" } });
    res.status(200).json({ success: true, data: posts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPost = async (req: CustomRequest, res: Response) => {
  try {
    const { title, excerpt, content, author, image, category, readTime, isFeatured, order } = req.body;

    if (!title || !excerpt || !author || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, excerpt, author, and category are required",
      });
    }

    const post = blogRepository.create({
      title,
      excerpt,
      content: content || null,
      author,
      image: image || null,
      category,
      readTime: readTime || null,
      isFeatured: isFeatured || false,
      order: order || 0,
    });

    await blogRepository.save(post);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Created blog post",
      targetId: post.id.toString(),
      targetType: "BlogPost",
      details: `Created blog post "${title}"`,
    });

    res.status(201).json({ success: true, data: post });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePost = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const post = await blogRepository.findOne({ where: { id: Number(id) } });

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const { title, excerpt, content, author, image, category, readTime, isFeatured, isActive, order } = req.body;

    if (title !== undefined) post.title = title;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (content !== undefined) post.content = content;
    if (author !== undefined) post.author = author;
    if (image !== undefined) post.image = image;
    if (category !== undefined) post.category = category;
    if (readTime !== undefined) post.readTime = readTime;
    if (isFeatured !== undefined) post.isFeatured = isFeatured;
    if (isActive !== undefined) post.isActive = isActive;
    if (order !== undefined) post.order = order;

    await blogRepository.save(post);

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Updated blog post",
      targetId: id,
      targetType: "BlogPost",
      details: `Updated blog post "${post.title}"`,
    });

    res.status(200).json({ success: true, data: post });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePost = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const post = await blogRepository.findOne({ where: { id: Number(id) } });

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    await logActivity({
      userId: req.user?.id,
      email: req.user?.email,
      action: "Deleted blog post",
      targetId: id,
      targetType: "BlogPost",
      details: `Deleted blog post "${post.title}"`,
    });

    await blogRepository.remove(post);
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
