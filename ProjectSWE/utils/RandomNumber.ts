const randomInt = (min:number, max:number): number => {
    min = min
    max = max
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomFloat = (min:number, max:number): number => {
    min = min
    max = max
    return Math.random() * (max - min) + min;
}

