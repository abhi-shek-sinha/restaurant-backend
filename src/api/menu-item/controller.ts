import { Request, Response } from "express";
import { MenuItem } from "./model";
import AppDataSource from "../../config/database.config";

const menuItemRepository = AppDataSource.getRepository(MenuItem);

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.path || "";

    const menuItem = new MenuItem();
    menuItem.image = image;
    menuItem.title = title;
    menuItem.description = description;

    await menuItemRepository.save(menuItem);
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: "menuItem unable to create", err });
  }
};

export const getMenuItems = async (_req: Request, res: Response) => {
  try {
    const menuItems = await menuItemRepository.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: "menuItem unable to get", err });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.file?.path;

    const menuItem = await menuItemRepository.findOneBy({ id });
    if (!menuItem) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }
    menuItem.title = title || menuItem.title;
    menuItem.description = description || menuItem.description;
    menuItem.image = image || menuItem.image;

    await menuItemRepository.save(menuItem);
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ message: "menuItem unable to update", err });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await menuItemRepository.delete(id);

    if (result.affected === 0) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }
    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "menuItem unable to delete", err });
  }
};
