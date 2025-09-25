import { User, UserRole, Society, ActivationToken } from './types';
import { mockDataStore, mockPasswords } from '@/contexts/AuthContext';

// Society application interface
export interface SocietyApplication {
  id: string;
  societyName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  establishedYear: string;
  repFirstName: string;
  repLastName: string;
  repPosition: string;
  repEmail: string;
  repPhone: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  interestRate: string;
  loanTermMonths: string;
  minimumMembershipMonths: string;
  membershipFee: string;
  logo?: File | null;
  registrationCertificate?: File | null;
  bankStatement?: File | null;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  appliedDate: Date;
  reviewedDate?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}

// Member invitation interface
export interface MemberInvitation {
  id: string;
  societyId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  invitedBy: string;
  invitedDate: Date;
  status: 'pending' | 'accepted' | 'expired';
  invitationCode: string;
}

// Email notification interface
export interface EmailNotification {
  id: string;
  to: string;
  subject: string;
  content: string;
  type: 'society_approval' | 'society_rejection' | 'member_invitation' | 'member_approval';
  sentDate: Date;
  status: 'sent' | 'failed';
}

// LocalStorage keys
const STORAGE_KEYS = {
  SOCIETY_APPLICATIONS: 'coopkonnect_society_applications',
  MEMBER_INVITATIONS: 'coopkonnect_member_invitations',
  EMAIL_NOTIFICATIONS: 'coopkonnect_email_notifications',
  ACTIVATION_TOKENS: 'coopkonnect_activation_tokens'
};

// Default template data (only used for initial setup)
const DEFAULT_APPLICATIONS: SocietyApplication[] = [
  {
    id: "app-demo-1",
    societyName: "Lagos Teachers Cooperative Society",
    description: "A cooperative society for educators in Lagos State",
    address: "123 Education Avenue, Lagos",
    phone: "+234-801-234-5678",
    email: "info@lagoseducators.coop",
    website: "https://lagoseducators.coop",
    establishedYear: "2020",
    repFirstName: "Sarah",
    repLastName: "Johnson",
    repPosition: "president",
    repEmail: "sarah@lagoseducators.coop",
    repPhone: "+234-801-111-2222",
    bankName: "first-bank",
    accountNumber: "1234567890",
    accountName: "Lagos Teachers Cooperative Society",
    interestRate: "2.5",
    loanTermMonths: "12",
    minimumMembershipMonths: "6",
    membershipFee: "5000",
    status: "pending",
    appliedDate: new Date("2024-03-01"),
  },
  {
    id: "app-demo-2",
    societyName: "Market Traders Association",
    description: "Cooperative society for market traders and entrepreneurs",
    address: "456 Commerce Street, Lagos",
    phone: "+234-802-345-6789",
    email: "info@markettraders.coop",
    establishedYear: "2019",
    repFirstName: "Emmanuel",
    repLastName: "Okafor",
    repPosition: "secretary",
    repEmail: "emmanuel@markettraders.coop",
    repPhone: "+234-802-222-3333",
    bankName: "access-bank",
    accountNumber: "0987654321",
    accountName: "Market Traders Association",
    interestRate: "3.0",
    loanTermMonths: "10",
    minimumMembershipMonths: "6",
    membershipFee: "3000",
    status: "pending",
    appliedDate: new Date("2024-03-03"),
  }
];

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Utility functions for localStorage with date handling
const saveToStorage = (key: string, data: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const loadFromStorage = (key: string, defaultValue: any = []) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!isBrowser) return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;

    const parsed = JSON.parse(stored);

    // Convert date strings back to Date objects for applications
    if (key === STORAGE_KEYS.SOCIETY_APPLICATIONS) {
      return parsed.map((app: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        ...app,
        appliedDate: new Date(app.appliedDate),
        reviewedDate: app.reviewedDate ? new Date(app.reviewedDate) : undefined
      }));
    }

    // Convert date strings for invitations
    if (key === STORAGE_KEYS.MEMBER_INVITATIONS) {
      return parsed.map((inv: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        ...inv,
        invitedDate: new Date(inv.invitedDate)
      }));
    }

    // Convert date strings for email notifications
    if (key === STORAGE_KEYS.EMAIL_NOTIFICATIONS) {
      return parsed.map((email: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        ...email,
        sentDate: new Date(email.sentDate)
      }));
    }

    // Convert date strings for activation tokens
    if (key === STORAGE_KEYS.ACTIVATION_TOKENS) {
      return parsed.map((token: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        ...token,
        expiresAt: new Date(token.expiresAt),
        createdAt: new Date(token.createdAt),
        usedAt: token.usedAt ? new Date(token.usedAt) : undefined
      }));
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};



// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Initialize data if needed
const ensureDataInitialized = () => {
  if (!isBrowser) return;

  const existing = localStorage.getItem(STORAGE_KEYS.SOCIETY_APPLICATIONS);
  if (!existing) {
    console.log('🔄 Initializing default society applications data');
    saveToStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, DEFAULT_APPLICATIONS);
    saveToStorage(STORAGE_KEYS.MEMBER_INVITATIONS, []);
    saveToStorage(STORAGE_KEYS.EMAIL_NOTIFICATIONS, []);
    saveToStorage(STORAGE_KEYS.ACTIVATION_TOKENS, []);
  }
};

// Society Application Functions
export const submitSocietyApplication = (application: Omit<SocietyApplication, 'id' | 'status' | 'appliedDate'>) => {
  ensureDataInitialized();

  const newApplication: SocietyApplication = {
    ...application,
    id: generateId(),
    status: 'pending',
    appliedDate: new Date()
  };

  // Load current applications, add new one, and save
  const currentApplications = loadFromStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, DEFAULT_APPLICATIONS);
  currentApplications.push(newApplication);
  saveToStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, currentApplications);

  console.log('✅ Society application submitted and saved:', newApplication.societyName);
  console.log('📊 Total applications now:', currentApplications.length);

  // Send notification to admin
  sendEmail({
    to: 'admin@coopkonnect.com',
    subject: 'New Society Application Submitted',
    content: `A new society application has been submitted by ${application.societyName}. Please review in the admin dashboard.`,
    type: 'society_approval'
  });

  return newApplication;
};

export const getSocietyApplications = () => {
  ensureDataInitialized();
  const applications = loadFromStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, DEFAULT_APPLICATIONS);
  console.log('📋 Loading society applications:', applications.length);
  return applications;
};

export const getSocietyApplicationById = (id: string) => {
  const applications = loadFromStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, []);
  return applications.find((app: SocietyApplication) => app.id === id);
};

// Activation Token Functions
export const createActivationToken = (applicationId: string, email: string, firstName: string, lastName: string, phone: string, role: UserRole, societyId: string): ActivationToken => {
  ensureDataInitialized();

  const token: ActivationToken = {
    id: generateId(),
    applicationId,
    email,
    firstName,
    lastName,
    phone,
    role,
    societyId,
    token: generateId() + generateId(), // Generate a longer token
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours from now
    isUsed: false,
    createdAt: new Date()
  };

  const tokens = loadFromStorage(STORAGE_KEYS.ACTIVATION_TOKENS, []);
  tokens.push(token);
  saveToStorage(STORAGE_KEYS.ACTIVATION_TOKENS, tokens);

  return token;
};

export const getActivationToken = (token: string): ActivationToken | null => {
  ensureDataInitialized();
  const tokens = loadFromStorage(STORAGE_KEYS.ACTIVATION_TOKENS, []);
  return tokens.find((t: ActivationToken) => t.token === token) || null;
};

