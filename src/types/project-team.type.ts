export type ProjectTeamType = {
    id: number;
    first_name: string;
    last_name: string;
    national_id: string;
    phone_no: string;
    address: string;
    post: "personnel" | "daily worker" | "contractor";
}