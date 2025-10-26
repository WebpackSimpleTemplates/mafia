import { use, useSyncExternalStore } from "react";

const promises: { [key: string]: { promise: Promise<any>, fetch: () => Promise<any>, subs: (() => void)[] } } = {};

export const invalidate = async (filter: (key: string) => boolean) => {
  const keys = Object.keys(promises);
  
  if (keys.length) {
    await Promise.all(keys.map(async (key) => {
      if (!filter(key)) {
        return;
      }

      if (promises[key].subs.length === 0) {
        delete promises[key];
        return;
      }

      promises[key].promise = promises[key].fetch();
      await promises[key].promise;

      for (const update of promises[key].subs) {
        update();
      }
    }));
  }

  return null;
};

export function useQuery<T>(key: string, fetch: () => Promise<T>) {
  if (!promises[key]) {
    promises[key] = {
      promise: fetch(),
      fetch,
      subs: [],
    };
  }

  const promise = useSyncExternalStore((update) => {
    promises[key].subs.push(update);
    return () => promises[key].subs = promises[key].subs.filter((s) => s !== update);
  }, () => promises[key].promise)

  return use(promise) as T;
}
