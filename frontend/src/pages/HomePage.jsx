import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNodes, createNode } from "../features/nodes/nodesSlice";
import Node from "../components/Node";
import { useNotification } from "../hooks/useNotification";

function HomePage() {
  const dispatch = useDispatch();
  const {
    nodes = [],
    status: nodeStatus,
    error,
  } = useSelector((state) => state.nodes);
  const { showNotification } = useNotification();

  const rootNodes = nodes.filter((node) => node.parentId === null);

  useEffect(() => {
    if (nodeStatus === "idle") {
      dispatch(fetchNodes());
    }
  }, [nodeStatus, dispatch]);

  useEffect(() => {
    if (nodeStatus === "failed" && error) {
      showNotification(error, "error");
    }
  }, [nodeStatus, error, showNotification]);

  const handleAddRootNode = async () => {
    const resultAction = await dispatch(createNode({ parentId: null }));
    if (createNode.fulfilled.match(resultAction)) {
      showNotification("Root node created successfully.", "success");
    } else if (createNode.rejected.match(resultAction)) {
      showNotification(
        resultAction.payload || "Failed to create root node.",
        "error"
      );
    }
  };

  let content;

  if (nodeStatus === "loading") {
    content = <div>Loading nodes...</div>;
  } else if (nodeStatus === "succeeded") {
    content = rootNodes.map((node) => <Node key={node._id} node={node} />);
  } else if (nodeStatus === "failed") {
    content = <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Nested Node App</h1>
      <div>
        <button onClick={handleAddRootNode}>Add Root Node</button>
      </div>
      <div style={{ marginTop: "20px" }}>{content}</div>
    </>
  );
}

export default HomePage;
