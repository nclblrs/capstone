import handleViewport from "react-in-viewport";

const Block = ({ forwardedRef }) => {
  return <div style={{ width: 0, height: 0 }} ref={forwardedRef} />;
};

const ViewportBlock = handleViewport(Block, {});

export default ViewportBlock;
