"use strict";
const scene = document.getElementById("scene");
const status = document.getElementById("status");
const pause = document.getElementById("pause");
const replay = document.getElementById("replay");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let playing = !reducedMotion;
rive.RuntimeLoader.setWasmUrl("runtime/rive.wasm");
const animation = new rive.Rive({
  src: "scene.riv", canvas: scene, stateMachines: "Haunted print loop",
  autoplay: playing,
  onLoad() {
    animation.resizeDrawingSurfaceToCanvas();
    status.textContent = "Live Rive animation";
    pause.disabled = replay.disabled = false;
    pause.textContent = playing ? "Pause" : "Play";
  },
  onLoadError() {
    status.textContent = "Rive load failed. The walkthrough below is still available.";
    pause.disabled = replay.disabled = true;
  }
});
pause.addEventListener("click", () => {
  playing = !playing;
  if (playing) animation.play(); else animation.pause();
  pause.textContent = playing ? "Pause" : "Play";
});
replay.addEventListener("click", () => {
  playing = true;
  animation.reset({stateMachines: "Haunted print loop", autoplay: true});
  pause.textContent = "Pause";
});
new ResizeObserver(() => animation.resizeDrawingSurfaceToCanvas()).observe(scene);
window.addEventListener("pagehide", () => animation.cleanup());
window.previewRive = animation;
