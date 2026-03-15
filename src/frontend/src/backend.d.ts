import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LoanApplication {
    id: bigint;
    status: LoanStatus;
    term: bigint;
    whatsApp: string;
    fullName: string;
    submittedAt: Time;
    email: string;
    interestRate: bigint;
    amount: bigint;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export enum LoanStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllApplications(): Promise<Array<LoanApplication>>;
    getApplicationCount(): Promise<bigint>;
    getApplicationStatus(id: bigint): Promise<LoanStatus>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitApplication(fullName: string, email: string, whatsApp: string, amount: bigint, term: bigint): Promise<bigint>;
    updateApplicationStatus(id: bigint, status: LoanStatus): Promise<void>;
}
