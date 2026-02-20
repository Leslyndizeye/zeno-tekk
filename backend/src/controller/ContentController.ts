import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { HeroContent } from "../database/HeroContentModel";
import { Stat } from "../database/StatsModel";

const heroContentRepository = AppDataSource.getRepository(HeroContent);
const statRepository = AppDataSource.getRepository(Stat);

// Hero Content
export const getHeroContent = async (req: Request, res: Response) => {
  try {
    let heroContent = await heroContentRepository.findOne({ where: { id: 1 } });

    if (!heroContent) {
      heroContent = heroContentRepository.create({
        title: "Transform Ideas Into Innovative Software",
        subtitle: "Innovative Software",
        description:
          "We create high-quality, scalable, and user-friendly software solutions that drive efficiency, productivity, and growth for businesses worldwide.",
        ctaButton1Text: "Explore Services",
        ctaButton1Url: "/services",
        ctaButton2Text: "View Our Work",
        ctaButton2Url: "/products",
        badge: "Empowering Innovation",
      });
      await heroContentRepository.save(heroContent);
    }

    res.status(200).json({ success: true, data: heroContent });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHeroContent = async (req: Request, res: Response) => {
  try {
    const { title, subtitle, description, ctaButton1Text, ctaButton1Url, ctaButton2Text, ctaButton2Url, badge } =
      req.body;

    let heroContent = await heroContentRepository.findOne({ where: { id: 1 } });

    if (!heroContent) {
      heroContent = heroContentRepository.create();
    }

    if (title !== undefined) heroContent.title = title;
    if (subtitle !== undefined) heroContent.subtitle = subtitle;
    if (description !== undefined) heroContent.description = description;
    if (ctaButton1Text !== undefined) heroContent.ctaButton1Text = ctaButton1Text;
    if (ctaButton1Url !== undefined) heroContent.ctaButton1Url = ctaButton1Url;
    if (ctaButton2Text !== undefined) heroContent.ctaButton2Text = ctaButton2Text;
    if (ctaButton2Url !== undefined) heroContent.ctaButton2Url = ctaButton2Url;
    if (badge !== undefined) heroContent.badge = badge;

    await heroContentRepository.save(heroContent);
    res.status(200).json({ success: true, data: heroContent });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stats
export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await statRepository.find({
      where: { isActive: true },
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllStats = async (req: Request, res: Response) => {
  try {
    const stats = await statRepository.find({
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createStat = async (req: Request, res: Response) => {
  try {
    const { label, value, description, order } = req.body;

    if (!label || !value) {
      return res.status(400).json({
        success: false,
        message: "Label and value are required",
      });
    }

    const stat = statRepository.create({
      label,
      value,
      description: description || null,
      order: order || 0,
    });

    await statRepository.save(stat);
    res.status(201).json({ success: true, data: stat });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { label, value, description, isActive, order } = req.body;

    const stat = await statRepository.findOne({ where: { id: Number(id) } });

    if (!stat) {
      return res.status(404).json({ success: false, message: "Stat not found" });
    }

    if (label !== undefined) stat.label = label;
    if (value !== undefined) stat.value = value;
    if (description !== undefined) stat.description = description;
    if (isActive !== undefined) stat.isActive = isActive;
    if (order !== undefined) stat.order = order;

    await statRepository.save(stat);
    res.status(200).json({ success: true, data: stat });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const stat = await statRepository.findOne({ where: { id: Number(id) } });

    if (!stat) {
      return res.status(404).json({ success: false, message: "Stat not found" });
    }

    await statRepository.remove(stat);
    res.status(200).json({ success: true, message: "Stat deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
