import {
  listUsers,
  changeUserRole,
  banUser,
  listAllRequests,
} from '../services/admin.service.js';

export const listUsersController = async (req, res, next) => {
  try {
    const users = await listUsers();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

export const changeUserRoleController = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await changeUserRole(req.params.id, req.body.role);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
}

export const banUserController = async (req, res, next) => {
  try {
    const { banned } = req.body; // boolean
    const user = await banUser(req.params.id, banned);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const listAllRequestsController = async (req, res, next) => {
  try {
    const requests = await listAllRequests();
    res.json({ requests });
  } catch (err) {
    next(err);
  }
};
