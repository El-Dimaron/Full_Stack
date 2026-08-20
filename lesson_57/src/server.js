import http from "http";
import { resolve } from "dns";
import { readFile } from "fs/promises";
import querystring from "node:querystring";

const PORT = 3000;
const MAX_BODY_SIZE = 1 * 1024 * 1024;

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  response.end(JSON.stringify(data));
}

function sanitize(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getRequestBody(request, maxSize = 1 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let body = "";
    let bodySize = 0;
    let tooLarge = false;

    request.on("data", (chunk) => {
      if (tooLarge) return;

      bodySize += chunk.length;

      if (bodySize > maxSize) {
        tooLarge = true;
        reject(new Error("PAYLOAD_TOO_LARGE"));
        return;
      }

      body += chunk;
    });

    request.on("end", () => {
      if (tooLarge) return;

      resolve(body);
    });

    request.on("error", reject);
  });
}

async function sendHtml(response, statusCode = 200, path = "", html = "") {
  if (path) {
    html = await readFile(path, { encoding: "utf-8" });
  }

  response.writeHead(statusCode, {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Length": Buffer.byteLength(html),
    "X-Content-Type-Options": "nosniff",
  });

  return response.end(html);
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url === "/") {
      return sendHtml(response, 200, "./src/pages/home.html");
    }

    if (request.method === "GET" && request.url === "/about") {
      return sendHtml(response, 200, "./src/pages/about.html");
    }

    if (request.method === "GET" && request.url === "/contact") {
      return sendHtml(response, 200, "./src/pages/contacts.html");
    }

    if (request.method === "POST" && request.url === "/submit") {
      try {
        const body = await getRequestBody(request, MAX_BODY_SIZE);

        const data = querystring.parse(body);

        console.log(data);

        if (!data.name || !data.email) {
          return sendHtml(
            response,
            400,
            "",
            `
      <h1>400 Bad Request</h1>
      <p>Invalid form data</p>
    `,
          );
        }

        const safeName = sanitize(data.name);
        const safeEmail = sanitize(data.email);

        return sendHtml(
          response,
          200,
          "",
          `
  <h1>Form Submitted</h1>
  <p>Name: ${safeName}</p>
  <p>Email: ${safeEmail}</p>
`,
        );
      } catch (error) {
        if (error.message === "PAYLOAD_TOO_LARGE") {
          return sendHtml(
            response,
            413,
            "",
            `<h1>413 Payload Too Large</h1>
      <p>Request body should be less than ${MAX_BODY_SIZE}</p>`,
          );
        }
        throw error;
      }
    }

    if (request.method === "POST" && request.url === "/register") {
      const body = await getRequestBody(request, MAX_BODY_SIZE);

      const data = JSON.parse(body);

      if (!data.login || !data.password) {
        return sendJson(response, 400, {
          message: "Login and password are required",
        });
      }

      const user = await registerUser(data.login, data.password);

      return sendJson(response, 201, {
        message: "User has been successfully registered",
      });
    }

    return sendHtml(response, 404, "./src/pages/notFound.html");

    return;
  } catch (error) {
    console.error(error);

    return sendHtml(
      response,
      500,
      "",
      `
      <h1>500 Internal Server Error</h1>
      <p>Server Error</p>
    `,
    );
  }
});

server.listen(PORT, () => console.log("Server is running on http://localhost:" + PORT));
