import * as nodeService from "../services/nodeService.js";
import AppError from "../utils/appError.js";
import { STATUS_CODES } from "../utils/statusCodes.js";

export const getAllNodes = async (req, res, next) => {
  try {
    const nodes = await nodeService.getAllNodes();
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Nodes fetched successfully.",
      data: nodes,
    });
  } catch (err) {
    next(
      new AppError("Failed to fetch nodes.", STATUS_CODES.INTERNAL_SERVER_ERROR)
    );
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

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Node created successfully.",
      data: newNode,
    });
  } catch (err) {
    next(new AppError("Failed to create node.", STATUS_CODES.BAD_REQUEST));
  }
};

export const updateNode = async (req, res, next) => {
  try {
    const updatedNode = await nodeService.updateNode(req.params.id, req.body);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Node updated successfully.",
      data: updatedNode,
    });
  } catch (err) {
    next(new AppError("Failed to update node.", STATUS_CODES.BAD_REQUEST));
  }
};
