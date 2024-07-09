class EventBus {
    private events: { [event: string]: ((data: any) => void)[] } = {};
  
    on(event: string, callback: (data: any) => void) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    }
  
    emit(event: string, data: any) {
      const callbacks = this.events[event];
      if (callbacks) {
        callbacks.forEach((callback) => {
          callback(data);
        });
      }
    }
  }
  
  export default new EventBus();
  