export const activateAccount = (token: string, username: string, password: string): User => {
  ensureDataInitialized();

  const tokens = loadFromStorage(STORAGE_KEYS.ACTIVATION_TOKENS, []);
  const activationToken = tokens.find((t: ActivationToken) => t.token === token);

  if (!activationToken) {
    throw new Error('Invalid activation token');
  }

  if (activationToken.isUsed) {
    throw new Error('Activation token has already been used');
  }

  if (new Date() > activationToken.expiresAt) {
    throw new Error('Activation token has expired');
  }

  // Mark token as used
  activationToken.isUsed = true;
  activationToken.usedAt = new Date();
  saveToStorage(STORAGE_KEYS.ACTIVATION_TOKENS, tokens);

  // Create the user account
  const user: User = {
    id: generateId(),
    email: username, // Use the username they chose
    firstName: activationToken.firstName,
    lastName: activationToken.lastName,
    phone: activationToken.phone,
    role: activationToken.role,
    societyId: activationToken.societyId,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  mockDataStore.users.push(user);
  mockPasswords[username] = password;

  console.log('✅ User account created during activation:', {
    email: user.email,
    role: user.role,
    societyId: user.societyId,
    totalUsers: mockDataStore.users.length
  });
  console.log('🔑 Password set for:', username);

  return user;
};

// Society Approval Functions
export const approveSocietyApplication = (applicationId: string, approvedBy: string) => {
  ensureDataInitialized();
  const applications = loadFromStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, DEFAULT_APPLICATIONS);
  const application = applications.find((app: SocietyApplication) => app.id === applicationId);
  if (!application) {
    throw new Error('Application not found');
  }

  // Update application status
  application.status = 'approved';
  application.reviewedDate = new Date();
  application.reviewedBy = approvedBy;

  // Save updated applications
  saveToStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, applications);

  // Create society
  const society: Society = {
    id: generateId(),
    name: application.societyName,
    description: application.description,
    address: application.address,
    phone: application.phone,
    email: application.email,
    bankAccount: {
      bankName: application.bankName,
      accountNumber: application.accountNumber,
      accountName: application.accountName
    },
    isActive: true,
    interestRate: parseFloat(application.interestRate),
    loanTermMonths: parseInt(application.loanTermMonths),
    minimumMembershipMonths: parseInt(application.minimumMembershipMonths),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  mockDataStore.societies.push(society);

  // Determine role from position
  const role = application.repPosition === 'president' ? UserRole.SOCIETY_PRESIDENT :
               application.repPosition === 'secretary' ? UserRole.SOCIETY_SECRETARY :
               application.repPosition === 'treasurer' ? UserRole.SOCIETY_TREASURER :
               UserRole.SOCIETY_PRESIDENT; // default to president

  // Create activation token instead of user account
  const activationToken = createActivationToken(
    applicationId,
    application.repEmail,
    application.repFirstName,
    application.repLastName,
    application.repPhone,
    role,
    society.id
  );

  // Send activation email
  const activationUrl = `${window?.location?.origin || 'https://coopkonnect.com'}/activate-account?token=${activationToken.token}`;

  sendEmail({
    to: application.repEmail,
    subject: 'Society Application Approved - Set Up Your Account',
    content: `Congratulations! Your society "${application.societyName}" has been approved and is now active on Coopkonnect.

To complete your account setup, please click the link below to create your login credentials:

${activationUrl}

This activation link will expire in 72 hours (3 days). If you don't activate your account within this time, please contact our support team.

After setting up your account, you'll be able to access your society dashboard and start managing your cooperative.

Best regards,
Coopkonnect Team`,
    type: 'society_approval'
  });

  return { society, activationToken };
};

export const rejectSocietyApplication = (applicationId: string, rejectedBy: string, reason: string) => {
  ensureDataInitialized();
  const applications = loadFromStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, DEFAULT_APPLICATIONS);
  const application = applications.find((app: SocietyApplication) => app.id === applicationId);
  if (!application) {
    throw new Error('Application not found');
  }

  application.status = 'rejected';
  application.reviewedDate = new Date();
  application.reviewedBy = rejectedBy;
  application.rejectionReason = reason;

  // Save updated applications
  saveToStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, applications);

  // Send rejection email
  sendEmail({
    to: application.repEmail,
    subject: 'Society Application Update',
    content: `Thank you for your interest in Coopkonnect. Unfortunately, your society application for "${application.societyName}" has not been approved at this time.

Reason: ${reason}

You may resubmit your application after addressing the concerns mentioned above.

Best regards,
Coopkonnect Team`,
    type: 'society_rejection'
  });

  return application;
};

export const suspendSociety = (societyId: string, suspendedBy: string, reason: string) => {
  const society = mockDataStore.societies.find(s => s.id === societyId);
  if (!society) {
    throw new Error('Society not found');
  }

  society.isActive = false;

  // Find and suspend all society users
  mockDataStore.users
    .filter(user => user.societyId === societyId)
    .forEach(user => {
      user.isActive = false;
    });

  // Send suspension notification to society admin
  const societyAdmin = mockDataStore.users.find(user =>
    user.societyId === societyId &&
    [UserRole.SOCIETY_PRESIDENT, UserRole.SOCIETY_SECRETARY, UserRole.SOCIETY_TREASURER].includes(user.role)
  );

  if (societyAdmin) {
    sendEmail({
      to: societyAdmin.email,
      subject: 'Society Account Suspended',
      content: `Your society "${society.name}" has been temporarily suspended.

Reason: ${reason}

Please contact support for more information.

Best regards,
Coopkonnect Team`,
      type: 'society_approval'
    });
  }

  return society;
};

