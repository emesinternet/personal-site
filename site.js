const loadRevealDelay = 0.12;
const childRevealDelay = 0.12;
const childRevealStartDelayMs = 360;
const experienceStartYear = 2005;
const experienceAnniversaryMonth = 0;
const experienceAnniversaryDay = 8;
const heroWidthScrollRange = 0.35;
const heroTitleScrollRange = 0.45;
const heroMaskEase = 2;
const enableFoldGradientControls = false;
const sectionRevealMargin = "0% 0% -16% 0%";
const childRevealMargin = "0% 0% -18% 0%";
let heroShaderApi;

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
  const hero = document.querySelector(".hero");
  const heroTitle = document.querySelector(".hero h1");
  const root = document.documentElement;

  if (!shell || !hero || !heroTitle) {
    return;
  }

  let finalMaskInset = 0;
  let widthScrollRange = 1;
  let titleScrollRange = 1;
  let titleStartOffset = 0;
  let titleEndOffset = 0;
  let rootFontSize = 16;
  let frameRequest = 0;

  const lerp = (start, end, progress) => start + ((end - start) * progress);
  const toRem = (value, rootFontSize) => `${value / rootFontSize}rem`;

  const measureHero = () => {
    const shellRect = shell.getBoundingClientRect();
    rootFontSize = parseFloat(getComputedStyle(root).fontSize);
    const titleRect = heroTitle.getBoundingClientRect();
    const heroStyle = getComputedStyle(hero);
    const heroPaddingBlock = parseFloat(heroStyle.paddingTop) + parseFloat(heroStyle.paddingBottom);
    const heroContentHeight = Math.max(window.innerHeight - heroPaddingBlock, titleRect.height);

    finalMaskInset = Math.max((window.innerWidth - shellRect.width) / 2, 0);
    widthScrollRange = Math.max(window.innerHeight * heroWidthScrollRange, 1);
    titleScrollRange = Math.max(window.innerHeight * heroTitleScrollRange, 1);
    titleStartOffset = -2.5 * rootFontSize;
    titleEndOffset = Math.max((heroContentHeight / 2) - (titleRect.height / 2), titleStartOffset);
    root.style.setProperty("--hero-stage-space", toRem(widthScrollRange + titleScrollRange, rootFontSize));
  };

  const updateHeroGeometry = () => {
    frameRequest = 0;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const activeWidthRange = Math.min(widthScrollRange, maxScroll);
    const activeTitleRange = Math.min(titleScrollRange, maxScroll);
    const widthProgress = Math.min(window.scrollY / activeWidthRange, 1);
    const titleProgress = Math.min(Math.max((window.scrollY - activeWidthRange) / activeTitleRange, 0), 1);
    const easedProgress = Math.max(Math.min(widthProgress, 1), 0) ** Math.max(heroMaskEase, 0.2);
    root.style.setProperty("--hero-mask-inline", toRem(lerp(0, finalMaskInset, widthProgress), rootFontSize));
    root.style.setProperty("--hero-grid-opacity", String(easedProgress));
    root.style.setProperty("--hero-title-offset", toRem(lerp(titleStartOffset, titleEndOffset, titleProgress), rootFontSize));
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

function initTooltips() {
  const triggers = [...document.querySelectorAll("[data-tooltip]")];

  if (triggers.length === 0) {
    return;
  }

  const tooltip = document.createElement("div");
  tooltip.className = "native-tooltip";
  tooltip.id = "pricing-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  document.body.append(tooltip);

  let activeTrigger = null;
  let frameRequest = 0;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const positionTooltip = () => {
    frameRequest = 0;

    if (!activeTrigger) {
      return;
    }

    const gap = 12;
    const edge = 16;
    const triggerRect = activeTrigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const left = clamp(
      triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2),
      edge,
      window.innerWidth - tooltipRect.width - edge
    );
    const topBelow = triggerRect.bottom + gap;
    const topAbove = triggerRect.top - tooltipRect.height - gap;
    const top = topBelow + tooltipRect.height + edge <= window.innerHeight
      ? topBelow
      : Math.max(edge, topAbove);

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  };

  const showTooltip = (trigger) => {
    activeTrigger = trigger;
    trigger.setAttribute("aria-describedby", tooltip.id);
    tooltip.textContent = trigger.dataset.tooltip || "";
    tooltip.hidden = false;
    positionTooltip();
  };

  const hideTooltip = () => {
    activeTrigger?.removeAttribute("aria-describedby");
    activeTrigger = null;
    tooltip.hidden = true;
  };

  const requestTooltipPosition = () => {
    if (!frameRequest) {
      frameRequest = requestAnimationFrame(positionTooltip);
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", () => showTooltip(trigger));
    trigger.addEventListener("focus", () => showTooltip(trigger));
    trigger.addEventListener("mouseleave", hideTooltip);
    trigger.addEventListener("blur", hideTooltip);
  });

  window.addEventListener("scroll", requestTooltipPosition, { passive: true });
  window.addEventListener("resize", requestTooltipPosition);
}

