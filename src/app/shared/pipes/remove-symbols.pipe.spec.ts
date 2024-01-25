import { RemoveSymbolsPipe } from './remove-symbols.pipe';

describe('RemoveSymbolsPipe', () => {
    let pipe: RemoveSymbolsPipe;

    beforeEach(() => {
        pipe = new RemoveSymbolsPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should remove all non-digit, non-period, and non-hyphen symbols', () => {
        const result = pipe.transform('abc123-4.56!@#$%^&*()_+');
        expect(result).toBe('123-4.56');
    });

    it('should return empty string if input is null or undefined', () => {
        expect(pipe.transform('')).toBe('');
        expect(pipe.transform('')).toBe('');
    });

    it('should not remove digits, periods, and hyphens', () => {
        const result = pipe.transform('123.45-67');
        expect(result).toBe('123.45-67');
    });

    it('should handle an empty string', () => {
        const result = pipe.transform('');
        expect(result).toBe('');
    });

    it('should handle strings with only symbols', () => {
        const result = pipe.transform('!@#$%^&*()');
        expect(result).toBe('');
    });
});
