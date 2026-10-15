import { http, HttpResponse } from "msw";

export const testUser = {
  id: "123",
  login: "testuser",
  email: "test@example.com",
};

export const handlers = [
  http.post("http://localhost/api/auth/login", () => {
    return HttpResponse.json(testUser);
  }),

  http.post("http://localhost/api/auth/register", () => {
    return HttpResponse.json(testUser, { status: 201 });
  }),

  http.get("http://localhost/api/auth/check-availability", () => {
    return HttpResponse.json({
      loginAvailable: true,
      emailAvailable: true,
    });
  }),

  http.get("http://localhost/api/auth/me", () => {
    return HttpResponse.json(testUser);
  }),

  http.post("http://localhost/api/auth/logout", () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
