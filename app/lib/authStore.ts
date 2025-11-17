import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface UserRecord {
  id: string;
  userName: string;
  email: string;
  passwordHash?: string;
  passwordSalt?: string;
  firstName?: string;
  lastName?: string;
  role?: 'super_admin' | 'manager' | 'member';
  status?: 'active' | 'inactive';
  inviteToken?: string | null;
  inviteTokenExpires?: number | null;
  resetToken?: string | null;
  resetTokenExpires?: number | null;
  lastLoginAt?: number | null;
  createdAt: number;
  onboarding?: OnboardingData | null;
}

export interface OnboardingData {
  fullLegalName?: string;
  preferredName?: string;
  personalEmail?: string;
  phoneNumber?: string;
  idNumber?: string; // CNIC/Passport number
  idFrontUrl?: string;
  idBackUrl?: string;
  dateOfBirth?: string; // YYYY-MM-DD
  homeAddress?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContactPhone?: string;
  bankName?: string;
  bankAccountTitle?: string;
  bankAccountNumberOrIban?: string;
  bankBranchCode?: string;
  bankCity?: string;
  roleJoining?: string;
  department?: string;
  salaryMonthly?: number;
  workingDays?: string; // e.g., Mon–Fri
  workingHours?: string; // e.g., 09:00–17:00
  workMode?: 'remote' | 'hybrid' | 'office';
  laptopSpecs?: string;
  companyAssetsChecklist?: string;
  socialLinks?: string; // comma-separated
  cvUrl?: string;
  portfolioLink?: string;
  pastExperienceSummary?: string;
  taxStatusOrNTN?: string;
  medicalConditions?: string;
  tshirtSize?: string;
  profilePictureUrl?: string;
  preferredCompanyEmailUsername?: string;
  toolsRequired?: string[]; // Zoho, Slack, GitHub, Figma, Notion
  accessLevel?: 'staff' | 'team_lead' | 'admin';
  heardAboutJob?: string;
  availabilityToStart?: string;
  expectedGrowthPath?: string;
}

export interface SessionRecord {
  id: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

const dataDir = path.join(process.cwd(), "data");
const usersPath = path.join(dataDir, "users.json");
const sessionsPath = path.join(dataDir, "sessions.json");

function ensureFiles() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(usersPath)) fs.writeFileSync(usersPath, JSON.stringify({ users: [] }, null, 2));
  if (!fs.existsSync(sessionsPath)) fs.writeFileSync(sessionsPath, JSON.stringify({ sessions: [] }, null, 2));
}

function readUsers(): { users: UserRecord[] } {
  ensureFiles();
  const raw = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(raw);
}

function writeUsers(data: { users: UserRecord[] }) {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2), "utf-8");
}

function readSessions(): { sessions: SessionRecord[] } {
  ensureFiles();
  const raw = fs.readFileSync(sessionsPath, "utf-8");
  return JSON.parse(raw);
}

function writeSessions(data: { sessions: SessionRecord[] }) {
  fs.writeFileSync(sessionsPath, JSON.stringify(data, null, 2), "utf-8");
}

export function makeId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function pbkdf2(password: string, salt: string): string {
  const derived = crypto.pbkdf2Sync(password, salt, 120000, 32, 'sha256');
  return derived.toString('hex');
}

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = pbkdf2(password, salt);
  return { hash, salt };
}

function verifyPassword(user: UserRecord, password: string): boolean {
  if (user.passwordSalt) {
    const expected = pbkdf2(password, user.passwordSalt);
    return expected === user.passwordHash;
  }
  const legacy = crypto.createHash("sha256").update(password).digest("hex");
  return legacy === user.passwordHash;
}

export function findUser(identifier: string): UserRecord | null {
  const { users } = readUsers();
  const idLower = identifier.trim().toLowerCase();
  return (
    users.find(u => u.email.toLowerCase() === idLower) ||
    users.find(u => u.userName.toLowerCase() === idLower) ||
    null
  );
}

export function createUser(userName: string, email: string, password: string): UserRecord {
  const { users } = readUsers();
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase() || u.userName.toLowerCase() === userName.toLowerCase());
  if (exists) throw new Error("User already exists");
  const record: UserRecord = {
    id: makeId(),
    userName,
    email,
    ...(() => { const { hash, salt } = hashPassword(password); return { passwordHash: hash, passwordSalt: salt }; })(),
    role: 'member',
    status: 'active',
    inviteToken: null,
    inviteTokenExpires: null,
    resetToken: null,
    resetTokenExpires: null,
    lastLoginAt: null,
    createdAt: Date.now(),
  };
  users.push(record);
  writeUsers({ users });
  return record;
}

export function verifyLogin(identifier: string, password: string): UserRecord | null {
  const user = findUser(identifier);
  if (!user) return null;
  if (user.status && user.status !== 'active') return null;
  return verifyPassword(user, password) ? user : null;
}

export function createSession(userId: string, hours = 10): SessionRecord {
  const { sessions } = readSessions();
  const now = Date.now();
  const rec: SessionRecord = {
    id: makeId(),
    userId,
    createdAt: now,
    expiresAt: now + hours * 60 * 60 * 1000,
  };
  sessions.push(rec);
  writeSessions({ sessions });
  return rec;
}

