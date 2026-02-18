import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

export function save(dir: string, filename: string, payload: unknown): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, filename), JSON.stringify(payload, null, 2));
}
