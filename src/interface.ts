export interface User {
    firstName: string;
    lastName: string;
    job: string;
    isObserver: boolean;
    foto: string;
}
export interface ValueURL {
    url: string;
}
export interface IGame {
    game_nice_id: string,
    diller_nice_id: string,
    status: string,
}
export interface IMembers {
    nice_id: string,
    first_name: string,
    last_name: string,
    is_diller: boolean,
    is_player: boolean,
    job: string,
}
export interface IIssues {
    title: string,
    nice_id: string,
    is_current: boolean,
    link: string,
    priority: string,

}


