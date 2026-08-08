import Lottie from "lottie-react";
import cubeAnimation from "../../config/cubeAnimation.json";

export default function LottieCube({ size = 220, className = "" }) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ width: size, height: size }}>
      <Lottie
        animationData={cubeAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
