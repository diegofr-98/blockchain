export class BlockchainError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ValidationError extends BlockchainError {
    constructor(message) {
        super(message);
    }
}
