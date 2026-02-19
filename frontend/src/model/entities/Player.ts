import { BaseEntity } from "./_entity";

export enum UserRole{
     CREATOR = "creator",
    JOINER = "joiner"
}


export interface Player extends BaseEntity{
    name:string,
    role : UserRole,
    score : number,
    avatar?:string;
}