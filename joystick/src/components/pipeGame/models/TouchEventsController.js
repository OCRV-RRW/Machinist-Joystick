export class TouchEventsController {
    constructor() {
        this.observers = {
            touchMoveObservers: [],
            touchEndObservers: []
        }
    }

    subscribe(observer, eventType) {
        switch (eventType) {
            case "touchMove":
                if (this.observers.touchMoveObservers.find((o) => o === observer) === undefined)
                    this.observers.touchMoveObservers.push(observer)
                break
            case "touchEnd":
                if (this.observers.touchEndObservers.find((o) => o === observer) === undefined)
                    this.observers.touchEndObservers.push(observer)
                break
            default:
                console.log("invalid touch event type!!!!")
        }
    }

    unsubscribe(observer, eventType) {
        switch (eventType) {
            case "touchMove":
                this.observers.touchMoveObservers = this.observers.touchMoveObservers.filter((o) => o !== observer)
                break
            case "touchEnd":
                this.observers.touchEndObservers = this.observers.touchEndObservers.filter((o) => o !== observer)
                break
            default:
                console.log("invalid touch event type!!!!")
        }
    }

    invoke(touchPosition, eventType, prevCell, currentColor) {
        switch (eventType) {
            case "touchStart":
                this.observers.touchStartObservers.forEach((o) => o(touchPosition))
                break
            case "touchMove":
                this.observers.touchMoveObservers.forEach((o) => o(touchPosition, prevCell, currentColor))
                break
            case "touchEnd":
                this.observers.touchEndObservers.forEach((o) => o(touchPosition))
                break
            default:
                console.log("invalid touch event type!!!!")
        }
    }
}