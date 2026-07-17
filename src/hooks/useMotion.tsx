import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * 动效总开关：
 * - 默认跟随 OS 的 prefers-reduced-motion
 * - 用户可在页面上手动切换，选择持久化到 localStorage
 * - 结果写到 <html data-motion="on|off">，CSS 统一门控
 */

type MotionCtx = { motionOn: boolean; toggle: () => void };
const Ctx = createContext<MotionCtx>({ motionOn: true, toggle: () => {} });

const KEY = "zm-motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  // 惰性初始化，避免子组件首帧读到错误的默认值
  const [motionOn, setMotionOn] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem(KEY);
    if (saved) return saved === "on";
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    apply(motionOn, localStorage.getItem(KEY) !== null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = (on: boolean, userChosen: boolean) => {
    const root = document.documentElement;
    root.dataset.motion = on ? "on" : "off";
    if (userChosen) root.setAttribute("data-motion-override", "");
    else root.removeAttribute("data-motion-override");
  };

  const toggle = useCallback(() => {
    setMotionOn((prev) => {
      const next = !prev;
      localStorage.setItem(KEY, next ? "on" : "off");
      apply(next, true);
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ motionOn, toggle }}>{children}</Ctx.Provider>;
}

export const useMotion = () => useContext(Ctx);
