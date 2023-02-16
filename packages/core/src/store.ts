import { isScaleTokenDefinition, isSemanticTokenDefinition } from "./guard";
import {
  Definition,
  ScaleTokenDefinition,
  SemanticTokenDefinition,
} from "./interface";
import {
  stringifyCommand,
  stringifyScaleToken,
  stringifyScaleTokenBinding,
  stringifyToken,
} from "./stringify";
import * as N3 from "n3";
import { parseCommand } from "./parser";

const { DataFactory } = N3;
const { namedNode, quad } = DataFactory;

function scaleTokenDefinitionToQuads(def: ScaleTokenDefinition): N3.Quad[] {
  const { token, binding, condition } = def;
  const graph = stringifyCommand(def);
  return [
    quad(
      namedNode(stringifyToken(token)),
      namedNode("is"),
      namedNode(stringifyScaleTokenBinding(binding)),
      namedNode(graph),
    ),
    quad(namedNode(graph), namedNode("condition"), namedNode(condition ?? "*")),
  ];
}

function semanticTokenDefinitionToQuads(
  def: SemanticTokenDefinition,
): N3.Quad[] {
  const { token, binding, condition, property } = def;
  const graph = stringifyCommand(def);

  if (property != null) {
    return [
      quad(
        namedNode(stringifyToken(token)),
        namedNode("has"),
        namedNode(stringifyScaleToken(binding)),
        namedNode(graph),
      ),
      quad(
        namedNode(graph),
        namedNode("condition"),
        namedNode(condition ?? "*"),
      ),
      quad(namedNode(graph), namedNode("property"), namedNode(property)),
    ];
  }

  return [
    quad(
      namedNode(stringifyToken(token)),
      namedNode("is"),
      namedNode(stringifyScaleToken(binding)),
      namedNode(graph),
    ),
    quad(namedNode(graph), namedNode("condition"), namedNode(condition ?? "*")),
  ];
}

let listeners: Array<() => void> = [];

export function createStore() {
  const store = new N3.Store();

  let snapshot = {
    getConditions,
    getTokens,
    getDefinitions,
    getQuads,
    evaluateToken,
  };

  function addDefinition(def: Definition) {
    if (isScaleTokenDefinition(def)) {
      store.addQuads(scaleTokenDefinitionToQuads(def));
    }

    if (isSemanticTokenDefinition(def)) {
      store.addQuads(semanticTokenDefinitionToQuads(def));
    }

    snapshot = { ...snapshot };
    emitChange();
  }

  function getConditions(): string[] {
    const quads = store.getQuads(null, "condition", null, null);
    return [...new Set(quads.map((quad) => quad.object.value))];
  }

  function getTokens() {
    const quads = store.getQuads(null, "is", null, null);
    return [...new Set(quads.map((token) => token.subject.value))];
  }

  function getDefinitions() {
    const quads = store.getQuads(null, "is", null, null);
    return quads.map((quad) => parseCommand(quad.graph.value));
  }

  function getQuads(
    subject?: string | null,
    predicate?: string | null,
    object?: string | null,
    graph?: string | null,
  ) {
    return store.getQuads(
      subject ?? null,
      predicate ?? null,
      object ?? null,
      graph ?? null,
    );
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

  function subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function getSnapshot() {
    return snapshot;
  }

  return {
    subscribe,
    getSnapshot,
    addDefinition,
  };
}

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export type Store = ReturnType<typeof createStore>;
