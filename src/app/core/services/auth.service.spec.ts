import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }
            ]
        });
        service = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    afterEach(() => {
        localStorage.removeItem('isAuthenticated');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should authenticate with correct credentials', () => {
        expect(service.login('dummy', 'dummy@123')).toBeTrue();
        expect(localStorage.getItem('isAuthenticated')).toBe('true');
    });

    it('should not authenticate with incorrect credentials', () => {
        expect(service.login('wrongUser', 'wrongPassword')).toBeFalse();
        expect(localStorage.getItem('isAuthenticated')).toBeNull();
    });

    it('should logout and remove isAuthenticated from localStorage', () => {
        service.logout();
        expect(localStorage.getItem('isAuthenticated')).toBeNull();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should return true if the user is logged in', () => {
        service.login('dummy', 'dummy@123');
        expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if the user is not logged in', () => {
        expect(service.isLoggedIn()).toBeFalse();
    });
});
