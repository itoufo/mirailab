"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive GPU particle-flow background for the hero.
 *
 * - Stateless vertex-shader animation (zero per-particle CPU cost): particles
 *   drift left -> right with simplex-noise wander, matching the poster image.
 * - Mouse repels nearby particles and makes them swell (interactive feedback).
 * - Transparent canvas layered over the static poster; pointer-events disabled
 *   so buttons/links stay clickable while the window still tracks the cursor.
 * - Skips entirely under prefers-reduced-motion; pauses when tab hidden or the
 *   hero scrolls out of view. Fully disposes on unmount.
 */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  attribute vec3 aSeed;     // x,y in [0,1] base placement, z in [0,1] variation
  attribute float aSize;
  attribute float aColorMix;

  varying vec3 vColor;
  varying float vAlpha;

  // Ashima / Stefan Gustavson 3D simplex noise (public domain)
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    float xRange = uAspect * 2.0 + 0.6;
    float speed = 0.05 + aSeed.z * 0.08;

    // left -> right flow, wraps seamlessly
    float x = mod(aSeed.x * xRange + uTime * speed, xRange) - xRange * 0.5;
    float baseY = (aSeed.y * 2.0 - 1.0) * 1.08;

    float nY = snoise(vec3(x * 0.55, baseY * 0.55, uTime * 0.07 + aSeed.z * 12.0));
    float nX = snoise(vec3(baseY * 0.5, uTime * 0.05, aSeed.z * 6.0));
    float y = baseY + nY * 0.20;
    x += nX * 0.16;

    // mouse repel + swell
    vec2 pos = vec2(x, y);
    vec2 d = pos - uMouse;
    float dist = length(d);
    float R = 0.5;
    float push = smoothstep(R, 0.0, dist);
    pos += normalize(d + 1e-4) * push * 0.38;

    vColor = mix(
      mix(vec3(0.388, 0.400, 0.945), vec3(0.133, 0.827, 0.933),
          clamp(x / uAspect * 0.5 + 0.5, 0.0, 1.0)),
      vec3(0.655, 0.545, 0.980),
      aColorMix * 0.55
    );
    vAlpha = (0.35 + aSeed.z * 0.5) * (1.0 + push * 0.8);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
    gl_PointSize = aSize * uPixelRatio * (1.0 + push * 3.2);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, r);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = width < 768 ? 2600 : 6800;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    let aspect = width / height;
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, -10, 10);

    const seeds = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colorMix = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      seeds[i * 3 + 0] = Math.random();
      seeds[i * 3 + 1] = Math.random();
      seeds[i * 3 + 2] = Math.random();
      sizes[i] = 1.5 + Math.random() * 4.5;
      colorMix[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    // position is unused (computed in shader) but required by three; keep it minimal
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(count * 3), 3)
    );
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aColorMix", new THREE.BufferAttribute(colorMix, 1));

    const uniforms = {
      uTime: { value: 0 },
      uAspect: { value: aspect },
      uMouse: { value: new THREE.Vector2(10, 10) }, // offscreen until pointer moves
      uPixelRatio: { value: dpr },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    const target = new THREE.Vector2(10, 10);
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      target.set(nx * aspect, ny);
    };
    const onPointerLeave = () => target.set(10, 10);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      aspect = width / height;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      uniforms.uAspect.value = aspect;
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // pause when offscreen or tab hidden
    let inView = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) loop();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const render = () => {
      running = true;
      if (document.hidden || !inView) {
        running = false;
        return;
      }
      uniforms.uTime.value = clock.getElapsedTime();
      // ease mouse toward target for smooth interaction
      uniforms.uMouse.value.lerp(target, 0.12);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    const loop = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };
    const onVisibility = () => {
      if (!document.hidden && inView) loop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
