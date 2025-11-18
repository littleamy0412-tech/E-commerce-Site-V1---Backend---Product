import axios from "axios";

async function ownerOrAdmin(req, res, next) {
  const { id: targetUserId } = req.params;
  const currentUser = req.user;

  if (!targetUserId) {
    return res.status(401).json({ message: "No User Id specified." });
  }

  if (!currentUser) {
    return res
      .status(401)
      .json({ message: "Unauthorized! No authenticated User found." });
  }

  if (currentUser.id === targetUserId) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Authorization header is missing or invalid." });
  }

  const token = authHeader.split(" ")[1];

  const response = await axios.get(
    `http://localhost:8001/users/${currentUser.id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const { user } = response.data;
  if (user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Access Denied. Only owner or admin can perform this action.",
  });
}

export default ownerOrAdmin;
