import { createStore } from "@dskit/core";
import { render } from "../src/vars";
import { describe, it, expect } from "vitest";

describe("render", () => {
  it("base", () => {
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
      "$semantic.color.base",
      "$scale.color.gray-00",
      "None",
      "theme-dark",
    );
    store.addSemanticDefinition(
      "$semantic.button.primary",
      "$scale.color.gray-00",
      "background-color",
      "theme-dark",
    );

    console.log(render(store));
  });
});
