import { db } from "../lib/db";
import { DbAuthHandler } from '@redwoodjs/api';
export const handler = async (event, context) => {
  const forgotPasswordOptions = {
    // handler() is invoked after verifying that a user was found with the given
    // username. This is where you can send the user an email with a link to
    // reset their password. With the default dbAuth routes and field names, the
    // URL to reset the password will be:
    //
    // https://example.com/reset-password?resetToken=${user.resetToken}
    //
    // Whatever is returned from this function will be returned from
    // the `forgotPassword()` function that is destructured from `useAuth()`
    // You could use this return value to, for example, show the email
    // address in a toast message so the user will know it worked and where
    // to look for the email.
    handler: user => {
      return user;
    },
    // How long the resetToken is valid for, in seconds (default is 24 hours)
    expires: 60 * 60 * 24,
    errors: {
      // for security reasons you may want to be vague here rather than expose
      // the fact that the email address wasn't found (prevents fishing for
      // valid email addresses)
      usernameNotFound: 'Username not found',
      // if the user somehow gets around client validation
      usernameRequired: 'Username is required'
    }
  };
  const loginOptions = {
    // handler() is called after finding the user that matches the
    // username/password provided at login, but before actually considering them
    // logged in. The `user` argument will be the user in the database that
    // matched the username/password.
    //
    // If you want to allow this user to log in simply return the user.
    //
    // If you want to prevent someone logging in for another reason (maybe they
    // didn't validate their email yet), throw an error and it will be returned
    // by the `logIn()` function from `useAuth()` in the form of:
    // `{ message: 'Error message' }`
    handler: user => {
      return user;
    },
    errors: {
      usernameOrPasswordMissing: 'Both username and password are required',
      usernameNotFound: 'Username ${username} not found',
      // For security reasons you may want to make this the same as the
      // usernameNotFound error so that a malicious user can't use the error
      // to narrow down if it's the username or password that's incorrect
      incorrectPassword: 'Incorrect password for ${username}'
    },
    // How long a user will remain logged in, in seconds
    expires: 60 * 60 * 24 * 365 * 10
  };
  const resetPasswordOptions = {
    // handler() is invoked after the password has been successfully updated in
    // the database. Returning anything truthy will automatically logs the user
    // in. Return `false` otherwise, and in the Reset Password page redirect the
    // user to the login page.
    handler: user => {
      return user;
    },
    // If `false` then the new password MUST be different than the current one
    allowReusedPassword: true,
    errors: {
      // the resetToken is valid, but expired
      resetTokenExpired: 'resetToken is expired',
      // no user was found with the given resetToken
      resetTokenInvalid: 'resetToken is invalid',
      // the resetToken was not present in the URL
      resetTokenRequired: 'resetToken is required',
      // new password is the same as the old password (apparently they did not forget it)
      reusedPassword: 'Must choose a new password'
    }
  };
  const signupOptions = {
    // Whatever you want to happen to your data on new user signup. Redwood will
    // check for duplicate usernames before calling this handler. At a minimum
    // you need to save the `username`, `hashedPassword` and `salt` to your
    // user table. `userAttributes` contains any additional object members that
    // were included in the object given to the `signUp()` function you got
    // from `useAuth()`.
    //
    // If you want the user to be immediately logged in, return the user that
    // was created.
    //
    // If this handler throws an error, it will be returned by the `signUp()`
    // function in the form of: `{ error: 'Error message' }`.
    //
    // If this returns anything else, it will be returned by the
    // `signUp()` function in the form of: `{ message: 'String here' }`.
    handler: ({
      username,
      hashedPassword,
      salt,
      userAttributes
    }) => {
      return db.user.create({
        data: {
          email: username,
          hashedPassword: hashedPassword,
          salt: salt // name: userAttributes.name

        }
      });
    },
    errors: {
      // `field` will be either "username" or "password"
      fieldMissing: '${field} is required',
      usernameTaken: 'Username `${username}` already in use'
    }
  };
  const authHandler = new DbAuthHandler(event, context, {
    // Provide prisma db client
    db: db,
    // The name of the property you'd call on `db` to access your user table.
    // ie. if your Prisma model is named `User` this value would be `user`, as in `db.user`
    authModelAccessor: 'user',
    // A map of what dbAuth calls a field to what your database calls it.
    // `id` is whatever column you use to uniquely identify a user (probably
    // something like `id` or `userId` or even `email`)
    authFields: {
      id: 'id',
      username: 'email',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
      resetToken: 'resetToken',
      resetTokenExpiresAt: 'resetTokenExpiresAt'
    },
    // Specifies attributes on the cookie that dbAuth sets in order to remember
    // who is logged in. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
    cookie: {
      HttpOnly: true,
      Path: '/',
      SameSite: 'Strict',
      Secure: process.env.NODE_ENV !== 'development' ? true : false // If you need to allow other domains (besides the api side) access to
      // the dbAuth session cookie:
      // Domain: 'example.com',

    },
    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    resetPassword: resetPasswordOptions,
    signup: signupOptions
  });
  return await authHandler.invoke();
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYiIsIkRiQXV0aEhhbmRsZXIiLCJoYW5kbGVyIiwiZXZlbnQiLCJjb250ZXh0IiwiZm9yZ290UGFzc3dvcmRPcHRpb25zIiwidXNlciIsImV4cGlyZXMiLCJlcnJvcnMiLCJ1c2VybmFtZU5vdEZvdW5kIiwidXNlcm5hbWVSZXF1aXJlZCIsImxvZ2luT3B0aW9ucyIsInVzZXJuYW1lT3JQYXNzd29yZE1pc3NpbmciLCJpbmNvcnJlY3RQYXNzd29yZCIsInJlc2V0UGFzc3dvcmRPcHRpb25zIiwiYWxsb3dSZXVzZWRQYXNzd29yZCIsInJlc2V0VG9rZW5FeHBpcmVkIiwicmVzZXRUb2tlbkludmFsaWQiLCJyZXNldFRva2VuUmVxdWlyZWQiLCJyZXVzZWRQYXNzd29yZCIsInNpZ251cE9wdGlvbnMiLCJ1c2VybmFtZSIsImhhc2hlZFBhc3N3b3JkIiwic2FsdCIsInVzZXJBdHRyaWJ1dGVzIiwiY3JlYXRlIiwiZGF0YSIsImVtYWlsIiwiZmllbGRNaXNzaW5nIiwidXNlcm5hbWVUYWtlbiIsImF1dGhIYW5kbGVyIiwiYXV0aE1vZGVsQWNjZXNzb3IiLCJhdXRoRmllbGRzIiwiaWQiLCJyZXNldFRva2VuIiwicmVzZXRUb2tlbkV4cGlyZXNBdCIsImNvb2tpZSIsIkh0dHBPbmx5IiwiUGF0aCIsIlNhbWVTaXRlIiwiU2VjdXJlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiZm9yZ290UGFzc3dvcmQiLCJsb2dpbiIsInJlc2V0UGFzc3dvcmQiLCJzaWdudXAiLCJpbnZva2UiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcGkvc3JjL2Z1bmN0aW9ucy9hdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnc3JjL2xpYi9kYidcbmltcG9ydCB7IERiQXV0aEhhbmRsZXIgfSBmcm9tICdAcmVkd29vZGpzL2FwaSdcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQsIGNvbnRleHQpID0+IHtcblxuICBjb25zdCBmb3Jnb3RQYXNzd29yZE9wdGlvbnMgPSB7XG4gICAgLy8gaGFuZGxlcigpIGlzIGludm9rZWQgYWZ0ZXIgdmVyaWZ5aW5nIHRoYXQgYSB1c2VyIHdhcyBmb3VuZCB3aXRoIHRoZSBnaXZlblxuICAgIC8vIHVzZXJuYW1lLiBUaGlzIGlzIHdoZXJlIHlvdSBjYW4gc2VuZCB0aGUgdXNlciBhbiBlbWFpbCB3aXRoIGEgbGluayB0b1xuICAgIC8vIHJlc2V0IHRoZWlyIHBhc3N3b3JkLiBXaXRoIHRoZSBkZWZhdWx0IGRiQXV0aCByb3V0ZXMgYW5kIGZpZWxkIG5hbWVzLCB0aGVcbiAgICAvLyBVUkwgdG8gcmVzZXQgdGhlIHBhc3N3b3JkIHdpbGwgYmU6XG4gICAgLy9cbiAgICAvLyBodHRwczovL2V4YW1wbGUuY29tL3Jlc2V0LXBhc3N3b3JkP3Jlc2V0VG9rZW49JHt1c2VyLnJlc2V0VG9rZW59XG4gICAgLy9cbiAgICAvLyBXaGF0ZXZlciBpcyByZXR1cm5lZCBmcm9tIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSByZXR1cm5lZCBmcm9tXG4gICAgLy8gdGhlIGBmb3Jnb3RQYXNzd29yZCgpYCBmdW5jdGlvbiB0aGF0IGlzIGRlc3RydWN0dXJlZCBmcm9tIGB1c2VBdXRoKClgXG4gICAgLy8gWW91IGNvdWxkIHVzZSB0aGlzIHJldHVybiB2YWx1ZSB0bywgZm9yIGV4YW1wbGUsIHNob3cgdGhlIGVtYWlsXG4gICAgLy8gYWRkcmVzcyBpbiBhIHRvYXN0IG1lc3NhZ2Ugc28gdGhlIHVzZXIgd2lsbCBrbm93IGl0IHdvcmtlZCBhbmQgd2hlcmVcbiAgICAvLyB0byBsb29rIGZvciB0aGUgZW1haWwuXG4gICAgaGFuZGxlcjogKHVzZXIpID0+IHtcbiAgICAgIHJldHVybiB1c2VyXG4gICAgfSxcblxuICAgIC8vIEhvdyBsb25nIHRoZSByZXNldFRva2VuIGlzIHZhbGlkIGZvciwgaW4gc2Vjb25kcyAoZGVmYXVsdCBpcyAyNCBob3VycylcbiAgICBleHBpcmVzOiA2MCAqIDYwICogMjQsXG5cbiAgICBlcnJvcnM6IHtcbiAgICAgIC8vIGZvciBzZWN1cml0eSByZWFzb25zIHlvdSBtYXkgd2FudCB0byBiZSB2YWd1ZSBoZXJlIHJhdGhlciB0aGFuIGV4cG9zZVxuICAgICAgLy8gdGhlIGZhY3QgdGhhdCB0aGUgZW1haWwgYWRkcmVzcyB3YXNuJ3QgZm91bmQgKHByZXZlbnRzIGZpc2hpbmcgZm9yXG4gICAgICAvLyB2YWxpZCBlbWFpbCBhZGRyZXNzZXMpXG4gICAgICB1c2VybmFtZU5vdEZvdW5kOiAnVXNlcm5hbWUgbm90IGZvdW5kJyxcbiAgICAgIC8vIGlmIHRoZSB1c2VyIHNvbWVob3cgZ2V0cyBhcm91bmQgY2xpZW50IHZhbGlkYXRpb25cbiAgICAgIHVzZXJuYW1lUmVxdWlyZWQ6ICdVc2VybmFtZSBpcyByZXF1aXJlZCcsXG4gICAgfSxcbiAgfVxuXG4gIGNvbnN0IGxvZ2luT3B0aW9ucyA9IHtcbiAgICAvLyBoYW5kbGVyKCkgaXMgY2FsbGVkIGFmdGVyIGZpbmRpbmcgdGhlIHVzZXIgdGhhdCBtYXRjaGVzIHRoZVxuICAgIC8vIHVzZXJuYW1lL3Bhc3N3b3JkIHByb3ZpZGVkIGF0IGxvZ2luLCBidXQgYmVmb3JlIGFjdHVhbGx5IGNvbnNpZGVyaW5nIHRoZW1cbiAgICAvLyBsb2dnZWQgaW4uIFRoZSBgdXNlcmAgYXJndW1lbnQgd2lsbCBiZSB0aGUgdXNlciBpbiB0aGUgZGF0YWJhc2UgdGhhdFxuICAgIC8vIG1hdGNoZWQgdGhlIHVzZXJuYW1lL3Bhc3N3b3JkLlxuICAgIC8vXG4gICAgLy8gSWYgeW91IHdhbnQgdG8gYWxsb3cgdGhpcyB1c2VyIHRvIGxvZyBpbiBzaW1wbHkgcmV0dXJuIHRoZSB1c2VyLlxuICAgIC8vXG4gICAgLy8gSWYgeW91IHdhbnQgdG8gcHJldmVudCBzb21lb25lIGxvZ2dpbmcgaW4gZm9yIGFub3RoZXIgcmVhc29uIChtYXliZSB0aGV5XG4gICAgLy8gZGlkbid0IHZhbGlkYXRlIHRoZWlyIGVtYWlsIHlldCksIHRocm93IGFuIGVycm9yIGFuZCBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgLy8gYnkgdGhlIGBsb2dJbigpYCBmdW5jdGlvbiBmcm9tIGB1c2VBdXRoKClgIGluIHRoZSBmb3JtIG9mOlxuICAgIC8vIGB7IG1lc3NhZ2U6ICdFcnJvciBtZXNzYWdlJyB9YFxuICAgIGhhbmRsZXI6ICh1c2VyKSA9PiB7XG4gICAgICByZXR1cm4gdXNlclxuICAgIH0sXG5cbiAgICBlcnJvcnM6IHtcbiAgICAgIHVzZXJuYW1lT3JQYXNzd29yZE1pc3Npbmc6ICdCb3RoIHVzZXJuYW1lIGFuZCBwYXNzd29yZCBhcmUgcmVxdWlyZWQnLFxuICAgICAgdXNlcm5hbWVOb3RGb3VuZDogJ1VzZXJuYW1lICR7dXNlcm5hbWV9IG5vdCBmb3VuZCcsXG4gICAgICAvLyBGb3Igc2VjdXJpdHkgcmVhc29ucyB5b3UgbWF5IHdhbnQgdG8gbWFrZSB0aGlzIHRoZSBzYW1lIGFzIHRoZVxuICAgICAgLy8gdXNlcm5hbWVOb3RGb3VuZCBlcnJvciBzbyB0aGF0IGEgbWFsaWNpb3VzIHVzZXIgY2FuJ3QgdXNlIHRoZSBlcnJvclxuICAgICAgLy8gdG8gbmFycm93IGRvd24gaWYgaXQncyB0aGUgdXNlcm5hbWUgb3IgcGFzc3dvcmQgdGhhdCdzIGluY29ycmVjdFxuICAgICAgaW5jb3JyZWN0UGFzc3dvcmQ6ICdJbmNvcnJlY3QgcGFzc3dvcmQgZm9yICR7dXNlcm5hbWV9JyxcbiAgICB9LFxuXG4gICAgLy8gSG93IGxvbmcgYSB1c2VyIHdpbGwgcmVtYWluIGxvZ2dlZCBpbiwgaW4gc2Vjb25kc1xuICAgIGV4cGlyZXM6IDYwICogNjAgKiAyNCAqIDM2NSAqIDEwLFxuICB9XG5cbiAgY29uc3QgcmVzZXRQYXNzd29yZE9wdGlvbnMgPSB7XG4gICAgLy8gaGFuZGxlcigpIGlzIGludm9rZWQgYWZ0ZXIgdGhlIHBhc3N3b3JkIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSB1cGRhdGVkIGluXG4gICAgLy8gdGhlIGRhdGFiYXNlLiBSZXR1cm5pbmcgYW55dGhpbmcgdHJ1dGh5IHdpbGwgYXV0b21hdGljYWxseSBsb2dzIHRoZSB1c2VyXG4gICAgLy8gaW4uIFJldHVybiBgZmFsc2VgIG90aGVyd2lzZSwgYW5kIGluIHRoZSBSZXNldCBQYXNzd29yZCBwYWdlIHJlZGlyZWN0IHRoZVxuICAgIC8vIHVzZXIgdG8gdGhlIGxvZ2luIHBhZ2UuXG4gICAgaGFuZGxlcjogKHVzZXIpID0+IHtcbiAgICAgIHJldHVybiB1c2VyXG4gICAgfSxcblxuICAgIC8vIElmIGBmYWxzZWAgdGhlbiB0aGUgbmV3IHBhc3N3b3JkIE1VU1QgYmUgZGlmZmVyZW50IHRoYW4gdGhlIGN1cnJlbnQgb25lXG4gICAgYWxsb3dSZXVzZWRQYXNzd29yZDogdHJ1ZSxcblxuICAgIGVycm9yczoge1xuICAgICAgLy8gdGhlIHJlc2V0VG9rZW4gaXMgdmFsaWQsIGJ1dCBleHBpcmVkXG4gICAgICByZXNldFRva2VuRXhwaXJlZDogJ3Jlc2V0VG9rZW4gaXMgZXhwaXJlZCcsXG4gICAgICAvLyBubyB1c2VyIHdhcyBmb3VuZCB3aXRoIHRoZSBnaXZlbiByZXNldFRva2VuXG4gICAgICByZXNldFRva2VuSW52YWxpZDogJ3Jlc2V0VG9rZW4gaXMgaW52YWxpZCcsXG4gICAgICAvLyB0aGUgcmVzZXRUb2tlbiB3YXMgbm90IHByZXNlbnQgaW4gdGhlIFVSTFxuICAgICAgcmVzZXRUb2tlblJlcXVpcmVkOiAncmVzZXRUb2tlbiBpcyByZXF1aXJlZCcsXG4gICAgICAvLyBuZXcgcGFzc3dvcmQgaXMgdGhlIHNhbWUgYXMgdGhlIG9sZCBwYXNzd29yZCAoYXBwYXJlbnRseSB0aGV5IGRpZCBub3QgZm9yZ2V0IGl0KVxuICAgICAgcmV1c2VkUGFzc3dvcmQ6ICdNdXN0IGNob29zZSBhIG5ldyBwYXNzd29yZCcsXG4gICAgfSxcbiAgfVxuXG4gIGNvbnN0IHNpZ251cE9wdGlvbnMgPSB7XG4gICAgLy8gV2hhdGV2ZXIgeW91IHdhbnQgdG8gaGFwcGVuIHRvIHlvdXIgZGF0YSBvbiBuZXcgdXNlciBzaWdudXAuIFJlZHdvb2Qgd2lsbFxuICAgIC8vIGNoZWNrIGZvciBkdXBsaWNhdGUgdXNlcm5hbWVzIGJlZm9yZSBjYWxsaW5nIHRoaXMgaGFuZGxlci4gQXQgYSBtaW5pbXVtXG4gICAgLy8geW91IG5lZWQgdG8gc2F2ZSB0aGUgYHVzZXJuYW1lYCwgYGhhc2hlZFBhc3N3b3JkYCBhbmQgYHNhbHRgIHRvIHlvdXJcbiAgICAvLyB1c2VyIHRhYmxlLiBgdXNlckF0dHJpYnV0ZXNgIGNvbnRhaW5zIGFueSBhZGRpdGlvbmFsIG9iamVjdCBtZW1iZXJzIHRoYXRcbiAgICAvLyB3ZXJlIGluY2x1ZGVkIGluIHRoZSBvYmplY3QgZ2l2ZW4gdG8gdGhlIGBzaWduVXAoKWAgZnVuY3Rpb24geW91IGdvdFxuICAgIC8vIGZyb20gYHVzZUF1dGgoKWAuXG4gICAgLy9cbiAgICAvLyBJZiB5b3Ugd2FudCB0aGUgdXNlciB0byBiZSBpbW1lZGlhdGVseSBsb2dnZWQgaW4sIHJldHVybiB0aGUgdXNlciB0aGF0XG4gICAgLy8gd2FzIGNyZWF0ZWQuXG4gICAgLy9cbiAgICAvLyBJZiB0aGlzIGhhbmRsZXIgdGhyb3dzIGFuIGVycm9yLCBpdCB3aWxsIGJlIHJldHVybmVkIGJ5IHRoZSBgc2lnblVwKClgXG4gICAgLy8gZnVuY3Rpb24gaW4gdGhlIGZvcm0gb2Y6IGB7IGVycm9yOiAnRXJyb3IgbWVzc2FnZScgfWAuXG4gICAgLy9cbiAgICAvLyBJZiB0aGlzIHJldHVybnMgYW55dGhpbmcgZWxzZSwgaXQgd2lsbCBiZSByZXR1cm5lZCBieSB0aGVcbiAgICAvLyBgc2lnblVwKClgIGZ1bmN0aW9uIGluIHRoZSBmb3JtIG9mOiBgeyBtZXNzYWdlOiAnU3RyaW5nIGhlcmUnIH1gLlxuICAgIGhhbmRsZXI6ICh7IHVzZXJuYW1lLCBoYXNoZWRQYXNzd29yZCwgc2FsdCwgdXNlckF0dHJpYnV0ZXMgfSkgPT4ge1xuICAgICAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGVtYWlsOiB1c2VybmFtZSxcbiAgICAgICAgICBoYXNoZWRQYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXG4gICAgICAgICAgc2FsdDogc2FsdCxcbiAgICAgICAgICAvLyBuYW1lOiB1c2VyQXR0cmlidXRlcy5uYW1lXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICBlcnJvcnM6IHtcbiAgICAgIC8vIGBmaWVsZGAgd2lsbCBiZSBlaXRoZXIgXCJ1c2VybmFtZVwiIG9yIFwicGFzc3dvcmRcIlxuICAgICAgZmllbGRNaXNzaW5nOiAnJHtmaWVsZH0gaXMgcmVxdWlyZWQnLFxuICAgICAgdXNlcm5hbWVUYWtlbjogJ1VzZXJuYW1lIGAke3VzZXJuYW1lfWAgYWxyZWFkeSBpbiB1c2UnLFxuICAgIH0sXG4gIH1cblxuICBjb25zdCBhdXRoSGFuZGxlciA9IG5ldyBEYkF1dGhIYW5kbGVyKGV2ZW50LCBjb250ZXh0LCB7XG4gICAgLy8gUHJvdmlkZSBwcmlzbWEgZGIgY2xpZW50XG4gICAgZGI6IGRiLFxuXG4gICAgLy8gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHlvdSdkIGNhbGwgb24gYGRiYCB0byBhY2Nlc3MgeW91ciB1c2VyIHRhYmxlLlxuICAgIC8vIGllLiBpZiB5b3VyIFByaXNtYSBtb2RlbCBpcyBuYW1lZCBgVXNlcmAgdGhpcyB2YWx1ZSB3b3VsZCBiZSBgdXNlcmAsIGFzIGluIGBkYi51c2VyYFxuICAgIGF1dGhNb2RlbEFjY2Vzc29yOiAndXNlcicsXG5cbiAgICAvLyBBIG1hcCBvZiB3aGF0IGRiQXV0aCBjYWxscyBhIGZpZWxkIHRvIHdoYXQgeW91ciBkYXRhYmFzZSBjYWxscyBpdC5cbiAgICAvLyBgaWRgIGlzIHdoYXRldmVyIGNvbHVtbiB5b3UgdXNlIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IGEgdXNlciAocHJvYmFibHlcbiAgICAvLyBzb21ldGhpbmcgbGlrZSBgaWRgIG9yIGB1c2VySWRgIG9yIGV2ZW4gYGVtYWlsYClcbiAgICBhdXRoRmllbGRzOiB7XG4gICAgICBpZDogJ2lkJyxcbiAgICAgIHVzZXJuYW1lOiAnZW1haWwnLFxuICAgICAgaGFzaGVkUGFzc3dvcmQ6ICdoYXNoZWRQYXNzd29yZCcsXG4gICAgICBzYWx0OiAnc2FsdCcsXG4gICAgICByZXNldFRva2VuOiAncmVzZXRUb2tlbicsXG4gICAgICByZXNldFRva2VuRXhwaXJlc0F0OiAncmVzZXRUb2tlbkV4cGlyZXNBdCcsXG4gICAgfSxcblxuICAgIC8vIFNwZWNpZmllcyBhdHRyaWJ1dGVzIG9uIHRoZSBjb29raWUgdGhhdCBkYkF1dGggc2V0cyBpbiBvcmRlciB0byByZW1lbWJlclxuICAgIC8vIHdobyBpcyBsb2dnZWQgaW4uIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Nvb2tpZXMjcmVzdHJpY3RfYWNjZXNzX3RvX2Nvb2tpZXNcbiAgICBjb29raWU6IHtcbiAgICAgIEh0dHBPbmx5OiB0cnVlLFxuICAgICAgUGF0aDogJy8nLFxuICAgICAgU2FtZVNpdGU6ICdTdHJpY3QnLFxuICAgICAgU2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ2RldmVsb3BtZW50JyA/IHRydWUgOiBmYWxzZSxcblxuICAgICAgLy8gSWYgeW91IG5lZWQgdG8gYWxsb3cgb3RoZXIgZG9tYWlucyAoYmVzaWRlcyB0aGUgYXBpIHNpZGUpIGFjY2VzcyB0b1xuICAgICAgLy8gdGhlIGRiQXV0aCBzZXNzaW9uIGNvb2tpZTpcbiAgICAgIC8vIERvbWFpbjogJ2V4YW1wbGUuY29tJyxcbiAgICB9LFxuXG4gICAgZm9yZ290UGFzc3dvcmQ6IGZvcmdvdFBhc3N3b3JkT3B0aW9ucyxcbiAgICBsb2dpbjogbG9naW5PcHRpb25zLFxuICAgIHJlc2V0UGFzc3dvcmQ6IHJlc2V0UGFzc3dvcmRPcHRpb25zLFxuICAgIHNpZ251cDogc2lnbnVwT3B0aW9ucyxcbiAgfSlcblxuICByZXR1cm4gYXdhaXQgYXV0aEhhbmRsZXIuaW52b2tlKClcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUEsU0FB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