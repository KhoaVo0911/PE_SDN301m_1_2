import Member from "../models/memberModel.js";
import bcrypt from "bcrypt";
import passport from "passport";

class MemberController {
  index(req, res) {
    res.render("register");
  }

  async regist(req, res, next) {
    const { username, password } = req.body;
    let errors = [];
    if (!username || !password) {
      errors.push({ msg: "Please enter all fields" });
    }
    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }
    if (errors.length > 0) {
      res.render("register", {
        errors,
        username,
        password,
      });
    } else {
      try {
        let user = await Member.findOne({ username: username });
        if (user) {
          errors.push({ msg: "Username already exists" });
          res.render("register", {
            errors,
            username,
            password,
          });
        } else {
          const newMember = new Member({
            username,
            password,
          });
          // Hash password
          const hash = await bcrypt.hash(newMember.password, 10);
          newMember.password = hash;
          await newMember.save();
          res.redirect("/users/login");
        }
      } catch (error) {
        next(error);
      }
    }
  }

  login(req, res) {
    res.render("login");
  }

  signin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/users/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true,
    })(req, res, next);
  }

  signout(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success_msg", "You are logged out");
      res.redirect("/users/login");
    });
  }

  dashboard(req, res) {
    res.render("dashboard");
  }
}

export default new MemberController();
