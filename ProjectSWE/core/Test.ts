import { Student } from '../types/Student';
import {Selectable} from '../core/Main'

let S1: Student = ({
    Name: 'Test',
    StudentNumber: 123123,
    Surname: 'Test',
    Grades: [{
        Grade: 8,
        CourseId: 2
    },
    {
        Grade: 10,
        CourseId: 5
    }]
});

let S2: Student = ({
    Name: 'Steve',
    StudentNumber: 32382,
    Surname: 'Wanggang',
    Grades: [{
        Grade: 8,
        CourseId: 2,
    },
    {
        Grade: 9,
        CourseId: 4,
    }]
});

let S3: Student = ({
    Name: 'Beau',
    StudentNumber: 3424728974,
    Surname: 'Casemie',
    Grades: [{
        Grade: 7,
        CourseId: 4,
    },
    {
        Grade: 8.5,
        CourseId: 2,
    },
    {
        Grade: 1,
        CourseId: 9,
    }]
});

let S4: Student = ({
    Name: 'Steven',
    StudentNumber: 101010,
    Surname: 'Wang',
    Grades: [{
        Grade: 5.5,
        CourseId: 9,
    },
    {
        Grade: 2,
        CourseId: 2,
    }]
});

let S5: Student = ({
    Name: 'Steven',
    StudentNumber: 101010,
    Surname: 'Wang',
    Grades: [{
        Grade: 5.5,
        CourseId: 9,
    },
    {
        Grade: 2,
        CourseId: 2,
    }]
});

let students = [S1, S2, S3, S4, S5]
let selectableStudents = Selectable<Student>(students);
let selection = selectableStudents
    .select('Name', 'StudentNumber', 'Surname')
    .include('Grades', q => q.select('Grade','CourseId')
        .orderBy('ASC', 'CourseId'))
        .orderBy('ASC', 'Surname')
    .result

// Pretty print the result
console.log('QueryResult', JSON.stringify( selection, null, 4));