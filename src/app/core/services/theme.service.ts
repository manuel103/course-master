import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private themeKey = 'theme';
    private themeSubject: BehaviorSubject<string>;

    constructor() {
        const savedTheme = localStorage.getItem(this.themeKey) || 'light-theme';
        this.themeSubject = new BehaviorSubject<string>(savedTheme);
    }

    setTheme(theme: string): void {
        localStorage.setItem(this.themeKey, theme);
        this.applyTheme(theme);
        this.themeSubject.next(theme);
    }

    getTheme(): string {
        return localStorage.getItem(this.themeKey) || 'light-theme'; // Set a default theme if no theme is found
    }

    private applyTheme(theme: string): void {
        document.body.setAttribute('class', ''); // Clear the current theme class

        if (theme) {
            document.body.classList.add(theme);
        }
    }

    getThemeObservable(): Observable<string> {
        return this.themeSubject.asObservable();
    }
}
