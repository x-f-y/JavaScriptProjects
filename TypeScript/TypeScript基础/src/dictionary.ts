export type Callback<T, U> = (key: T, val: U) => void;

/**
 * 字典类，用于保存键值对的数据
 */
export class Dictionary<K, V> {
  private keys: K[] = [];
  private vals: V[] = [];

  get size(){
    return this.keys.length;
  }

  set(key: K, val: V): void {
    const index: number = this.keys.indexOf(key);
    if(index < 0){
      this.keys.push(key);
      this.vals.push(val);
    }else{
      this.vals[index] = val;
    }
  }

  forEach(callback: Callback<K, V>): void {
    this.keys.forEach((k, i) => {
      callback(k, this.vals[i]);
    })
  }

  has(key: K): boolean {
    return this.keys.includes(key);
  }

  delete(key: K): void {
    const index: number = this.keys.indexOf(key);
    if(index < 0){
      return;
    }
    this.keys.splice(index, 1);
    this.vals.splice(index, 1);
  }
}