export function getSession(sessionId: string): SessionRecord | null {
  const { sessions } = readSessions();
  const rec = sessions.find(s => s.id === sessionId) || null;
  if (!rec) return null;
  if (rec.expiresAt < Date.now()) return null;
  return rec;
}

export function getUserById(userId: string): UserRecord | null {
  const { users } = readUsers();
  return users.find(u => u.id === userId) || null;
}

export function deleteSession(sessionId: string): boolean {
  const { sessions } = readSessions();
  const idx = sessions.findIndex(s => s.id === sessionId);
  if (idx === -1) return false;
  sessions.splice(idx, 1);
  writeSessions({ sessions });
  return true;
}

export function listUsers(): UserRecord[] {
  const { users } = readUsers();
  return users;
}

export function setUserRole(userId: string, role: 'super_admin' | 'manager' | 'member'): UserRecord | null {
  const data = readUsers();
  const u = data.users.find(x => x.id === userId);
  if (!u) return null;
  u.role = role;
  writeUsers(data);
  return u;
}

export function setUserStatus(userId: string, status: 'active' | 'inactive'): UserRecord | null {
  const data = readUsers();
  const u = data.users.find(x => x.id === userId);
  if (!u) return null;
  u.status = status;
  writeUsers(data);
  return u;
}

export function updateLastLogin(userId: string) {
  const data = readUsers();
  const u = data.users.find(x => x.id === userId);
  if (!u) return;
  u.lastLoginAt = Date.now();
  writeUsers(data);
}

export function hasSuperAdmin(): boolean {
  const { users } = readUsers();
  return users.some(u => u.role === 'super_admin');
}

export function inviteUser(email: string, firstName: string, lastName: string, role: 'super_admin' | 'manager' | 'member' = 'member'): { user: UserRecord; token: string } {
  const data = readUsers();
  const existing = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  const token = makeId();
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  if (existing) {
    existing.firstName = firstName;
    existing.lastName = lastName;
    existing.role = role;
    existing.status = 'inactive';
    existing.inviteToken = token;
    existing.inviteTokenExpires = expires;
  } else {
    const rec: UserRecord = {
      id: makeId(),
      userName: `${firstName} ${lastName}`.trim() || email,
      email,
      role,
      status: 'inactive',
      inviteToken: token,
      inviteTokenExpires: expires,
      resetToken: null,
      resetTokenExpires: null,
      firstName,
      lastName,
      createdAt: Date.now(),
      passwordHash: undefined,
      passwordSalt: undefined,
      lastLoginAt: null,
      onboarding: null,
    };
    data.users.push(rec);
  }
  writeUsers(data);
  const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase())!;
  return { user, token };
}

export function acceptInvite(token: string, password: string): UserRecord | null {
  const data = readUsers();
  const u = data.users.find(x => x.inviteToken === token && (x.inviteTokenExpires || 0) > Date.now());
  if (!u) return null;
  const hp = hashPassword(password);
  u.passwordHash = hp.hash;
  u.passwordSalt = hp.salt;
  u.status = 'active';
  u.inviteToken = null;
  u.inviteTokenExpires = null;
  writeUsers(data);
  return u;
}

export function completeOnboarding(token: string, password: string, payload: OnboardingData): UserRecord | null {
  const data = readUsers();
  const u = data.users.find(x => x.inviteToken === token && (x.inviteTokenExpires || 0) > Date.now());
  if (!u) return null;
  const hp = hashPassword(password);
  u.passwordHash = hp.hash;
  u.passwordSalt = hp.salt;
  u.status = 'active';
  u.inviteToken = null;
  u.inviteTokenExpires = null;
  u.onboarding = payload || {};
  if (payload?.preferredName) u.userName = payload.preferredName;
  writeUsers(data);
  return u;
}

export function requestPasswordReset(email: string): { user?: UserRecord; token?: string } {
  const data = readUsers();
  const u = data.users.find(x => x.email.toLowerCase() === email.toLowerCase());
  if (!u) return {};
  const token = makeId();
  u.resetToken = token;
  u.resetTokenExpires = Date.now() + 60 * 60 * 1000;
  writeUsers(data);
  return { user: u, token };
}

export function resetPasswordByToken(token: string, newPassword: string): boolean {
  const data = readUsers();
  const u = data.users.find(x => x.resetToken === token && (x.resetTokenExpires || 0) > Date.now());
  if (!u) return false;
  const hp = hashPassword(newPassword);
  u.passwordHash = hp.hash;
  u.passwordSalt = hp.salt;
  u.resetToken = null;
  u.resetTokenExpires = null;
  writeUsers(data);
  return true;
}

function bootstrapRolesIfMissing() {
  const data = readUsers();
  const anyRole = data.users.some(u => u.role);
  if (!anyRole && data.users.length > 0) {
    data.users[0].role = 'super_admin';
    for (let i = 1; i < data.users.length; i++) data.users[i].role = 'member';
    for (const u of data.users) if (!u.status) u.status = 'active';
    writeUsers(data);
  }
}

bootstrapRolesIfMissing();