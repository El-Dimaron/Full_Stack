import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findUserByEmailOrLogin, findUser } from "../services/userService.js";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: "identifier",
      passwordField: "password",
    },

    async (identifier, password, done) => {
      try {
        const user = await findUserByEmailOrLogin(identifier);

        if (!user) {
          return done(null, false, {
            message: "Invalid login/email or password",
          });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, {
            message: "Invalid login/email or password",
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
