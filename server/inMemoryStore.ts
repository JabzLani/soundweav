// In-memory user storage for local development without database
// WARNING: Data is lost when server restarts!

interface LocalUser {
    id: number;
    openId: string;
    email: string;
    password: string;
    name: string;
    loginMethod: string;
    role: 'user' | 'admin';
    createdAt: Date;
    lastSignedIn: Date;
}

let users: LocalUser[] = [];
let nextId = 1;

export function createInMemoryUser(email: string, password: string, name: string): LocalUser {
    const user: LocalUser = {
        id: nextId++,
        openId: email,
        email,
        password,
        name,
        loginMethod: 'local',
        role: 'user',
        createdAt: new Date(),
        lastSignedIn: new Date(),
    };
    users.push(user);
    return user;
}

export function findInMemoryUserByEmail(email: string): LocalUser | undefined {
    return users.find(u => u.email === email);
}

export function getAllInMemoryUsers(): LocalUser[] {
    return users;
}
