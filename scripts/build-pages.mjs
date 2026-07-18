import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const run = (command) => {
  execSync(command, {
    cwd: root,
    stdio: "inherit"
  });
};

const minify = () => {
  run("npx --yes clean-css-cli -o styles.min.css styles.css");
  run("npx --yes terser aurora-shader.js -c -m -o aurora-shader.min.js");
  run("npx --yes terser site.js -c -m -o site.min.js");
};

const copy = () => {
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });

  [
    ".nojekyll",
    "CNAME",
    "favicon-mark.svg",
    "favicon.svg",
    "index.html",
    "llms.txt",
    "robots.txt",
    "sitemap.xml",
    "styles.min.css",
    "aurora-shader.min.js",
    "site.min.js"
  ].forEach((file) => {
    copyFileSync(join(root, file), join(dist, file));
  });

  cpSync(join(root, "assets"), join(dist, "assets"), { recursive: true });
};

const validate = () => {
  const required = [
    "index.html",
    "styles.min.css",
    "aurora-shader.min.js",
    "site.min.js",
    "CNAME",
    ".nojekyll"
  ];

  required.forEach((file) => {
    if (!existsSync(join(dist, file))) {
      throw new Error(`Missing dist/${file}`);
    }
  });

  if (existsSync(join(dist, "scripts"))) {
    throw new Error("Build scripts should not be copied into dist");
  }
};

minify();
copy();
validate();
