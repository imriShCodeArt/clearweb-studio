"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import { usePathname, useRouter } from "next/navigation";

const FADE_MS = 400;

let arriveHidden = false;

export function PageFade({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(() => !arriveHidden);
  const visibleRef = useRef(visible);
  const leaving = useRef(false);
  const pending = useRef<string | null>(null);

  useEffect(() => {
    arriveHidden = false;
    visibleRef.current = true;
    setVisible(true);
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const anchor = clickedAnchor(event);
      if (!anchor || !leavesThePage(anchor, event)) return;

      event.preventDefault();
      const href = destination(anchor);
      pending.current = href;
      router.prefetch(href.split("#")[0]);

      if (!visibleRef.current) {
        leaving.current = false;
        arriveHidden = true;
        router.push(href);
        return;
      }

      leaving.current = true;
      visibleRef.current = false;
      setVisible(false);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  function onFade(event: React.TransitionEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== "opacity") return;
    if (!leaving.current) return;

    const href = pending.current;
    if (!href) return;

    leaving.current = false;
    arriveHidden = true;
    router.push(href);
  }

  return (
    <Box
      component="main"
      onTransitionEnd={onFade}
      sx={{
        flex: 1,
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
        },
      }}
    >
      {children}
    </Box>
  );
}

function clickedAnchor(event: MouseEvent) {
  if (!(event.target instanceof Element)) return null;
  const anchor = event.target.closest("a");
  return anchor instanceof HTMLAnchorElement ? anchor : null;
}

function leavesThePage(anchor: HTMLAnchorElement, event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const next = new URL(anchor.href);
  if (next.origin !== window.location.origin) return false;

  const nextPath = `${trimSlash(next.pathname)}${next.search}`;
  const currentPath = `${trimSlash(window.location.pathname)}${window.location.search}`;
  return nextPath !== currentPath;
}

function destination(anchor: HTMLAnchorElement) {
  const url = new URL(anchor.href);
  return `${url.pathname}${url.search}${url.hash}`;
}

function trimSlash(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}
