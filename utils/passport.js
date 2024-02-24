import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { User } from "../models/user.model.js";

GoogleStrategy.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      let data = profile?.json;
      const user = await User.findOne({ email });
      if (user) {
        return await cb(null, user);
      } else {
        const newUser = await User.create({
          firstName: data.name,
          lastName: data.given_name,
          userImage: data.picture,
          email: data.email,
          role: "user",
        });
        return await cb(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
