import passport from "passport";
import User from "../db/models/userSchema";
import jwt from 'jsonwebtoken';


var GoogleStrategy = require('passport-google-oauth20').Strategy;
const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;


passport.use(
  new OAuth2Strategy({
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            
            user = new User({
                googleId: profile.id,
                first_name: profile.name.givenName,
                last_name:profile.name.familyName,
                email: profile.emails[0].value,
            });
            
            await user.save();
            user.isNewUser=true;
        }else{
            user.isNewUser=false
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        
        return done(null, {user,token});

    } catch (error) {
        return done(error, null);
    }
})
);

