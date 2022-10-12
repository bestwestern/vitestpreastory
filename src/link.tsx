import { VNode } from "preact";

import { h } from "preact";
interface LinkProps {
  newRoute: Array<string>;
  text?: string;
  children?: VNode;
  route: any;
  className?: string;
}
const Link = ({
  newRoute,
  text,
  children,
  route,
  className = "",
}: LinkProps) => {
  const url = window.location.origin + "/" + newRoute.join("/");
  const click = (e: MouseEvent) => {
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) return;
    e.preventDefault();
    route.value = newRoute;
    history.pushState(null, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  };
  return (
    <a href={url} onClick={click} class={className}>
      {children || text || url}
    </a>
  );
};
export default Link;
