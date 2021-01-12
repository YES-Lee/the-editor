import { Tool } from '../interfaces/tool';
export declare class List implements Tool {
    name: string;
    icon?: string | undefined;
    action?: any;
    constructor(name: string, type: 'ul' | 'ol');
}
