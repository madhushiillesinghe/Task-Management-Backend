import jwt from 'jsonwebtoken';

// Define the type for the id parameter (assuming it's a string or number)
const generateToken = (id: string | number): string => {
  // token must be returned to the client
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export default generateToken;
