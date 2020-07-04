
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Entry {
    id: number;
    firstName: string;
    lastName: string;
    region: string;
    flagIso: string;
}

export interface IQuery {
    entry(id: number): Entry | Promise<Entry>;
}
