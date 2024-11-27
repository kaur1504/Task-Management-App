import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesComponent = () => {
  const options = useMemo(() => {
    return {
      background: {
        image: "linear-gradient(135deg, #FCF596, #FF9C73)",
      },
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            area: 900,
          },
        },
        color: {
          value: ["#8b0000", "#ff4500", "#2e8b57", "#1e90ff", "#4b0082"],
        },
        links: {
          enable: false,
          color: "#cccccc",
          distance: 120,
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
        size: {
          value: { min: 3, max: 6 },
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
          animation: {
            enable: true,
            speed: 1.5,
            minimumValue: 0.3,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.3,
          },
          push: {
            quantity: 4,
          },
        },
      },
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={options}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticlesComponent;
