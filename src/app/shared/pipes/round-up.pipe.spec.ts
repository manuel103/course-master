import { RoundUpPipe } from './round-up.pipe';

describe('RoundUpPipe', () => {
    let pipe: RoundUpPipe;

    beforeEach(() => {
        pipe = new RoundUpPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should round up a decimal value', () => {
        expect(pipe.transform(3.142)).toBe(3.15);
        expect(pipe.transform(1.005)).toBe(1.01);
    });

    it('should not change an integer value', () => {
        expect(pipe.transform(5)).toBe(5);
    });

    it('should handle zero', () => {
        expect(pipe.transform(0)).toBe(0);
    });
});
