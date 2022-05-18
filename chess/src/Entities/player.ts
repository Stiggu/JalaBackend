import IdHandler from "./idHandler";

export default class Player {
    public id: number;

    constructor(public name: string) {
        this.id = 1;
            // IdHandler.makeID();
    }
}