function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  const triggerSection = document.querySelector("#services");

  if (!button || !triggerSection) {
    return;
  }

  let triggerScrollY = 0;
  let frameRequest = 0;

  const measureTrigger = () => {
    const rect = triggerSection.getBoundingClientRect();
    triggerScrollY = window.scrollY + rect.top + rect.height;
  };

  const updateButton = () => {
    frameRequest = 0;
    button.classList.toggle("is-visible", window.scrollY >= triggerScrollY);
  };

  const requestUpdate = () => {
    if (frameRequest) {
      return;
    }

    frameRequest = window.requestAnimationFrame(updateButton);
  };

  const refresh = () => {
    measureTrigger();
    requestUpdate();
  };

  refresh();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", refresh);
}

function initFoldGradientControls(api) {
  if (!enableFoldGradientControls || !api?.setSetting || !api?.getSettings) {
    return;
  }

  const settings = api.getSettings();
  const panel = document.createElement("form");
  panel.className = "shader-controls";
  panel.innerHTML = `
    <div class="shader-controls__header">
      <p>FoldGradient</p>
      <button type="button" data-copy-values>Copy values</button>
    </div>
    <div class="shader-controls__colors" data-color-controls></div>
    <label>Background <input type="color" name="backgroundColor" value="${settings.backgroundColorHex}"></label>
    <label>Shadow <input type="color" name="shadowColor" value="${settings.shadowColorHex}"></label>
    <label>Opacity <input type="range" name="opacity" min="0" max="1" step="0.01" value="${settings.opacity}"><span>${settings.opacity}</span></label>
    <label>Softness <input type="range" name="softness" min="0" max="2" step="0.01" value="${settings.softness}"><span>${settings.softness}</span></label>
    <label>Saturation <input type="range" name="saturation" min="0" max="2" step="0.01" value="${settings.saturation}"><span>${settings.saturation}</span></label>
    <label>Rotation <input type="range" name="rotation" min="0" max="360" step="1" value="${settings.rotation}"><span>${settings.rotation}</span></label>
    <label>Zoom <input type="range" name="folds" min="4" max="18" step="0.1" value="${settings.folds}"><span>${settings.folds}</span></label>
    <label>Ribbon <input type="range" name="ribbon" min="0" max="1" step="0.01" value="${settings.ribbon}"><span>${settings.ribbon}</span></label>
    <label>Ribbon width <input type="range" name="ribbonWidth" min="0.05" max="3" step="0.01" value="${settings.ribbonWidth}"><span>${settings.ribbonWidth}</span></label>
    <label>Speed <input type="range" name="speed" min="0" max="2" step="0.01" value="${settings.speed}"><span>${settings.speed}</span></label>
    <label>Noise <input type="range" name="noise" min="0" max="1" step="0.01" value="${settings.noise}"><span>${settings.noise}</span></label>
  `;

  const colorControls = panel.querySelector("[data-color-controls]");

  settings.colorHexes.forEach((color, index) => {
    const label = document.createElement("label");
    label.textContent = `Color ${index + 1}`;
    const input = document.createElement("input");
    input.type = "color";
    input.name = `color-${index}`;
    input.value = color;
    label.append(input);
    colorControls.append(label);
  });

  const copyValues = () => {
    const values = api.getSettings();
    const output = {
      colors: values.colorHexes,
      bgColor: values.backgroundColorHex,
      shadowColor: values.shadowColorHex,
      opacity: values.opacity,
      softness: values.softness,
      saturation: values.saturation,
      rotation: values.rotation,
      zoom: values.folds,
      ribbon: values.ribbon,
      ribbonWidth: values.ribbonWidth,
      speed: values.speed,
      noise: values.noise
    };

    navigator.clipboard?.writeText(JSON.stringify(output, null, 2));
  };

  panel.addEventListener("input", (event) => {
    const input = event.target;

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    const valueLabel = input.closest("label")?.querySelector("span");

    if (input.name.startsWith("color-")) {
      const nextColors = api.getSettings().colorHexes;
      nextColors[Number(input.name.replace("color-", ""))] = input.value;
      api.setSetting("colors", nextColors);
    } else {
      api.setSetting(input.name, input.value);
    }

    if (valueLabel) {
      valueLabel.textContent = input.value;
    }
  });

  panel.querySelector("[data-copy-values]")?.addEventListener("click", copyValues);
  document.body.append(panel);
}

