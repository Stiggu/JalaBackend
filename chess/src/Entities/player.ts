export default class Player {
    public id: number;

    constructor(public name: string) {
        this.id = Player.makeId();
    }

    private static makeId(): number {
        return Math.floor(Math.random() * 9999999999);
    }
}