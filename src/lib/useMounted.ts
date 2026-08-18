import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True once the component has mounted on the client. Used to defer logic
 * that depends on client-only state (e.g. a localStorage-hydrated cart)
 * until after the server-rendered first paint, without the extra render
 * (and lint warning) that a `useEffect(() => setMounted(true), [])` causes.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
