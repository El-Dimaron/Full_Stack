import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findUserByEmail, findUser } from "../services/userService.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);

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

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUser(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
