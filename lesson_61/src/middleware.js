export function basicAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Authorization type:", authHeader);
  if (!authHeader) {
    return res.status(401).send("Access denied. No credentials sent.");
  }
  next();
}

export function logRequests(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
}

export function validateUserInput(req, res, next) {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).send("Missing required fields: username and password");
  }
  next();
}
