import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    let service: ThemeService;
    let localStorageSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ThemeService);
        localStorageSpy = spyOn(localStorage, 'setItem');
    });

    afterEach(() => {
        localStorage.clear(); // Clear localStorage after each test
    });

    it('should be created with default theme', () => {
        expect(service).toBeTruthy();
        const theme = service.getTheme();
        expect(theme).toBe('light-theme');
    });

    it('should use saved theme from localStorage', () => {
        localStorage.setItem('theme', 'dark-theme');
        const newService = TestBed.inject(ThemeService);
        expect(newService.getTheme()).toBe(newService.getTheme());
    });

    it('should set and save a new theme', () => {
        service.setTheme('dark-theme');
        expect(localStorageSpy).toHaveBeenCalledWith('theme', 'dark-theme');
        expect(document.body.classList.contains('dark-theme')).toBeTrue();
    });

    it('should emit the new theme to observers', async () => {
        service.getThemeObservable().subscribe(theme => {
            expect(theme).toBe(theme);
        });

        service.setTheme('dark-theme');
    });
});
