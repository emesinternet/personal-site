const loadRevealDelay = 0.12;
const childRevealDelay = 0.12;
const childRevealStartDelayMs = 360;
const experienceStartYear = 2005;
const experienceAnniversaryMonth = 0;
const experienceAnniversaryDay = 8;
const heroWidthScrollRange = 0.35;
const sectionRevealMargin = "0% 0% -16% 0%";
const childRevealMargin = "0% 0% -18% 0%";

function initExperienceYears() {
  const yearsExperience = document.querySelector("[data-years-experience]");

  if (!yearsExperience) {
    return;
  }

  const today = new Date();
  const anniversary = new Date(
    today.getFullYear(),
    experienceAnniversaryMonth,
    experienceAnniversaryDay
  );
  let years = today.getFullYear() - experienceStartYear;

  if (today < anniversary) {
    years -= 1;
  }

  yearsExperience.textContent = String(years);
}

function initHeroCollapse() {
  const shell = document.querySelector(".shell");
  const root = document.documentElement;

  if (!shell) {
    return;
  }

  let finalMaskInset = 0;
  let widthScrollRange = 1;
  let frameRequest = 0;

  const lerp = (start, end, progress) => start + ((end - start) * progress);
  const toRem = (value, rootFontSize) => `${value / rootFontSize}rem`;

  const measureHero = () => {
    const shellRect = shell.getBoundingClientRect();
    finalMaskInset = Math.max((window.innerWidth - shellRect.width) / 2, 0);
    widthScrollRange = Math.max(window.innerHeight * heroWidthScrollRange, 1);
    root.style.setProperty("--hero-stage-space", toRem(widthScrollRange, parseFloat(getComputedStyle(root).fontSize)));
  };

  const updateHeroGeometry = () => {
    frameRequest = 0;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const activeWidthRange = Math.min(widthScrollRange, maxScroll);
    const widthProgress = Math.min(window.scrollY / activeWidthRange, 1);
    const rootFontSize = parseFloat(getComputedStyle(root).fontSize);

    root.style.setProperty("--hero-mask-inline", toRem(lerp(0, finalMaskInset, widthProgress), rootFontSize));
    root.style.setProperty("--hero-grid-opacity", String(widthProgress));
  };

  const requestHeroUpdate = () => {
    if (frameRequest) {
      return;
    }

    frameRequest = window.requestAnimationFrame(updateHeroGeometry);
  };

  const refreshHero = () => {
    measureHero();
    requestHeroUpdate();
  };

  refreshHero();
  window.addEventListener("scroll", requestHeroUpdate, { passive: true });
  window.addEventListener("resize", refreshHero);
}

function initReveals() {
  const revealItems = [...document.querySelectorAll(".reveal")];
  const revealMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (revealItems.length === 0) {
    return;
  }

  if (revealMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible", "children-visible"));
    return;
  }

  let revealIndex = 0;

  const prepareChildren = (item) => {
    item.querySelectorAll(".reveal-child").forEach((child, index) => {
      child.style.setProperty("--child-delay", `${index * childRevealDelay}s`);
    });
  };

  const revealItem = (item) => {
    item.style.setProperty("--reveal-delay", `${Math.min(revealIndex, 3) * loadRevealDelay}s`);
    revealIndex += 1;
    prepareChildren(item);
    item.classList.add("is-visible");

    if (item.dataset.children !== "scroll") {
      window.setTimeout(() => {
        item.classList.add("children-visible");
      }, childRevealStartDelayMs);
    }
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
      .forEach((entry) => {
        revealItem(entry.target);
        observer.unobserve(entry.target);
      });
  }, { rootMargin: sectionRevealMargin, threshold: 0.01 });

  const childObserver = new IntersectionObserver((entries, observer) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        entry.target.closest(".reveal")?.classList.add("children-visible");
        observer.unobserve(entry.target);
      });
  }, { rootMargin: childRevealMargin, threshold: 0.01 });

  revealItems.forEach((item) => {
    if (item.dataset.reveal === "load") {
      revealItem(item);
    } else {
      revealObserver.observe(item);
    }

    if (item.dataset.children === "scroll") {
      const childTrigger = item.querySelector("[data-reveal-trigger]");

      if (childTrigger) {
        childObserver.observe(childTrigger);
      }
    }
  });
}

