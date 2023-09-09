import { describe, expect, it } from "vitest";

import { statusSchema } from "./status";
// import type { StatusNew } from "./status";
import JSONFile from "../../dumps/trip-pp9.json";

describe("Status Schema", () => {
  it("should work with dumped json", () => {
    expect(() => statusSchema.parse(JSONFile)).not.toThrow();
  });
});
