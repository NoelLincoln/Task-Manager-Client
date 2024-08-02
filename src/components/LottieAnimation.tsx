import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/lotties/to-do-lottie.json";

interface LottieAnimationProps {
  width: number;
  height: number;
}

// Function declaration for the component
function LottieAnimation({ width = 150, height = 150 }: LottieAnimationProps) {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} style={{ width, height }} />
    </div>
  );
}

export default LottieAnimation;
