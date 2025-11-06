import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface UserRecord {
  id: string;
  userName: string;
  email: string;
  passwordHash: string;
  createdAt: number;
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

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
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
    passwordHash: hashPassword(password),
    createdAt: Date.now(),
  };
  users.push(record);
  writeUsers({ users });
  return record;
}

export function verifyLogin(identifier: string, password: string): UserRecord | null {
  const user = findUser(identifier);
  if (!user) return null;
  const hash = hashPassword(password);
  return user.passwordHash === hash ? user : null;
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