function createShaderRenderer({
  canvas,
  sources,
  contextType,
  contextOptions,
  compileError,
  linkError,
  getSettings,
  getLocations,
  draw
}) {
  const gl = canvas.getContext(contextType, contextOptions);

  if (!gl || !sources) {
    canvas.hidden = true;
    return null;
  }

  const compileShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || compileError);
    }

    return shader;
  };

  const createProgram = () => {
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, sources.vertex));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, sources.fragment));
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || linkError);
    }

    return program;
  };

  let program;

  try {
    program = createProgram();
  } catch (error) {
    console.error(error);
    canvas.hidden = true;
    return null;
  }

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1
    ]),
    gl.STATIC_DRAW
  );

  const settings = getSettings();
  const locations = {
    position: gl.getAttribLocation(program, "aPosition"),
    resolution: gl.getUniformLocation(program, "uResolution"),
    ...getLocations(gl, program)
  };
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let shaderVisible = true;
  let animationFrame = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const density = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width * density));
    const height = Math.max(1, Math.floor(rect.height * density));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  const render = (now) => {
    animationFrame = 0;

    if (!shaderVisible) {
      return;
    }

    gl.useProgram(program);
    gl.enableVertexAttribArray(locations.position);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(locations.resolution, canvas.width, canvas.height);

    draw({
      gl,
      locations,
      settings,
      time: prefersReducedMotion.matches ? 0 : now * 0.001
    });

    if (!prefersReducedMotion.matches) {
      requestRender();
    }
  };

  const requestRender = () => {
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(render);
    }
  };

  const resizeObserver = "ResizeObserver" in window
    ? new ResizeObserver(() => {
      resize();
      requestRender();
    })
    : null;

  const visibilityObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(([entry]) => {
      shaderVisible = entry.isIntersecting;

      if (shaderVisible) {
        requestRender();
      }
    })
    : null;

  resize();
  resizeObserver?.observe(canvas);
  visibilityObserver?.observe(canvas);
  window.addEventListener("resize", () => {
    resize();
    requestRender();
  });
  prefersReducedMotion.addEventListener?.("change", requestRender);
  requestRender();

  return { requestRender };
}

function initHeroShader() {
  const canvas = document.querySelector("[data-terminal-shader]");

  if (!canvas) {
    return;
  }

  createShaderRenderer({
    canvas,
    sources: window.terminalShaderSources,
    contextType: "webgl",
    contextOptions: {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power"
    },
    compileError: "Shader compile failed",
    linkError: "Shader link failed",
    getSettings: () => ({
      opacity: 0.19,
      scale: 1.4,
      digitSize: 1.75,
      speed: 0.57,
      noise: 0.82,
      glitch: 0,
      scanlines: 1,
      brightness: 0.98,
      curvature: 0.16
    }),
    getLocations: (gl, program) => ({
      time: gl.getUniformLocation(program, "uTime"),
      scale: gl.getUniformLocation(program, "uScale"),
      digitSize: gl.getUniformLocation(program, "uDigitSize"),
      noise: gl.getUniformLocation(program, "uNoiseAmp"),
      glitch: gl.getUniformLocation(program, "uGlitchAmount"),
      scanlines: gl.getUniformLocation(program, "uScanlineIntensity"),
      brightness: gl.getUniformLocation(program, "uBrightness"),
      curvature: gl.getUniformLocation(program, "uCurvature")
    }),
    draw: ({ gl, locations, settings, time }) => {
      canvas.style.setProperty("--shader-opacity", String(settings.opacity));
      gl.uniform1f(locations.time, time * settings.speed);
      gl.uniform1f(locations.scale, settings.scale);
      gl.uniform1f(locations.digitSize, settings.digitSize);
      gl.uniform1f(locations.noise, settings.noise);
      gl.uniform1f(locations.glitch, settings.glitch);
      gl.uniform1f(locations.scanlines, settings.scanlines);
      gl.uniform1f(locations.brightness, settings.brightness);
      gl.uniform1f(locations.curvature, settings.curvature);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  });
}

function initAuroraShaders() {
  const canvases = [...document.querySelectorAll("[data-aurora-shader]")];

  if (canvases.length === 0 || !window.auroraShaderSources) {
    return;
  }

  const hexToRgb = (hex) => {
    const value = hex.replace("#", "");
    const number = parseInt(value, 16);

    return [
      ((number >> 16) & 255) / 255,
      ((number >> 8) & 255) / 255,
      (number & 255) / 255
    ];
  };

  canvases.forEach((canvas) => {
    const explicitHeight = canvas.dataset.height?.trim();
    const explicitWidth = canvas.dataset.width?.trim();

    if (explicitHeight) {
      canvas.style.height = explicitHeight;
    }

    if (explicitWidth) {
      canvas.style.width = explicitWidth;
    }

    createShaderRenderer({
      canvas,
      sources: window.auroraShaderSources,
      contextType: "webgl2",
      contextOptions: {
        alpha: true,
        antialias: true,
        depth: false,
        premultipliedAlpha: true,
        powerPreference: "low-power"
      },
      compileError: "Aurora shader compile failed",
      linkError: "Aurora shader link failed",
      getSettings: () => ({
        amplitude: Number(canvas.dataset.amplitude || 0.74),
        blend: Number(canvas.dataset.blend || 0.82),
        speed: Number(canvas.dataset.speed || 0.46),
        colorStops: (canvas.dataset.colorStops || "#202423,#d81919,#eff3ec").split(",").flatMap(hexToRgb)
      }),
      getLocations: (gl, program) => ({
        time: gl.getUniformLocation(program, "uTime"),
        amplitude: gl.getUniformLocation(program, "uAmplitude"),
        colorStops: gl.getUniformLocation(program, "uColorStops"),
        blend: gl.getUniformLocation(program, "uBlend")
      }),
      draw: ({ gl, locations, settings, time }) => {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.uniform1f(locations.time, time * settings.speed);
        gl.uniform1f(locations.amplitude, settings.amplitude);
        gl.uniform3fv(locations.colorStops, settings.colorStops);
        gl.uniform1f(locations.blend, settings.blend);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    });
  });
}

initExperienceYears();
initHeroCollapse();
initReveals();
initHeroShader();
initAuroraShaders();
