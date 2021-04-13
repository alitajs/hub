let globalData = {};

type Subscription<T> = (val: T) => void;

class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>();

  emit = (val: T) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const subscription of this.subscriptions) {
      subscription(val);
    }
  };

  useSubscription = (callback: Subscription<T>) => {
    function subscription(val: T) {
      if (callback) {
        callback(val);
      }
    }
    this.subscriptions.add(subscription);
  };
}
const dataEmitter = new EventEmitter();

const setGlobalData = (value: any) => {
  globalData = { ...globalData, ...value };
  dataEmitter.emit('');
};
const getGlobalData = () => globalData;

export { setGlobalData, getGlobalData, dataEmitter };