function createShaderRenderer({
  canvas,
  sources,
  label,
  contextType,
  contextOptions,
  settings,
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
      throw new Error(gl.getShaderInfoLog(shader) || `${label} shader compile failed`);
    }

    return shader;
  };

  const createProgram = () => {
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, sources.vertex));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, sources.fragment));
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || `${label} shader link failed`);
    }

    return program;
  };

  let program;

  try {
    program = createProgram();
  } catch (error) {
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

  const locations = {
    position: gl.getAttribLocation(program, "aPosition"),
    resolution: gl.getUniformLocation(program, "uResolution") || gl.getUniformLocation(program, "u_resolution"),
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
  const toLinear = (value) => value ** 2.2;
  const parseColor = (value) => {
    const hex = String(value || "").replace("#", "").trim();
    if (hex.length !== 6) {
      return [1, 1, 1];
    }

    const number = parseInt(hex, 16);

    return [
      toLinear(((number >> 16) & 255) / 255),
      toLinear(((number >> 8) & 255) / 255),
      toLinear((number & 255) / 255)
    ];
  };
  const parseColorStop = (value) => [...parseColor(value), 1];

  if (!canvas) {
    return {
      setSetting() {
      }
    };
  }

  const settings = {
    opacity: 0.6,
    speed: 1.25,
    colorHexes: ["#ffffff", "#d05d5d", "#333333", "#5d9ed0", "#ffffff"],
    colors: ["#ffffff", "#d05d5d", "#333333", "#5d9ed0", "#ffffff"].flatMap(parseColorStop),
    colorCount: 5,
    backgroundColorHex: "#121212",
    backgroundColor: parseColor("#121212"),
    shadowColorHex: "#0a1c2a",
    shadowColor: parseColor("#0a1c2a"),
    softness: 0.81,
    saturation: 0.98,
    noise: 0.76,
    rotation: 0,
    folds: 7.3,
    ribbon: 0.08,
    ribbonWidth: 1.32
  };

  const renderer = createShaderRenderer({
    canvas,
    sources: window.terminalShaderSources,
    label: "FoldGradient",
    contextType: "webgl2",
    contextOptions: {
      alpha: true,
      antialias: true,
      depth: false,
      powerPreference: "low-power"
    },
    settings,
    getLocations: (gl, program) => ({
      time: gl.getUniformLocation(program, "u_time"),
      colors: gl.getUniformLocation(program, "u_colors"),
      colorCount: gl.getUniformLocation(program, "u_ncols"),
      backgroundColor: gl.getUniformLocation(program, "u_back"),
      shadowColor: gl.getUniformLocation(program, "u_shadow"),
      softness: gl.getUniformLocation(program, "u_softness"),
      saturation: gl.getUniformLocation(program, "u_saturation"),
      noise: gl.getUniformLocation(program, "u_noise"),
      rotation: gl.getUniformLocation(program, "u_rotation"),
      folds: gl.getUniformLocation(program, "u_folds"),
      ribbon: gl.getUniformLocation(program, "u_ribbon"),
      ribbonWidth: gl.getUniformLocation(program, "u_ribbonWidth")
    }),
    draw: ({ gl, locations, settings, time }) => {
      canvas.style.setProperty("--shader-opacity", String(settings.opacity));
      gl.uniform1f(locations.time, time * settings.speed);
      gl.uniform4fv(locations.colors, settings.colors);
      gl.uniform1f(locations.colorCount, settings.colorCount);
      gl.uniform3fv(locations.backgroundColor, settings.backgroundColor);
      gl.uniform3fv(locations.shadowColor, settings.shadowColor);
      gl.uniform1f(locations.softness, settings.softness);
      gl.uniform1f(locations.saturation, settings.saturation);
      gl.uniform1f(locations.noise, settings.noise);
      gl.uniform1f(locations.rotation, settings.rotation);
      gl.uniform1f(locations.folds, settings.folds);
      gl.uniform1f(locations.ribbon, settings.ribbon);
      gl.uniform1f(locations.ribbonWidth, settings.ribbonWidth);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  });

  const setSetting = (setting, value) => {
    if (!settings.hasOwnProperty(setting)) {
      return;
    }

    if (setting === "colors") {
      settings.colorHexes = [...value];
      settings.colors = value.flatMap(parseColorStop);
    } else if (setting === "backgroundColor" || setting === "shadowColor") {
      settings[`${setting}Hex`] = value;
      settings[setting] = parseColor(value);
    } else {
      settings[setting] = Number(value);
    }

    if (setting === "opacity") {
      canvas.style.setProperty("--shader-opacity", String(settings.opacity));
    }

    if (renderer) {
      renderer.requestRender();
    }
  };

  return {
    setSetting,
    getSettings: () => ({
      ...settings,
      colorHexes: [...settings.colorHexes]
    })
  };
}

function initAuroraShaders() {
  const canvases = [...document.querySelectorAll("[data-aurora-shader]")];

  if (canvases.length === 0 || !window.auroraShaderSources) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 45rem)").matches) {
    canvases.forEach((canvas) => {
      canvas.hidden = true;
    });
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

  const initCanvas = (canvas) => {
    if (canvas.dataset.shaderReady === "true") {
      return;
    }

    canvas.dataset.shaderReady = "true";

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
      label: "Aurora",
      contextType: "webgl2",
      contextOptions: {
        alpha: true,
        antialias: true,
        depth: false,
        premultipliedAlpha: true,
        powerPreference: "low-power"
      },
      settings: {
        amplitude: Number(canvas.dataset.amplitude || 0.74),
        blend: Number(canvas.dataset.blend || 0.82),
        speed: Number(canvas.dataset.speed || 0.46),
        timeOffset: Number(canvas.dataset.timeOffset || 0),
        colorStops: (canvas.dataset.colorStops || "#202423,#d81919,#eff3ec").split(",").flatMap(hexToRgb)
      },
      getLocations: (gl, program) => ({
        time: gl.getUniformLocation(program, "uTime"),
        amplitude: gl.getUniformLocation(program, "uAmplitude"),
        colorStops: gl.getUniformLocation(program, "uColorStops"),
        blend: gl.getUniformLocation(program, "uBlend"),
        timeOffset: gl.getUniformLocation(program, "uTimeOffset")
      }),
      draw: ({ gl, locations, settings, time }) => {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.uniform1f(locations.time, time * settings.speed);
        gl.uniform1f(locations.amplitude, settings.amplitude);
        gl.uniform1f(locations.timeOffset, settings.timeOffset);
        gl.uniform3fv(locations.colorStops, settings.colorStops);
        gl.uniform1f(locations.blend, settings.blend);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    });
  };

  if (!("IntersectionObserver" in window)) {
    canvases.forEach(initCanvas);
    return;
  }

  const shaderObserver = new IntersectionObserver((entries, observer) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        initCanvas(entry.target);
        observer.unobserve(entry.target);
      });
  }, { rootMargin: "20% 0% 20% 0%", threshold: 0 });

  canvases.forEach((canvas) => shaderObserver.observe(canvas));
}

