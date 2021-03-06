import { File } from "./chess_types";

export const fileMapper = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7
}

export const fileMapperReverse: {
    0:File,
    1:File,
    2:File,
    3:File,
    4:File,
    5:File,
    6:File,
    7:File
} = {
    0:'A',
    1:'B',
    2:'C',
    3:'D',
    4:'E',
    5:'F',
    6:'G',
    7:'H'
}

export type fileHelper = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;