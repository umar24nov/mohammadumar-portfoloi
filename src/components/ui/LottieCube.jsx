import Lottie from "lottie-react";
import cubeAnimation from "../../config/cubeAnimation.json";

export default function LottieCube({ className = "" }) {
  return (
    <div className={`pointer-events-none w-full h-full ${className}`}>
      <Lottie
        animationData={cubeAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
