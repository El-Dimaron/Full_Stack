import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findUserByEmail, findUser } from "../services/userService.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    (email, password, done) => {
      try {
        const user = findUserByEmail(email);

        if (!user) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }

        if (user.password !== password) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = findUser(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