function initProjectImages() {
  const cards = [...document.querySelectorAll("[data-project-bg]")];

  if (cards.length === 0) {
    return;
  }

  const loadProjectImage = (card) => {
    if (card.classList.contains("has-project-bg")) {
      return;
    }

    card.style.setProperty("--project-bg", `url("${card.dataset.projectBg}")`);
    card.classList.add("has-project-bg");
  };

  if (!("IntersectionObserver" in window)) {
    cards.forEach(loadProjectImage);
    return;
  }

  const projectObserver = new IntersectionObserver((entries, observer) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        loadProjectImage(entry.target);
        observer.unobserve(entry.target);
      });
  }, { rootMargin: "35% 0% 35% 0%", threshold: 0 });

  cards.forEach((card) => projectObserver.observe(card));
}

function initIndustryImages() {
  const items = [...document.querySelectorAll("[data-industry-bg]")];

  if (items.length === 0) {
    return;
  }

  const loadIndustryImage = (item) => {
    if (item.classList.contains("has-industry-bg")) {
      return;
    }

    item.style.setProperty("--industry-bg", `url("${item.dataset.industryBg}")`);
    item.classList.add("has-industry-bg");
  };

  if (!("IntersectionObserver" in window)) {
    items.forEach(loadIndustryImage);
    return;
  }

  const industryObserver = new IntersectionObserver((entries, observer) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        entry.target.querySelectorAll("[data-industry-bg]").forEach(loadIndustryImage);
        observer.unobserve(entry.target);
      });
  }, { rootMargin: "20% 0% 20% 0%", threshold: 0 });

  const industryStrip = document.querySelector(".industry-strip__list");

  if (industryStrip) {
    industryObserver.observe(industryStrip);
  } else {
    items.forEach(loadIndustryImage);
  }
}

initExperienceYears();
initHeroCollapse();
initReveals();
initTooltips();
initBackToTop();
heroShaderApi = initHeroShader();
initFoldGradientControls(heroShaderApi);
initAuroraShaders();
initProjectImages();
initIndustryImages();
