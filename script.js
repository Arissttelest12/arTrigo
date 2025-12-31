document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector("#boxAR");

  box.addEventListener("click", () => {
    box.setAttribute("animation", {
      property: "scale",
      to: "1.5 1.5 1.5",
      dur: 300,
      easing: "easeOutElastic"
    });
  });

  const scene = document.querySelector("#arScene");
  if (scene) {
    scene.addEventListener("renderstart", async () => {
      const arSystem = scene.systems["mindar-image-system"];
      if (arSystem && !arSystem.isRunning) {
        try {
          await arSystem.start();
          console.log("MindAR started");
        } catch (err) {
          console.error("Failed to start MindAR:", err);
          alert("Could not start camera. Serve the page over HTTPS or localhost and grant camera permission.");
        }
      }
    });

    scene.addEventListener("targetFound", (e) => {
      console.log("targetFound", e.detail);
    });
    scene.addEventListener("targetLost", (e) => {
      console.log("targetLost", e.detail);
    });
  }
});
