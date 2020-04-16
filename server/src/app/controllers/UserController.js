import User from '../models/User';

import UserSchema from '../../validations/UserSchema';

class UserController {
  async store(req, res) {
    const schemaIsValid = await UserSchema.createValidation(req.body);

    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schemaIsValid = await UserSchema.updateValidation(req.body);

    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userID);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
