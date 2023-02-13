import { createStore } from "../src/store";
import { describe, it, expect } from "vitest";

describe("store", () => {
  it("scale", () => {
    const store = createStore();
    store.addScaleDefinition(
      "$scale.color.gray-00",
      "rgb(0, 0, 0)",
      "theme-light",
    );
    store.addScaleDefinition(
      "$scale.color.gray-00",
      "rgb(255, 255, 255)",
      "theme-dark",
    );

    const defs = store.getScaleDefinitions("theme-light");

    expect(defs.length).toBe(1);
    expect(defs[0].binding).toBe("rgb(0, 0, 0)");
  });

  it("semantic", () => {
    const store = createStore();
    store.addScaleDefinition(
      "$scale.color.gray-00",
      "rgb(0, 0, 0)",
      "theme-light",
    );
    store.addScaleDefinition(
      "$scale.color.gray-00",
      "rgb(255, 255, 255)",
      "theme-dark",
    );
    store.addSemanticDefinition(
      "$semantic.button.primary",
      "$scale.color.gray-00",
      "background-color",
      "theme-light",
    );

    const defs = store.getSemanticDefinitions("theme-light");

    expect(defs.length).toBe(1);
    expect(defs[0].binding).toBe("$scale.color.gray-00");
    expect(defs[0].property).toBe("background-color");
  });
});
