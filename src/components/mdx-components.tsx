import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { createElement, memo, type ComponentType } from "react";

const components = { Image };
type MDXComponent = ComponentType<{ components: typeof components }>;
const componentCache = new Map<string, MDXComponent>();

function getMDXComponent(code: string) {
  const cached = componentCache.get(code);
  if (cached) return cached;

  const Component = new Function(code)(runtime).default as MDXComponent;
  componentCache.set(code, Component);
  return Component;
}

export const MDXContent = memo(function MDXContent({ code }: { code: string }) {
  return createElement(getMDXComponent(code), { components });
});
