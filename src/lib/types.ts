// Core types for Coopkonnect Platform

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  societyId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  COOPKONNECT_ADMIN = 'coopkonnect_admin',
  SOCIETY_PRESIDENT = 'society_president',
  SOCIETY_SECRETARY = 'society_secretary',
  SOCIETY_TREASURER = 'society_treasurer',
  SOCIETY_MEMBER = 'society_member',
  PENDING_MEMBER = 'pending_member'
}

export interface Society {
  id: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  address: string;
  phone: string;
  email: string;
  bankAccount: BankAccount;
  isActive: boolean;
  interestRate: number; // percentage
  loanTermMonths: number;
  minimumMembershipMonths: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  routingNumber?: string;
}

export interface Member {
  id: string;
  userId: string;
  societyId: string;
  membershipNumber: string;
  joinDate: Date;
  status: MemberStatus;
  shares: number;
  savings: number;
  isActive: boolean;
  bankDetails: BankAccount;
}

export enum MemberStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DENIED = 'denied',
  SUSPENDED = 'suspended',
  DISCONTINUED = 'discontinued'
}

export interface Loan {
  id: string;
  memberId: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  status: LoanStatus;
  appliedDate: Date;
  approvedDate?: Date;
  dueDate?: Date;
  monthlyPayment: number;
  totalInterest: number;
  remainingBalance: number;
  purpose: string;
  documents: string[];
  approvedBy?: string;
}

export enum LoanStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DEFAULTED = 'defaulted'
}

export interface Transaction {
  id: string;
  memberId: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  reference: string;
  status: TransactionStatus;
}

export enum TransactionType {
  SHARE_PURCHASE = 'share_purchase',
  SAVINGS_DEPOSIT = 'savings_deposit',
  LOAN_REPAYMENT = 'loan_repayment',
  INTEREST_PAYMENT = 'interest_payment',
  DIVIDEND_PAYMENT = 'dividend_payment',
  WITHDRAWAL = 'withdrawal',
  CONTINGENT_LEVY = 'contingent_levy'
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface Application {
  id: string;
  societyId: string;
  applicantEmail: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  occupation: string;
  isReapplication: boolean;
  previousApplications: string[];
  documents: string[];
  letterOfIntent: string;
  policyAccepted: boolean;
  status: ApplicationStatus;
  appliedDate: Date;
  reviewedDate?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}

export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DENIED = 'denied'
}

export interface Announcement {
  id: string;
  societyId: string;
  title: string;
  content: string;
  targetAudience: AnnouncementTarget;
  targetMembers?: string[];
  isImportant: boolean;
  publishDate: Date;
  createdBy: string;
}

export enum AnnouncementTarget {
  ALL_MEMBERS = 'all_members',
  SPECIFIC_MEMBERS = 'specific_members',
  PENDING_MEMBERS = 'pending_members'
}

export interface Meeting {
  id: string;
  societyId: string;
  title: string;
  date: Date;
  agenda: string;
  minutes?: string;
  attendees: string[];
  isAGM: boolean;
}

export interface WithdrawalRequest {
  id: string;
  memberId: string;
  type: WithdrawalType;
  amount: number;
  reason: string;
  status: RequestStatus;
  requestDate: Date;
  approvedDate?: Date;
  approvedBy?: string;
}

export enum WithdrawalType {
  SAVINGS = 'savings',
  SHARES = 'shares',
  PARTIAL_SAVINGS = 'partial_savings',
  PARTIAL_SHARES = 'partial_shares'
}

export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface DashboardStats {
  totalMembers: number;
  activeLoans: number;
  totalSavings: number;
  totalShares: number;
  pendingApplications: number;
  defaultedLoans: number;
  monthlyCollection: number;
}

export interface ActivationToken {
  id: string;
  applicationId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  societyId: string;
  token: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
  usedAt?: Date;
}

export interface AccountActivation {
  token: string;
  username: string;
  password: string;
  confirmPassword: string;
}
