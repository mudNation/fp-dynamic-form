export interface form{
    meta: metaType, 
    pages: pageType[]
}

interface metaType{
    name: string, 
    Description: string, 
    version: string, 
    url: string, 
    status: string,
}

interface pageType{
    name: string,
    title: string,
    description: string,
    actions: action[],
    sections: section[],
}

interface action{
    type: string,
    label: string,
    message?: string,
}

interface section{
    name: string,
    description: string, 
    fields: field[]
}

export interface field{
    id: string,
    name: string, 
    type: string, 
    label: string,
    description: string, 
    validation?: validationType,
    options?: option[],
    value?: '',
    error?: boolean,
}

export interface validationType{
    required: boolean,
    minimum?: string,
    maximum?: string,
    number_of_lines?: number,
    decimal_points?: number,
    minimum_select?: number,
    multi_select?: boolean,
    allowed?: string,
}

interface option{
    id: string,
    label: string,
    value: string,
}

export type FormData = {

    [key: string]: any; 
}
