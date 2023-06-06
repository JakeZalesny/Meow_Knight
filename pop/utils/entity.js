import math from "./math.js";
import Rect from "../Rect.js";

function addDebug(entity) {
  entity.children = entity.children || [];
  entity.children.push(
    new Rect(entity.w, entity.h, { fill: "rgba(0, 255, 0, 0.3)" })
  );
  if (entity.hitBox) {
    const { x, y, w, h } = entity.hitBox;
    const hb = new Rect(w, h, { fill: "rgba(255, 0, 0, 0.5)" });
    hb.pos.x = x;
    hb.pos.y = y;
    entity.children.push(hb);
  }
  if (entity.hurtBox) {
    const { x, y, w, h } = entity.hurtBox;
    const hb = new Rect(w, h, { fill: "rgba(0, 0, 255, .5)" });
    hb.pos.x = x;
    hb.pos.y = y;
    entity.children.push(hb);
  }
  return entity;
}

function angle(a, b) {
  return math.angle(center(a), center(b));
}

function bounds(entity) {
  const { w, h, pos, hitBox, scale } = entity;
  const hit = hitBox || { x: 0, y: 0, w, h };
  const bounds = {}
  bounds.x = hit.x
  bounds.y = hit.y
  bounds.w = hit.w
  bounds.h = hit.h

  if (scale.x > 0){
    bounds.w = bounds.w * scale.x
    bounds.x = bounds.x * scale.x
    
  } else if (scale.x < 0){
    bounds.w = bounds.w * Math.abs(scale.x)
    bounds.x = bounds.x * Math.abs(scale.x)
    bounds.x -= bounds.w - ((entity.w - Math.sqrt(entity.w)) / 2)
  }
  
  if (scale.y > 0){
    bounds.h = bounds.h * scale.y
    bounds.y = bounds.y * scale.y
 } else if (scale.y < 0){
    console.log("entity.js line 56 you still need to do the hitbox logic for anything upside down")
 }

  return {
    x: bounds.x + pos.x,
    y: bounds.y + pos.y,
    w: bounds.w - 1,
    h: bounds.h - 1
  };
}

function hurtBox(entity) {
    const { w, h, pos, hurtBox, scale } = entity;
    const hurt = hurtBox || { x: 0, y: 0, w, h };
    const bounds = {}
    bounds.x = hurt.x
    bounds.y = hurt.y
    bounds.w = hurt.w
    bounds.h = hurt.h
  
    if (scale.x > 0){
      bounds.w = bounds.w * scale.x
      bounds.x = bounds.x * scale.x
      
    } else if (scale.x < 0){
      bounds.w = bounds.w * Math.abs(scale.x)
      bounds.x = bounds.x * Math.abs(scale.x)
      bounds.x -= bounds.w - ((entity.w - Math.sqrt(entity.w)) / 2)
    }
    
    if (scale.y > 0){
      bounds.h = bounds.h * scale.y
      bounds.y = bounds.y * scale.y
   } else if (scale.y < 0){
      console.log("entity.js line 87 you still need to do the hurtbox logic for anything upside down")
   }
  
    return {
      x: bounds.x + pos.x,
      y: bounds.y + pos.y,
      w: bounds.w - 1,
      h: bounds.h - 1
    };
}

function center(entity) {
  const { pos, w, h } = entity;
  return {
    x: pos.x + w / 2,
    y: pos.y + h / 2
  };
}

function distance(a, b) {
  return math.distance(center(a), center(b));
}

function hit(e1, e2) {
  const a = bounds(e1);
  const b = bounds(e2);
  return (
    a.x + a.w >= b.x &&
    a.x <= b.x + b.w &&
    a.y + a.h >= b.y &&
    a.y <= b.y + b.h
  );
}

function hits(entity, container, hitCallback) {
  const a = bounds(entity);
  container.map(e2 => {
    const b = bounds(e2);
    if (
      a.x + a.w >= b.x &&
      a.x <= b.x + b.w &&
      a.y + a.h >= b.y &&
      a.y <= b.y + b.h
    ) {
      hitCallback(e2);
    }
  });
}

function hurtToHit(entityHurt, entityHit) {
  const a = hurtBox(entityHurt);
  const b = bounds(entityHit);
  return (
    a.x + a.w >= b.x &&
    a.x <= b.x + b.w &&
    a.y + a.h >= b.y &&
    a.y <= b.y + b.h
  );
}

export default {
  addDebug,
  angle,
  bounds,
  center,
  distance,
  hit,
  hits,
  hurtToHit
};
