export default function isInCameraView(e, camera) {
  // const tmpDbg = 50; // To show rendering doesn't happen outside box.
  const tmpDbg = 0 // Setting to 0 turns off debug mode
  return e.pos.x + e.w >= -camera.pos.x + tmpDbg &&
    e.pos.x <= -camera.pos.x + camera.w - tmpDbg &&
    e.pos.y + e.h >= -camera.pos.y + tmpDbg &&
    e.pos.y <= -camera.pos.y + camera.h - tmpDbg;
}
