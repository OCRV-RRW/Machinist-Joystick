export class Pipe {
    color
    type = null
    vector = []
    directions = []

    constructor(color) {
        this.color = color
    }

    setVector() {
        if (this.directions.length === 2) {
            if (this.directions[0][0] === this.directions[1][0] && 
                this.directions[0][1] === this.directions[1][1]) {
                this.vector = this.directions[0]
            }
            else {
                let vectorSum = this.calculateVectorSum(this.directions[0], this.directions[1])
                let determinant = this.calculateDeterminant(this.directions[0], this.directions[1])
                this.vector = [vectorSum[0] * determinant, vectorSum[1] * determinant]
            }
        }
        else if (this.directions.length === 1)
            this.vector = this.directions[0]

        this.setType()
    }

    setType() {
        if (this.vector[0] === 0 && this.vector[1] === 0) {
            this.type = 'line'
        }
        else if (this.vector[0] === 0 || this.vector[1] === 0) {
            this.type = 'line'
        }
        else {
            this.type = 'curve'
        }
    }

    calculateDeterminant(vector1, vector2) {
        return (vector1[0] * vector2[1]) - (vector2[0] * vector1[1])
    }

    calculateVectorSum(vector1, vector2) {
        return [vector1[0] + vector2[0], vector1[1] + vector2[1]]
    }

    setDirection({x, y}) {
        if (this.directions.length === 2) {
            this.directions[1] = [x, y]
        }
        else {
            this.directions.push([x, y])
        }

        this.setVector()
    }
}