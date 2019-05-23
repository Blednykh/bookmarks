import {tag} from "./tag";

export interface bookmark {
    id: number;
    url: string;
    title: string;
    tags: tag[];
    date: any;
}
