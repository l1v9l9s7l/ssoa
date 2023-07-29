interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export default class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
      this.size = size;
      this.container = Array(size);
  }

  enqueue = (item: T) => {
      if (this.length >= this.size) {
          throw new Error("Maximum length exceeded");
      }
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
  };

  dequeue = () => {
      if (this.isEmpty()) {
          throw new Error("No elements in the queue");
      }

      this.container[this.head % this.size] = null;
      this.head++;
      this.length--;
  };

  peak = (): T | null => {
      if (this.isEmpty()) {
          throw new Error("No elements in the queue");
      }
      return this.container[this.head];
  };

  clean = () => {
      this.container = [];
      this.tail = 0;
      this.head = 0;
      this.length = 0;
  }

  isEmpty = () => this.length === 0;

  getElements = () => this.container;

  getTail = () => this.tail > this.size ? this.tail % this.size : this.tail;

  getHead = () => this.head > this.size ? this.head % this.size : this.head;

  getSize = () => this.size;
}