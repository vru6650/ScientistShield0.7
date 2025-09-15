import { updateUser, getUsers, getUser, deleteUser } from './user.controller.js';
import User from '../models/user.model.js';

// Helper to create a mock request, response and next function
function createMockResponse() {
    return {
        statusCode: null,
        body: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        },
    };
}

describe('updateUser', () => {
    test('admin users can update other user accounts', async () => {
        // Save original method to restore later
        const originalFindById = User.findById;

        // Mock the database call to findById
        User.findById = async () => ({
            username: 'oldname',
            email: 'user@example.com',
            profilePicture: 'pic.png',
            _doc: {
                username: 'oldname',
                email: 'user@example.com',
                profilePicture: 'pic.png',
                password: 'hashed',
            },
            async save() {
                // Simulate mongoose save updating the _doc property
                this._doc = {
                    username: this.username,
                    email: this.email,
                    profilePicture: this.profilePicture,
                    password: 'hashed',
                };
                return this;
            },
        });

        const req = {
            user: { id: 'adminId', isAdmin: true },
            params: { userId: 'targetUser' },
            body: { username: 'newname' },
        };
        const res = createMockResponse();
        let nextErr = null;
        const next = (err) => {
            nextErr = err;
        };

        await updateUser(req, res, next);

        expect(nextErr).toBeNull();
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe('newname');
        expect('password' in res.body).toBe(false);

        // Restore original method
        User.findById = originalFindById;
    });

    test('non-admin users cannot update other user accounts', async () => {
        const req = {
            user: { id: 'user1', isAdmin: false },
            params: { userId: 'otherUser' },
            body: { username: 'newname' },
        };
        const res = createMockResponse();
        let nextErr = null;
        const next = (err) => {
            nextErr = err;
        };

        await updateUser(req, res, next);

        expect(nextErr).toBeTruthy();
        expect(nextErr.statusCode).toBe(403);
        expect(nextErr.message).toBe('You are not allowed to update this user');
    });

    test('returns an error for invalid email format', async () => {
        const originalFindById = User.findById;
        User.findById = async () => ({
            username: 'user',
            email: 'user@example.com',
            async save() {
                return this;
            },
            _doc: { username: 'user', email: 'user@example.com', password: 'hashed' },
        });

        const req = {
            user: { id: 'adminId', isAdmin: true },
            params: { userId: 'targetUser' },
            body: { email: 'invalid-email' },
        };
        const res = createMockResponse();
        let nextErr = null;
        const next = (err) => {
            nextErr = err;
        };

        await updateUser(req, res, next);

        expect(nextErr).toBeTruthy();
        expect(nextErr.statusCode).toBe(400);
        expect(nextErr.message).toBe('Invalid email format');

        User.findById = originalFindById;
    });

    test('duplicate username returns a meaningful error', async () => {
        const originalFindById = User.findById;
        User.findById = async () => ({
            username: 'user',
            email: 'user@example.com',
            async save() {
                const err = new Error('dup');
                err.code = 11000;
                err.keyValue = { username: 'existing' };
                throw err;
            },
            _doc: { username: 'user', email: 'user@example.com', password: 'hashed' },
        });

        const req = {
            user: { id: 'adminId', isAdmin: true },
            params: { userId: 'targetUser' },
            body: { username: 'existing' },
        };
        const res = createMockResponse();
        let nextErr = null;
        const next = (err) => {
            nextErr = err;
        };

        await updateUser(req, res, next);

        expect(nextErr).toBeTruthy();
        expect(nextErr.statusCode).toBe(409);
        expect(nextErr.message).toBe('username already exists');

        User.findById = originalFindById;
    });
});

describe('getUsers', () => {
    test('admin users receive users list and metadata', async () => {
        const originalFind = User.find;
        const originalCount = User.countDocuments;

        const mockUsers = [{ _id: '1', username: 'alice' }, { _id: '2', username: 'bob' }];

        User.find = () => ({
            sort: () => ({
                skip: () => ({
                    limit: () => ({
                        select: () => Promise.resolve(mockUsers),
                    }),
                }),
            }),
        });

        User.countDocuments = jest
            .fn()
            .mockResolvedValueOnce(2) // totalUsers
            .mockResolvedValueOnce(1); // lastMonthUsers

        const req = { user: { isAdmin: true }, query: {} };
        const res = createMockResponse();
        let nextErr = null;
        const next = (err) => {
            nextErr = err;
        };

        await getUsers(req, res, next);

        expect(nextErr).toBeNull();
        expect(res.statusCode).toBe(200);
        expect(res.body.users).toEqual(mockUsers);
        expect(res.body.totalUsers).toBe(2);
        expect(res.body.lastMonthUsers).toBe(1);

        User.find = originalFind;
        User.countDocuments = originalCount;
    });
});

describe('getUser', () => {
    test('returns user data without password', async () => {
        const originalFindById = User.findById;
        User.findById = () => ({
            select: () => Promise.resolve({ _id: '1', username: 'alice' }),
        });

        const req = { params: { userId: '1' } };
        const res = createMockResponse();
        let nextErr = null;
        const next = (err) => {
            nextErr = err;
        };

        await getUser(req, res, next);

        expect(nextErr).toBeNull();
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ _id: '1', username: 'alice' });

        User.findById = originalFindById;
    });

    test('returns 404 when user not found', async () => {
        const originalFindById = User.findById;
        User.findById = () => ({ select: () => Promise.resolve(null) });

        const req = { params: { userId: '1' } };
        const res = createMockResponse();
        let nextErr = null;
        const next = (err) => {
            nextErr = err;
        };

        await getUser(req, res, next);

        expect(nextErr).toBeTruthy();
        expect(nextErr.statusCode).toBe(404);
        expect(nextErr.message).toBe('User not found');

        User.findById = originalFindById;
    });
});

describe('deleteUser', () => {
    test('prevents deletion when not owner or admin', async () => {
        const req = { user: { id: 'user1', isAdmin: false }, params: { userId: 'user2' } };
        const res = createMockResponse();
        let nextErr = null;
        const next = (err) => {
            nextErr = err;
        };

        await deleteUser(req, res, next);

        expect(nextErr).toBeTruthy();
        expect(nextErr.statusCode).toBe(403);
        expect(nextErr.message).toBe('You are not allowed to delete this user');
    });

    test('allows admins to delete users', async () => {
        const originalDelete = User.findByIdAndDelete;
        User.findByIdAndDelete = jest.fn().mockResolvedValue({});

        const req = { user: { id: 'admin', isAdmin: true }, params: { userId: 'user2' } };
        const res = createMockResponse();
        let nextErr = null;
        const next = (err) => {
            nextErr = err;
        };

        await deleteUser(req, res, next);

        expect(nextErr).toBeNull();
        expect(User.findByIdAndDelete).toHaveBeenCalledWith('user2');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe('User has been deleted');

        User.findByIdAndDelete = originalDelete;
    });
});
