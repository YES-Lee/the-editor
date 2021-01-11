import { Tool } from '../interfaces/tool';
export declare class Enclose implements Tool {
    name: string;
    icon?: string | undefined;
    action?: any;
    constructor(name: string, key: string, icon?: string);
}
