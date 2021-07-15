export interface BasicCustomer {
    id: number
}
export interface CustomerDetails extends BasicCustomer {
    name: string;
    email?: string;
    password?: string;
}