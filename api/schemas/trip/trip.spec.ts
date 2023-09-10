import { describe, expect, it } from "vitest";

import { tripSchema } from "./trip";
import JSONFile from "../../dumps/status-00p.json";

describe("Trip Schema", () => {
  it("should work with dumped json", () => {
    expect(() => tripSchema.parse(JSONFile)).not.toThrow();
  });
});
