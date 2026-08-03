const fs = require("fs");
const path = require("path");

const rootPkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
let targetVersion = rootPkg.version;

if (!targetVersion && fs.existsSync("lerna.json")) {
  const lerna = JSON.parse(fs.readFileSync("lerna.json", "utf8"));
  targetVersion = lerna.version;
}

if (!targetVersion) {
  console.error("❌ Version missing in root package.json");
  process.exit(1);
}

console.log("📌 Unifying version across workspace to:", targetVersion);

rootPkg.version = targetVersion;
fs.writeFileSync("package.json", JSON.stringify(rootPkg, null, "\t") + "\n");

if (fs.existsSync("lerna.json")) {
  const lerna = JSON.parse(fs.readFileSync("lerna.json", "utf8"));
  lerna.version = targetVersion;
  fs.writeFileSync("lerna.json", JSON.stringify(lerna, null, 2) + "\n");
}

const packagesDir = "packages";
const packages = fs.readdirSync(packagesDir);
const dependencySections = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];

packages.forEach(pkgName => {
  const pkgJsonPath = path.join(packagesDir, pkgName, "package.json");
  if (fs.existsSync(pkgJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
    pkg.version = targetVersion;

    dependencySections.forEach(section => {
      if (!pkg[section]) return;

      Object.keys(pkg[section])
        .filter(dependencyName => dependencyName.startsWith("@ienlab/"))
        .forEach(dependencyName => {
          pkg[section][dependencyName] = "^" + targetVersion;
        });
    });

    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log("  - Updated " + pkg.name + ": " + targetVersion);
  }
});

const templatePkgPath = "packages/create-tistory-react/template/package.json";
if (fs.existsSync(templatePkgPath)) {
  const tPkg = JSON.parse(fs.readFileSync(templatePkgPath, "utf8"));
  if (tPkg.dependencies && tPkg.dependencies["@ienlab/tistory-react"]) {
    tPkg.dependencies["@ienlab/tistory-react"] = "^" + targetVersion;
    fs.writeFileSync(templatePkgPath, JSON.stringify(tPkg, null, 2) + "\n");
  }
}

const testFile = "packages/create-tistory-react/src/template.test.mjs";
if (fs.existsSync(testFile)) {
  let content = fs.readFileSync(testFile, "utf8");
  content = content.replace(/^0.[0-9]+.[0-9]+(-[a-z0-9.]+)?/g, "^" + targetVersion);
  fs.writeFileSync(testFile, content);
}

console.log("✅ All package versions unified successfully!");
