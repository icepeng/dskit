import * as N3 from "n3";
import { ScaleTokenDefinition, SemanticTokenDefinition } from "./data";
import { parseScaleToken, parseSemanticToken } from "./parser";

const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad, blankNode } = DataFactory;

function definitionToQuads() {}

function quadsToDefinition() {}

export function createStore() {
  const store = new N3.Store();

  function addScaleDefinition(
    tokenStr: string,
    binding: string,
    condition: string,
  ) {
    const graph = `${tokenStr}::${binding}::${condition}`;
    store.addQuad(
      quad(
        namedNode(tokenStr),
        namedNode("is"),
        namedNode(binding),
        namedNode(graph),
      ),
    );
    store.addQuad(
      quad(namedNode(graph), namedNode("condition"), namedNode(condition)),
    );
  }

  function addSemanticDefinition(
    tokenStr: string,
    binding: string,
    property: string,
    condition: string,
  ) {
    const graph = `${tokenStr}::${binding}::${condition}::${property}`;
    store.addQuad(
      quad(
        namedNode(tokenStr),
        namedNode("is"),
        namedNode(binding),
        namedNode(graph),
      ),
    );
    store.addQuad(
      quad(namedNode(graph), namedNode("condition"), namedNode(condition)),
    );
    store.addQuad(
      quad(namedNode(graph), namedNode("property"), namedNode(property)),
    );
  }

  function getConditions(): string[] {
    const quads = store.getQuads(null, "condition", null, null);
    return [...new Set(quads.map((quad) => quad.object.value))];
  }

  function getScaleDefinitions(condition: string): ScaleTokenDefinition[] {
    const quads = store
      .getQuads(null, "is", null, null)
      .filter(
        (quad) =>
          store.countQuads(quad.graph, "condition", condition, null) > 0 &&
          store.countQuads(quad.graph, "prefix", "scale", null) > 0,
      );

    return quads.map(({ subject, object, graph }) => {
      const token = parseScaleToken(subject.value);
      const binding = object.value;
      const condition = store.getObjects(graph, "condition", null)[0].value;

      return {
        token,
        binding,
        condition,
      };
    });
  }

  function getSemanticDefinitions(
    condition: string,
  ): SemanticTokenDefinition[] {
    const quads = store
      .getQuads(null, "is", null, null)
      .filter(
        (quad) =>
          store.countQuads(quad.graph, "condition", condition, null) > 0 &&
          store.countQuads(quad.graph, "prefix", "semantic", null) > 0,
      );

    return quads.map(({ subject, object, graph }) => {
      const token = parseSemanticToken(subject.value);
      const binding = object.value;
      const property = store.getObjects(graph, "property", null)[0].value;
      const condition = store.getObjects(graph, "condition", null)[0].value;

      return {
        token,
        binding,
        condition,
        property,
      };
    });
  }

  function getTokens() {
    const tokens = store.getQuads(null, "is", null, null);
    return [...new Set(tokens.map((token) => token.subject.value))];
  }

  function evaluateToken(token: string, graph: string): string | undefined {
    const result = store.getQuads(token, "is", null, graph)[0]?.object.value;

    if (!result) {
      return undefined;
    }

    if (result.startsWith("$")) {
      return evaluateToken(result, graph);
    }

    return result;
  }

  return {
    addScaleDefinition,
    addSemanticDefinition,
    getConditions,
    getScaleDefinitions,
    getSemanticDefinitions,
    getTokens,
    evaluateToken,
  };
}

export type Store = ReturnType<typeof createStore>;
