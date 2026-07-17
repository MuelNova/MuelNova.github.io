import { createContext, useContext } from "react";

/**
 * 动效总开关的 context 与读取 hook。
 * Provider 在 components/MotionProvider（分离是为满足 react-refresh 只导组件的约束）。
 */
export type MotionCtx = { motionOn: boolean; toggle: () => void };
export const MotionCtx = createContext<MotionCtx>({ motionOn: true, toggle: () => {} });

export const useMotion = () => useContext(MotionCtx);
