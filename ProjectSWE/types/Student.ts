import {Grades} from '../types/Grades';

export interface Student {
    Name: string,
    Surname: string,
    Grades:Array<Grades>,
    StudentNumber:number
}