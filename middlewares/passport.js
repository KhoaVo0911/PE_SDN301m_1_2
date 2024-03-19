import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import Member from "../models/memberModel.js";

export default function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      (username, password, done) => {
        // Match user
        Member.findOne({ username: username })
          .then(user => {
            if (!user) {
              return done(null, false, { message: "This username is not registered" });
            }
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password is incorrect" });
              }
            });
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.serializeUser(function(user, done) {
    process.nextTick(function() {
      done(null, user.id);
    });
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Member.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  
}
