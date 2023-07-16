import { reactive, readonly, provide, inject } from 'vue';

interface Store {
  points: number[];
  setPoints: (newPoints: number[]) => void;
}

const store: Store = reactive({
  points: [],
  setPoints(newPoints) {
    store.points = newPoints;
  },
});

export function provideStore() {
  provide('store', store);
}

export function useStore(): Store {
  const store = inject<Store>('store');
  if (!store) {
    throw new Error('No store provided');
  }
  return store;
}