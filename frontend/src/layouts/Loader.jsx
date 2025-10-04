import React from "react";
import Lottie from "react-lottie";
import animation from "@/assets/animations/Mainscene.json";


const Loader = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        zIndex: 9999
      }}>
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
    );
  };
  
export default Loader;