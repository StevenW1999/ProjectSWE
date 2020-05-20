import * as Utils from '../utils/Utils';

export interface Student {
    Name: string,
    Surname: string,
    Grades:Array<Grades>,
    StudentNumber:number
}

export interface Grades {
    Grade: number;
    CourseId: number;
}
