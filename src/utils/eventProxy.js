const eventProxy = {
    onObj: {},
    oneObj: {},

    $on(event, ...args) {
        if (!this.onObj[event]) {
            this.onObj[event] = [];
        }
        for (let i = 0; i < args.length; i++) {
            this.onObj[event].push(args[i])
        }
    },

    $one(event, ...args) {
        if (!this.oneObj[event]) {
            this.oneObj[event] = [];
        }
        for (let i = 0; i < args.length; i++) {
            this.oneObj[event].push(args[i])
        }
    },

    $trigger(event, ...args) {
        if (!event) {
            return false
        }
        if (this.onObj[event] && this.onObj[event].length > 0) {
            for (let i in this.onObj[event]) {
                this.onObj[event][i].call(null, args[i])
            }
        }
        if (this.oneObj[event] && this.oneObj[event].length > 0) {
            for (let i in this.oneObj[event]) {
                this.oneObj[event][i].apply(null, args);
                this.oneObj[event][i] = undefined;
            }
            this.oneObj[event] = [];
        }
    },

    $off(event) {
        this.onObj[event] = [];
        this.oneObj[event] = [];
    }
}

export default eventProxy;