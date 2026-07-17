import { deleteUser } from '../../models/forms/registration.js';

export const deleteUserRoute = async (req, res) => {
  const id = req.params.id;
  await deleteUser(id);
  res.status(204).send();
};
