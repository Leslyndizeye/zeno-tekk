import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { TeamMember } from "../database/TeamMemberModel";

const teamMemberRepository = AppDataSource.getRepository(TeamMember);

export const getTeamMembers = async (req: Request, res: Response) => {
  try {
    const members = await teamMemberRepository.find({
      where: { isActive: true },
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: members });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTeamMembers = async (req: Request, res: Response) => {
  try {
    const members = await teamMemberRepository.find({
      order: { order: "ASC" },
    });
    res.status(200).json({ success: true, data: members });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const { name, position, bio, image, email, linkedin, twitter, order } = req.body;

    if (!name || !position || !image) {
      return res.status(400).json({
        success: false,
        message: "Name, position, and image are required",
      });
    }

    const member = teamMemberRepository.create({
      name,
      position,
      bio: bio || null,
      image,
      email: email || null,
      linkedin: linkedin || null,
      twitter: twitter || null,
      order: order || 0,
    });

    await teamMemberRepository.save(member);
    res.status(201).json({ success: true, data: member });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, position, bio, image, email, linkedin, twitter, isActive, order } = req.body;

    const member = await teamMemberRepository.findOne({ where: { id: Number(id) } });

    if (!member) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    if (name !== undefined) member.name = name;
    if (position !== undefined) member.position = position;
    if (bio !== undefined) member.bio = bio;
    if (image !== undefined) member.image = image;
    if (email !== undefined) member.email = email;
    if (linkedin !== undefined) member.linkedin = linkedin;
    if (twitter !== undefined) member.twitter = twitter;
    if (isActive !== undefined) member.isActive = isActive;
    if (order !== undefined) member.order = order;

    await teamMemberRepository.save(member);
    res.status(200).json({ success: true, data: member });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const member = await teamMemberRepository.findOne({ where: { id: Number(id) } });

    if (!member) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    await teamMemberRepository.remove(member);
    res.status(200).json({ success: true, message: "Team member deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
