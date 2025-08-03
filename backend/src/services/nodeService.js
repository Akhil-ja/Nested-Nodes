import Node from "../models/nodeModel.js";
import AppError from "../utils/appError.js";
import { STATUS_CODES } from "../utils/statusCodes.js";

export const getAllNodes = async () => {
  return await Node.find();
};

export const addRootNode = async () => {
  const rootNodeCount = await Node.countDocuments({ parentId: null });
  const name = `Root ${rootNodeCount + 1}`;
  const newNode = new Node({ name, parentId: null });
  return await newNode.save();
};

export const addChildNode = async (parentId) => {
  const parentNode = await Node.findById(parentId);
  if (!parentNode) {
    throw new AppError("Parent node not found", STATUS_CODES.NOT_FOUND);
  }

  const parentNameParts = parentNode.name.split(" ");
  const parentVersion = parentNameParts[parentNameParts.length - 1];

  const childNodeCount = await Node.countDocuments({ parentId });
  const newChildVersion = `${parentVersion}.${childNodeCount + 1}`;

  const name = `Child ${newChildVersion}`;

  const newNode = new Node({ name, parentId });
  return await newNode.save();
};

export const updateNode = async (id, updateData) => {
  const updatedNode = await Node.findByIdAndUpdate(
    id,
    { name: updateData.name },
    { new: true }
  );

  if (!updatedNode) {
    throw new AppError("Node not found", STATUS_CODES.NOT_FOUND);
  }

  return updatedNode;
};
