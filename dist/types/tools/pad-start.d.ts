import { Tool } from '../interfaces';
export declare class PadStart implements Tool {
    name: string;
    icon?: string | undefined;
    action?: any;
    constructor(name: string, key: string, icon?: string);
}
