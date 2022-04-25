import { sum } from '../../src/calc';

describe('add func', () => {
    it('Should return 15', () => {
        expect(sum(10, 5)).toBe(15);
    });
});