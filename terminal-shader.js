window.terminalShaderSources = {
  vertex: `
    attribute vec2 aPosition;
    varying vec2 vUv;

    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `,
  fragment: `
    precision mediump float;

    varying vec2 vUv;

    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uScale;
    uniform float uDigitSize;
    uniform float uNoiseAmp;
    uniform float uGlitchAmount;
    uniform float uScanlineIntensity;
    uniform float uBrightness;
    uniform float uCurvature;

    float time;

    float hash21(vec2 p) {
      p = fract(p * 234.56);
      p += dot(p, p + 34.56);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2;
    }

    mat2 rotate(float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return mat2(c, -s, s, c);
    }

    float fbm(vec2 p) {
      p *= 1.1;
      float f = 0.0;
      float amp = 0.5 * uNoiseAmp;

      mat2 modify0 = rotate(time * 0.02);
      f += amp * noise(p);
      p = modify0 * p * 2.0;
      amp *= 0.454545;

      mat2 modify1 = rotate(time * 0.02);
      f += amp * noise(p);
      p = modify1 * p * 2.0;
      amp *= 0.454545;

      mat2 modify2 = rotate(time * 0.08);
      f += amp * noise(p);

      return f;
    }

    float pattern(vec2 p, out vec2 q, out vec2 r) {
      vec2 offset1 = vec2(1.0);
      vec2 offset0 = vec2(0.0);
      mat2 rot01 = rotate(0.1 * time);
      mat2 rot1 = rotate(0.1);

      q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
      r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
      return fbm(p + r);
    }

    float digit(vec2 p) {
      vec2 grid = vec2(2.0, 1.0) * 15.0;
      vec2 s = floor(p * grid) / grid;
      p = p * grid;

      vec2 q;
      vec2 r;
      float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
      intensity += hash21(s + floor(time * 3.0)) * 0.2;

      p = fract(p);
      p *= uDigitSize;

      float px5 = p.x * 5.0;
      float py5 = (1.0 - p.y) * 5.0;
      float x = fract(px5);
      float y = fract(py5);

      float i = floor(py5) - 2.0;
      float j = floor(px5) - 2.0;
      float n = i * i + j * j;
      float f = n * 0.0625;

      float isOn = step(0.1, intensity - f);
      float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);

      return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
    }

    float onOff(float a, float b, float c) {
      return step(c, sin(time * 3.0 + a * cos(time * b)));
    }

    float displace(vec2 look) {
      float y = look.y - mod(time * 0.75, 1.0);
      float window = 1.0 / (1.0 + 50.0 * y * y);
      return sin(look.y * 20.0 + time * 3.0) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(time * 180.0)) * window;
    }

    vec3 getColor(vec2 p) {
      float bar = step(mod(p.y + time * 60.0, 1.0), 0.2) * 0.4 + 1.0;
      bar *= uScanlineIntensity;

      float displacement = displace(p);
      p.x += displacement * uGlitchAmount;

      float middle = digit(p);

      const float off = 0.002;
      float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                  digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                  digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));

      return vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    }

    vec2 barrel(vec2 uv) {
      vec2 c = uv * 2.0 - 1.0;
      float r2 = dot(c, c);
      c *= 1.0 + uCurvature * r2;
      return c * 0.5 + 0.5;
    }

    void main() {
      time = uTime * 0.333333;
      vec2 uv = barrel(vUv);
      vec2 p = uv * uScale;
      vec3 col = getColor(p);
      col *= vec3(0.86, 0.91, 0.84);
      col *= uBrightness;

      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * 0.012;

      gl_FragColor = vec4(col, max(max(col.r, col.g), col.b));
    }
  `
};
