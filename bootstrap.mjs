import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const bundleDirectory = ".bootstrap";
const archivePath = ".workplace-source.tar.gz";

if (!existsSync(bundleDirectory)) {
  console.log("Source produksi sudah tersedia.");
  process.exit(0);
}

const parts = readdirSync(bundleDirectory)
  .filter((name) => name.startsWith("workplace.tar.gz.b64.part"))
  .sort();

if (parts.length === 0) {
  throw new Error("Paket source produksi tidak ditemukan.");
}

const encoded = parts
  .map((name) => readFileSync(join(bundleDirectory, name), "utf8"))
  .join("")
  .replace(/\s+/g, "");

writeFileSync(archivePath, Buffer.from(encoded, "base64"));
execFileSync("tar", ["-xzf", archivePath, "-C", "."], { stdio: "inherit" });
unlinkSync(archivePath);
rmSync(bundleDirectory, { recursive: true, force: true });
console.log("Source produksi Workplace Control berhasil diekstrak.");
