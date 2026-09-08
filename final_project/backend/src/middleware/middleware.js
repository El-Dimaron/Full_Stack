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

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.message === "User not found") {
    return res.status(404).send("User not found");
  }

  if (err.message === "Article not found") {
    return res.status(404).send("Article not found");
  }

  if (err.message === "User already exists") {
    return res.status(409).send("User already exists");
  }

  res.status(500).send("Internal server error");
}
