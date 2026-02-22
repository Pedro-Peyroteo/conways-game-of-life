export class Grid {
    readonly width: number
    readonly height: number
    data: Uint8Array

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.data = new Uint8Array(width * height)
    }

    index(x: number, y: number): number {
        const wrappedX = (x + this.width) % this.width
        const wrappedY = (x + this.height) % this.height
        return wrappedY * this.width + wrappedX
    }

    get(x: number, y: number): number {
        return this.data[this.index(x, y)]
    }

    set(x: number, y: number, value: number): void {
        this.data[this.index(x, y)] = value
    }

    clear(): void {
        this.data.fill(0)
    }
}