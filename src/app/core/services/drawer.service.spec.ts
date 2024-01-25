import { TestBed } from '@angular/core/testing';
import { DrawerService } from './drawer.service';

describe('DrawerService', () => {
    let service: DrawerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DrawerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have initial drawer state as false', (done: DoneFn) => {
        service.currentDrawerState.subscribe(state => {
            expect(state).toBeFalse();
            done();
        });
    });

    it('should change drawer state to true', (done: DoneFn) => {
        service.changeDrawerState(true);
        service.currentDrawerState.subscribe(state => {
            expect(state).toBeTrue();
            done();
        });
    });

    it('should toggle drawer state', (done: DoneFn) => {
        service.changeDrawerState(true); // first change to true
        service.changeDrawerState(false); // then change to false

        service.currentDrawerState.subscribe(state => {
            expect(state).toBeFalse();
            done();
        });
    });
});
