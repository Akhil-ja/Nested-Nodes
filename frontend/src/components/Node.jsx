import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNode, updateNode } from "../features/nodes/nodesSlice";
import { useNotification } from "../hooks/useNotification";
import styles from "../styles/Node.module.css";

const Node = ({ node, setNotification }) => {
  const dispatch = useDispatch();
  const allNodes = useSelector((state) => state.nodes.nodes);
  const { showNotification } = useNotification();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(node.name);

  const children = allNodes.filter((n) => n.parentId === node._id);

  const handleAddChild = async () => {
    if (node._id) {
      const resultAction = await dispatch(createNode({ parentId: node._id }));
      if (createNode.fulfilled.match(resultAction)) {
        showNotification("Child node created successfully.", "success");
      } else if (createNode.rejected.match(resultAction)) {
        showNotification(
          resultAction.payload || "Failed to create child node.",
          "error"
        );
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    const resultAction = await dispatch(
      updateNode({ id: node._id, name: editedName })
    );
    if (updateNode.fulfilled.match(resultAction)) {
      showNotification("Node updated successfully.", "success");
    } else if (updateNode.rejected.match(resultAction)) {
      showNotification(
        resultAction.payload || "Failed to update node.",
        "error"
      );
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(node.name);
    setIsEditing(false);
  };

  return (
    <div className={styles.nodeContainer}>
      <div className={styles.nodeHeader}>
        {children.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.toggleButton}
          >
            {isExpanded ? "-" : "+"}
          </button>
        )}
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className={styles.nodeInput}
            />
            <button onClick={handleSaveEdit} className={styles.nodeButton}>
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className={`${styles.nodeButton} ${styles.cancel}`}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className={styles.nodeName}>{node.name}</span>
            <button onClick={handleEdit} className={styles.nodeButton}>
              Edit
            </button>
          </>
        )}
        <button onClick={handleAddChild} className={styles.nodeButton}>
          Add Child
        </button>
      </div>
      <div
        className={`${styles.childrenContainer} ${
          isExpanded ? styles.expanded : ""
        }`}
      >
        {children.map((child) => (
          <Node
            key={child._id}
            node={child}
            setNotification={setNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default Node;
