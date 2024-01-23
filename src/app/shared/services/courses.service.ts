import { Injectable } from '@angular/core';
import coursesData from '@app/db/data.json';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses = coursesData;

  constructor() { }

  getCourseById(id: number) {
    return this.courses.find(course => course.id === id);
  }
}
