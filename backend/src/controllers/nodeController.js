import * as nodeService from "../services/nodeService.js";
import AppError from "../utils/appError.js";

export const getAllNodes = async (req, res, next) => {
  try {
    const nodes = await nodeService.getAllNodes();
    res.status(200).json({
      success: true,
      message: "Nodes fetched successfully.",
      data: nodes,
    });
  } catch (err) {
    next(new AppError("Failed to fetch nodes.", 500));
  }
};

export const createNode = async (req, res, next) => {
  try {
    const { parentId } = req.body;
    let newNode;

    if (parentId) {
      newNode = await nodeService.addChildNode(parentId);
    } else {
      newNode = await nodeService.addRootNode();
    }

    res.status(201).json({
      success: true,
      message: "Node created successfully.",
      data: newNode,
    });
  } catch (err) {
    next(new AppError("Failed to create node.", 400));
  }
};

export const updateNode = async (req, res, next) => {
  try {
    const updatedNode = await nodeService.updateNode(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Node updated successfully.",
      data: updatedNode,
    });
  } catch (err) {
    next(new AppError("Failed to update node.", 400));
  }
};
