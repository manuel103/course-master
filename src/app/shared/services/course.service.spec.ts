import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import coursesData from '@app/db/data.json';

describe('CoursesService', () => {
    let service: CoursesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CoursesService]
        });
        service = TestBed.inject(CoursesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a course for a valid ID', () => {
        // Assuming the JSON data has a course with id 1
        const courseId = 1;
        const expectedCourse = coursesData.find(course => course.id === courseId);
        const course = service.getCourseById(courseId);
        expect(course).toEqual(expectedCourse);
    });

    it('should return undefined for an invalid ID', () => {
        const invalidCourseId = 9999; // An ID that doesn't exist in the JSON data
        const course = service.getCourseById(invalidCourseId);
        expect(course).toBeUndefined();
    });
});
