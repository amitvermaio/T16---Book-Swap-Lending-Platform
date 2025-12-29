import { useState } from "react";

const ImageMagnifier = ({
  src,
  width = "100%",
  height = "auto",
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2.0
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

  const handleMouseEnter = (e) => {
    const el = e.currentTarget;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    setShowMagnifier(false);
  };

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();

    // Calculate cursor position on the image
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };

  return (
    <div
      style={{ position: "relative", height: height, width: width }}>
      <img
        src={src}
        style={{ height: height, width: width }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        alt="Product"
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          // Prevent magnifier blocks the mousemove event of img
          pointerEvents: "none",
          // Set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          // Move element to cursor position
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "1px solid lightgray",
          borderRadius: "50%", // Make it circular
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",

          // Calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
            }px`,

          // Calculate position of zoomed image
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
        }}
      />
    </div>
  );
};

export default ImageMagnifier;