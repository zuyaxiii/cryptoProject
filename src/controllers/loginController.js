import AuthService from '../services/authService.js';

export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const { token, user } = await AuthService.login(Email, Password);

    res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({ error: 'Login failed', message: error.message });
  }
};