// Member Invitation Functions
export const inviteMember = (societyId: string, memberData: { email: string; firstName: string; lastName: string; role: UserRole }, invitedBy: string) => {
  ensureDataInitialized();

  const invitation: MemberInvitation = {
    id: generateId(),
    societyId,
    email: memberData.email,
    firstName: memberData.firstName,
    lastName: memberData.lastName,
    role: memberData.role,
    invitedBy,
    invitedDate: new Date(),
    status: 'pending',
    invitationCode: generateId()
  };

  // Load current invitations, add new one, and save
  const currentInvitations = loadFromStorage(STORAGE_KEYS.MEMBER_INVITATIONS, []);
  currentInvitations.push(invitation);
  saveToStorage(STORAGE_KEYS.MEMBER_INVITATIONS, currentInvitations);

  console.log('✅ Member invitation sent:', `${memberData.firstName} ${memberData.lastName} (${memberData.email})`);

  const society = mockDataStore.societies.find(s => s.id === societyId);
  const inviter = mockDataStore.users.find(u => u.id === invitedBy);

  // Send invitation email
  sendEmail({
    to: memberData.email,
    subject: `Invitation to Join ${society?.name || 'Cooperative Society'}`,
    content: `You have been invited by ${inviter?.firstName} ${inviter?.lastName} to join ${society?.name} on Coopkonnect.

Click the link below to accept your invitation:
${window?.location?.origin || 'https://coopkonnect.com'}/member-invitation?code=${invitation.invitationCode}

This invitation will expire in 7 days.

Best regards,
${society?.name} Team`,
    type: 'member_invitation'
  });

  return invitation;
};

export const getMemberInvitations = (societyId?: string) => {
  ensureDataInitialized();
  const invitations = loadFromStorage(STORAGE_KEYS.MEMBER_INVITATIONS, []);
  console.log('📧 Loading member invitations:', invitations.length, societyId ? `for society ${societyId}` : 'total');
  if (societyId) {
    return invitations.filter((inv: MemberInvitation) => inv.societyId === societyId);
  }
  return invitations;
};

// Email Service
export const sendEmail = (email: Omit<EmailNotification, 'id' | 'sentDate' | 'status'>) => {
  ensureDataInitialized();

  const notification: EmailNotification = {
    ...email,
    id: generateId(),
    sentDate: new Date(),
    status: 'sent' // In real app, this would be based on actual email service response
  };

  // Load current notifications, add new one, and save
  const currentNotifications = loadFromStorage(STORAGE_KEYS.EMAIL_NOTIFICATIONS, []);
  currentNotifications.push(notification);
  saveToStorage(STORAGE_KEYS.EMAIL_NOTIFICATIONS, currentNotifications);

  // In development, log email to console
  console.log('📧 Email sent:', {
    to: email.to,
    subject: email.subject,
    type: email.type,
    content: email.content
  });

  return notification;
};

export const getEmailNotifications = () => {
  return loadFromStorage(STORAGE_KEYS.EMAIL_NOTIFICATIONS, []);
};

// Utility function to clear all data (for testing)
export const clearAllData = () => {
  if (!isBrowser) return;
  localStorage.removeItem(STORAGE_KEYS.SOCIETY_APPLICATIONS);
  localStorage.removeItem(STORAGE_KEYS.MEMBER_INVITATIONS);
  localStorage.removeItem(STORAGE_KEYS.EMAIL_NOTIFICATIONS);
  localStorage.removeItem(STORAGE_KEYS.ACTIVATION_TOKENS);
  console.log('🗑️ All data cleared from localStorage');
};

// Debug function to check stored data
export const debugStoredData = () => {
  if (!isBrowser) return;
  console.log('🔍 DEBUG: Stored Data:');
  console.log('Applications:', localStorage.getItem(STORAGE_KEYS.SOCIETY_APPLICATIONS));
  console.log('Invitations:', localStorage.getItem(STORAGE_KEYS.MEMBER_INVITATIONS));
  console.log('Notifications:', localStorage.getItem(STORAGE_KEYS.EMAIL_NOTIFICATIONS));
  console.log('Activation Tokens:', localStorage.getItem(STORAGE_KEYS.ACTIVATION_TOKENS));
  console.log('Raw applications:', loadFromStorage(STORAGE_KEYS.SOCIETY_APPLICATIONS, []));
};

// Initialize data on module load if in browser
if (isBrowser) {
  ensureDataInitialized();
}
