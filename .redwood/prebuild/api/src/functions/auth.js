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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYiIsIkRiQXV0aEhhbmRsZXIiLCJoYW5kbGVyIiwiZXZlbnQiLCJjb250ZXh0IiwiZm9yZ290UGFzc3dvcmRPcHRpb25zIiwidXNlciIsImV4cGlyZXMiLCJlcnJvcnMiLCJ1c2VybmFtZU5vdEZvdW5kIiwidXNlcm5hbWVSZXF1aXJlZCIsImxvZ2luT3B0aW9ucyIsInVzZXJuYW1lT3JQYXNzd29yZE1pc3NpbmciLCJpbmNvcnJlY3RQYXNzd29yZCIsInJlc2V0UGFzc3dvcmRPcHRpb25zIiwiYWxsb3dSZXVzZWRQYXNzd29yZCIsInJlc2V0VG9rZW5FeHBpcmVkIiwicmVzZXRUb2tlbkludmFsaWQiLCJyZXNldFRva2VuUmVxdWlyZWQiLCJyZXVzZWRQYXNzd29yZCIsInNpZ251cE9wdGlvbnMiLCJ1c2VybmFtZSIsImhhc2hlZFBhc3N3b3JkIiwic2FsdCIsInVzZXJBdHRyaWJ1dGVzIiwiY3JlYXRlIiwiZGF0YSIsImVtYWlsIiwiZmllbGRNaXNzaW5nIiwidXNlcm5hbWVUYWtlbiIsImF1dGhIYW5kbGVyIiwiYXV0aE1vZGVsQWNjZXNzb3IiLCJhdXRoRmllbGRzIiwiaWQiLCJyZXNldFRva2VuIiwicmVzZXRUb2tlbkV4cGlyZXNBdCIsImNvb2tpZSIsIkh0dHBPbmx5IiwiUGF0aCIsIlNhbWVTaXRlIiwiU2VjdXJlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiZm9yZ290UGFzc3dvcmQiLCJsb2dpbiIsInJlc2V0UGFzc3dvcmQiLCJzaWdudXAiLCJpbnZva2UiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcGkvc3JjL2Z1bmN0aW9ucy9hdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnc3JjL2xpYi9kYidcbmltcG9ydCB7IERiQXV0aEhhbmRsZXIgfSBmcm9tICdAcmVkd29vZGpzL2FwaSdcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQsIGNvbnRleHQpID0+IHtcbiAgY29uc3QgZm9yZ290UGFzc3dvcmRPcHRpb25zID0ge1xuICAgIC8vIGhhbmRsZXIoKSBpcyBpbnZva2VkIGFmdGVyIHZlcmlmeWluZyB0aGF0IGEgdXNlciB3YXMgZm91bmQgd2l0aCB0aGUgZ2l2ZW5cbiAgICAvLyB1c2VybmFtZS4gVGhpcyBpcyB3aGVyZSB5b3UgY2FuIHNlbmQgdGhlIHVzZXIgYW4gZW1haWwgd2l0aCBhIGxpbmsgdG9cbiAgICAvLyByZXNldCB0aGVpciBwYXNzd29yZC4gV2l0aCB0aGUgZGVmYXVsdCBkYkF1dGggcm91dGVzIGFuZCBmaWVsZCBuYW1lcywgdGhlXG4gICAgLy8gVVJMIHRvIHJlc2V0IHRoZSBwYXNzd29yZCB3aWxsIGJlOlxuICAgIC8vXG4gICAgLy8gaHR0cHM6Ly9leGFtcGxlLmNvbS9yZXNldC1wYXNzd29yZD9yZXNldFRva2VuPSR7dXNlci5yZXNldFRva2VufVxuICAgIC8vXG4gICAgLy8gV2hhdGV2ZXIgaXMgcmV0dXJuZWQgZnJvbSB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgcmV0dXJuZWQgZnJvbVxuICAgIC8vIHRoZSBgZm9yZ290UGFzc3dvcmQoKWAgZnVuY3Rpb24gdGhhdCBpcyBkZXN0cnVjdHVyZWQgZnJvbSBgdXNlQXV0aCgpYFxuICAgIC8vIFlvdSBjb3VsZCB1c2UgdGhpcyByZXR1cm4gdmFsdWUgdG8sIGZvciBleGFtcGxlLCBzaG93IHRoZSBlbWFpbFxuICAgIC8vIGFkZHJlc3MgaW4gYSB0b2FzdCBtZXNzYWdlIHNvIHRoZSB1c2VyIHdpbGwga25vdyBpdCB3b3JrZWQgYW5kIHdoZXJlXG4gICAgLy8gdG8gbG9vayBmb3IgdGhlIGVtYWlsLlxuICAgIGhhbmRsZXI6ICh1c2VyKSA9PiB7XG4gICAgICByZXR1cm4gdXNlclxuICAgIH0sXG5cbiAgICAvLyBIb3cgbG9uZyB0aGUgcmVzZXRUb2tlbiBpcyB2YWxpZCBmb3IsIGluIHNlY29uZHMgKGRlZmF1bHQgaXMgMjQgaG91cnMpXG4gICAgZXhwaXJlczogNjAgKiA2MCAqIDI0LFxuXG4gICAgZXJyb3JzOiB7XG4gICAgICAvLyBmb3Igc2VjdXJpdHkgcmVhc29ucyB5b3UgbWF5IHdhbnQgdG8gYmUgdmFndWUgaGVyZSByYXRoZXIgdGhhbiBleHBvc2VcbiAgICAgIC8vIHRoZSBmYWN0IHRoYXQgdGhlIGVtYWlsIGFkZHJlc3Mgd2Fzbid0IGZvdW5kIChwcmV2ZW50cyBmaXNoaW5nIGZvclxuICAgICAgLy8gdmFsaWQgZW1haWwgYWRkcmVzc2VzKVxuICAgICAgdXNlcm5hbWVOb3RGb3VuZDogJ1VzZXJuYW1lIG5vdCBmb3VuZCcsXG4gICAgICAvLyBpZiB0aGUgdXNlciBzb21laG93IGdldHMgYXJvdW5kIGNsaWVudCB2YWxpZGF0aW9uXG4gICAgICB1c2VybmFtZVJlcXVpcmVkOiAnVXNlcm5hbWUgaXMgcmVxdWlyZWQnLFxuICAgIH0sXG4gIH1cblxuICBjb25zdCBsb2dpbk9wdGlvbnMgPSB7XG4gICAgLy8gaGFuZGxlcigpIGlzIGNhbGxlZCBhZnRlciBmaW5kaW5nIHRoZSB1c2VyIHRoYXQgbWF0Y2hlcyB0aGVcbiAgICAvLyB1c2VybmFtZS9wYXNzd29yZCBwcm92aWRlZCBhdCBsb2dpbiwgYnV0IGJlZm9yZSBhY3R1YWxseSBjb25zaWRlcmluZyB0aGVtXG4gICAgLy8gbG9nZ2VkIGluLiBUaGUgYHVzZXJgIGFyZ3VtZW50IHdpbGwgYmUgdGhlIHVzZXIgaW4gdGhlIGRhdGFiYXNlIHRoYXRcbiAgICAvLyBtYXRjaGVkIHRoZSB1c2VybmFtZS9wYXNzd29yZC5cbiAgICAvL1xuICAgIC8vIElmIHlvdSB3YW50IHRvIGFsbG93IHRoaXMgdXNlciB0byBsb2cgaW4gc2ltcGx5IHJldHVybiB0aGUgdXNlci5cbiAgICAvL1xuICAgIC8vIElmIHlvdSB3YW50IHRvIHByZXZlbnQgc29tZW9uZSBsb2dnaW5nIGluIGZvciBhbm90aGVyIHJlYXNvbiAobWF5YmUgdGhleVxuICAgIC8vIGRpZG4ndCB2YWxpZGF0ZSB0aGVpciBlbWFpbCB5ZXQpLCB0aHJvdyBhbiBlcnJvciBhbmQgaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgIC8vIGJ5IHRoZSBgbG9nSW4oKWAgZnVuY3Rpb24gZnJvbSBgdXNlQXV0aCgpYCBpbiB0aGUgZm9ybSBvZjpcbiAgICAvLyBgeyBtZXNzYWdlOiAnRXJyb3IgbWVzc2FnZScgfWBcbiAgICBoYW5kbGVyOiAodXNlcikgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJcbiAgICB9LFxuXG4gICAgZXJyb3JzOiB7XG4gICAgICB1c2VybmFtZU9yUGFzc3dvcmRNaXNzaW5nOiAnQm90aCB1c2VybmFtZSBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkJyxcbiAgICAgIHVzZXJuYW1lTm90Rm91bmQ6ICdVc2VybmFtZSAke3VzZXJuYW1lfSBub3QgZm91bmQnLFxuICAgICAgLy8gRm9yIHNlY3VyaXR5IHJlYXNvbnMgeW91IG1heSB3YW50IHRvIG1ha2UgdGhpcyB0aGUgc2FtZSBhcyB0aGVcbiAgICAgIC8vIHVzZXJuYW1lTm90Rm91bmQgZXJyb3Igc28gdGhhdCBhIG1hbGljaW91cyB1c2VyIGNhbid0IHVzZSB0aGUgZXJyb3JcbiAgICAgIC8vIHRvIG5hcnJvdyBkb3duIGlmIGl0J3MgdGhlIHVzZXJuYW1lIG9yIHBhc3N3b3JkIHRoYXQncyBpbmNvcnJlY3RcbiAgICAgIGluY29ycmVjdFBhc3N3b3JkOiAnSW5jb3JyZWN0IHBhc3N3b3JkIGZvciAke3VzZXJuYW1lfScsXG4gICAgfSxcblxuICAgIC8vIEhvdyBsb25nIGEgdXNlciB3aWxsIHJlbWFpbiBsb2dnZWQgaW4sIGluIHNlY29uZHNcbiAgICBleHBpcmVzOiA2MCAqIDYwICogMjQgKiAzNjUgKiAxMCxcbiAgfVxuXG4gIGNvbnN0IHJlc2V0UGFzc3dvcmRPcHRpb25zID0ge1xuICAgIC8vIGhhbmRsZXIoKSBpcyBpbnZva2VkIGFmdGVyIHRoZSBwYXNzd29yZCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgdXBkYXRlZCBpblxuICAgIC8vIHRoZSBkYXRhYmFzZS4gUmV0dXJuaW5nIGFueXRoaW5nIHRydXRoeSB3aWxsIGF1dG9tYXRpY2FsbHkgbG9ncyB0aGUgdXNlclxuICAgIC8vIGluLiBSZXR1cm4gYGZhbHNlYCBvdGhlcndpc2UsIGFuZCBpbiB0aGUgUmVzZXQgUGFzc3dvcmQgcGFnZSByZWRpcmVjdCB0aGVcbiAgICAvLyB1c2VyIHRvIHRoZSBsb2dpbiBwYWdlLlxuICAgIGhhbmRsZXI6ICh1c2VyKSA9PiB7XG4gICAgICByZXR1cm4gdXNlclxuICAgIH0sXG5cbiAgICAvLyBJZiBgZmFsc2VgIHRoZW4gdGhlIG5ldyBwYXNzd29yZCBNVVNUIGJlIGRpZmZlcmVudCB0aGFuIHRoZSBjdXJyZW50IG9uZVxuICAgIGFsbG93UmV1c2VkUGFzc3dvcmQ6IHRydWUsXG5cbiAgICBlcnJvcnM6IHtcbiAgICAgIC8vIHRoZSByZXNldFRva2VuIGlzIHZhbGlkLCBidXQgZXhwaXJlZFxuICAgICAgcmVzZXRUb2tlbkV4cGlyZWQ6ICdyZXNldFRva2VuIGlzIGV4cGlyZWQnLFxuICAgICAgLy8gbm8gdXNlciB3YXMgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gcmVzZXRUb2tlblxuICAgICAgcmVzZXRUb2tlbkludmFsaWQ6ICdyZXNldFRva2VuIGlzIGludmFsaWQnLFxuICAgICAgLy8gdGhlIHJlc2V0VG9rZW4gd2FzIG5vdCBwcmVzZW50IGluIHRoZSBVUkxcbiAgICAgIHJlc2V0VG9rZW5SZXF1aXJlZDogJ3Jlc2V0VG9rZW4gaXMgcmVxdWlyZWQnLFxuICAgICAgLy8gbmV3IHBhc3N3b3JkIGlzIHRoZSBzYW1lIGFzIHRoZSBvbGQgcGFzc3dvcmQgKGFwcGFyZW50bHkgdGhleSBkaWQgbm90IGZvcmdldCBpdClcbiAgICAgIHJldXNlZFBhc3N3b3JkOiAnTXVzdCBjaG9vc2UgYSBuZXcgcGFzc3dvcmQnLFxuICAgIH0sXG4gIH1cblxuICBjb25zdCBzaWdudXBPcHRpb25zID0ge1xuICAgIC8vIFdoYXRldmVyIHlvdSB3YW50IHRvIGhhcHBlbiB0byB5b3VyIGRhdGEgb24gbmV3IHVzZXIgc2lnbnVwLiBSZWR3b29kIHdpbGxcbiAgICAvLyBjaGVjayBmb3IgZHVwbGljYXRlIHVzZXJuYW1lcyBiZWZvcmUgY2FsbGluZyB0aGlzIGhhbmRsZXIuIEF0IGEgbWluaW11bVxuICAgIC8vIHlvdSBuZWVkIHRvIHNhdmUgdGhlIGB1c2VybmFtZWAsIGBoYXNoZWRQYXNzd29yZGAgYW5kIGBzYWx0YCB0byB5b3VyXG4gICAgLy8gdXNlciB0YWJsZS4gYHVzZXJBdHRyaWJ1dGVzYCBjb250YWlucyBhbnkgYWRkaXRpb25hbCBvYmplY3QgbWVtYmVycyB0aGF0XG4gICAgLy8gd2VyZSBpbmNsdWRlZCBpbiB0aGUgb2JqZWN0IGdpdmVuIHRvIHRoZSBgc2lnblVwKClgIGZ1bmN0aW9uIHlvdSBnb3RcbiAgICAvLyBmcm9tIGB1c2VBdXRoKClgLlxuICAgIC8vXG4gICAgLy8gSWYgeW91IHdhbnQgdGhlIHVzZXIgdG8gYmUgaW1tZWRpYXRlbHkgbG9nZ2VkIGluLCByZXR1cm4gdGhlIHVzZXIgdGhhdFxuICAgIC8vIHdhcyBjcmVhdGVkLlxuICAgIC8vXG4gICAgLy8gSWYgdGhpcyBoYW5kbGVyIHRocm93cyBhbiBlcnJvciwgaXQgd2lsbCBiZSByZXR1cm5lZCBieSB0aGUgYHNpZ25VcCgpYFxuICAgIC8vIGZ1bmN0aW9uIGluIHRoZSBmb3JtIG9mOiBgeyBlcnJvcjogJ0Vycm9yIG1lc3NhZ2UnIH1gLlxuICAgIC8vXG4gICAgLy8gSWYgdGhpcyByZXR1cm5zIGFueXRoaW5nIGVsc2UsIGl0IHdpbGwgYmUgcmV0dXJuZWQgYnkgdGhlXG4gICAgLy8gYHNpZ25VcCgpYCBmdW5jdGlvbiBpbiB0aGUgZm9ybSBvZjogYHsgbWVzc2FnZTogJ1N0cmluZyBoZXJlJyB9YC5cbiAgICBoYW5kbGVyOiAoeyB1c2VybmFtZSwgaGFzaGVkUGFzc3dvcmQsIHNhbHQsIHVzZXJBdHRyaWJ1dGVzIH0pID0+IHtcbiAgICAgIHJldHVybiBkYi51c2VyLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBlbWFpbDogdXNlcm5hbWUsXG4gICAgICAgICAgaGFzaGVkUGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkLFxuICAgICAgICAgIHNhbHQ6IHNhbHQsXG4gICAgICAgICAgLy8gbmFtZTogdXNlckF0dHJpYnV0ZXMubmFtZVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgZXJyb3JzOiB7XG4gICAgICAvLyBgZmllbGRgIHdpbGwgYmUgZWl0aGVyIFwidXNlcm5hbWVcIiBvciBcInBhc3N3b3JkXCJcbiAgICAgIGZpZWxkTWlzc2luZzogJyR7ZmllbGR9IGlzIHJlcXVpcmVkJyxcbiAgICAgIHVzZXJuYW1lVGFrZW46ICdVc2VybmFtZSBgJHt1c2VybmFtZX1gIGFscmVhZHkgaW4gdXNlJyxcbiAgICB9LFxuICB9XG5cbiAgY29uc3QgYXV0aEhhbmRsZXIgPSBuZXcgRGJBdXRoSGFuZGxlcihldmVudCwgY29udGV4dCwge1xuICAgIC8vIFByb3ZpZGUgcHJpc21hIGRiIGNsaWVudFxuICAgIGRiOiBkYixcblxuICAgIC8vIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB5b3UnZCBjYWxsIG9uIGBkYmAgdG8gYWNjZXNzIHlvdXIgdXNlciB0YWJsZS5cbiAgICAvLyBpZS4gaWYgeW91ciBQcmlzbWEgbW9kZWwgaXMgbmFtZWQgYFVzZXJgIHRoaXMgdmFsdWUgd291bGQgYmUgYHVzZXJgLCBhcyBpbiBgZGIudXNlcmBcbiAgICBhdXRoTW9kZWxBY2Nlc3NvcjogJ3VzZXInLFxuXG4gICAgLy8gQSBtYXAgb2Ygd2hhdCBkYkF1dGggY2FsbHMgYSBmaWVsZCB0byB3aGF0IHlvdXIgZGF0YWJhc2UgY2FsbHMgaXQuXG4gICAgLy8gYGlkYCBpcyB3aGF0ZXZlciBjb2x1bW4geW91IHVzZSB0byB1bmlxdWVseSBpZGVudGlmeSBhIHVzZXIgKHByb2JhYmx5XG4gICAgLy8gc29tZXRoaW5nIGxpa2UgYGlkYCBvciBgdXNlcklkYCBvciBldmVuIGBlbWFpbGApXG4gICAgYXV0aEZpZWxkczoge1xuICAgICAgaWQ6ICdpZCcsXG4gICAgICB1c2VybmFtZTogJ2VtYWlsJyxcbiAgICAgIGhhc2hlZFBhc3N3b3JkOiAnaGFzaGVkUGFzc3dvcmQnLFxuICAgICAgc2FsdDogJ3NhbHQnLFxuICAgICAgcmVzZXRUb2tlbjogJ3Jlc2V0VG9rZW4nLFxuICAgICAgcmVzZXRUb2tlbkV4cGlyZXNBdDogJ3Jlc2V0VG9rZW5FeHBpcmVzQXQnLFxuICAgIH0sXG5cbiAgICAvLyBTcGVjaWZpZXMgYXR0cmlidXRlcyBvbiB0aGUgY29va2llIHRoYXQgZGJBdXRoIHNldHMgaW4gb3JkZXIgdG8gcmVtZW1iZXJcbiAgICAvLyB3aG8gaXMgbG9nZ2VkIGluLiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9Db29raWVzI3Jlc3RyaWN0X2FjY2Vzc190b19jb29raWVzXG4gICAgY29va2llOiB7XG4gICAgICBIdHRwT25seTogdHJ1ZSxcbiAgICAgIFBhdGg6ICcvJyxcbiAgICAgIFNhbWVTaXRlOiAnU3RyaWN0JyxcbiAgICAgIFNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcgPyB0cnVlIDogZmFsc2UsXG5cbiAgICAgIC8vIElmIHlvdSBuZWVkIHRvIGFsbG93IG90aGVyIGRvbWFpbnMgKGJlc2lkZXMgdGhlIGFwaSBzaWRlKSBhY2Nlc3MgdG9cbiAgICAgIC8vIHRoZSBkYkF1dGggc2Vzc2lvbiBjb29raWU6XG4gICAgICAvLyBEb21haW46ICdleGFtcGxlLmNvbScsXG4gICAgfSxcblxuICAgIGZvcmdvdFBhc3N3b3JkOiBmb3Jnb3RQYXNzd29yZE9wdGlvbnMsXG4gICAgbG9naW46IGxvZ2luT3B0aW9ucyxcbiAgICByZXNldFBhc3N3b3JkOiByZXNldFBhc3N3b3JkT3B0aW9ucyxcbiAgICBzaWdudXA6IHNpZ251cE9wdGlvbnMsXG4gIH0pXG5cbiAgcmV0dXJuIGF3YWl0IGF1dGhIYW5kbGVyLmludm9rZSgpXG59XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLEVBQVQ7QUFDQSxTQUFTQyxhQUFULFFBQThCLGdCQUE5QjtBQUVBLE9BQU8sTUFBTUMsT0FBTyxHQUFHLE9BQU9DLEtBQVAsRUFBY0MsT0FBZCxLQUEwQjtFQUMvQyxNQUFNQyxxQkFBcUIsR0FBRztJQUM1QjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQUgsT0FBTyxFQUFHSSxJQUFELElBQVU7TUFDakIsT0FBT0EsSUFBUDtJQUNELENBZjJCO0lBaUI1QjtJQUNBQyxPQUFPLEVBQUUsS0FBSyxFQUFMLEdBQVUsRUFsQlM7SUFvQjVCQyxNQUFNLEVBQUU7TUFDTjtNQUNBO01BQ0E7TUFDQUMsZ0JBQWdCLEVBQUUsb0JBSlo7TUFLTjtNQUNBQyxnQkFBZ0IsRUFBRTtJQU5aO0VBcEJvQixDQUE5QjtFQThCQSxNQUFNQyxZQUFZLEdBQUc7SUFDbkI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBVCxPQUFPLEVBQUdJLElBQUQsSUFBVTtNQUNqQixPQUFPQSxJQUFQO0lBQ0QsQ0Fka0I7SUFnQm5CRSxNQUFNLEVBQUU7TUFDTkkseUJBQXlCLEVBQUUseUNBRHJCO01BRU5ILGdCQUFnQixFQUFFLGdDQUZaO01BR047TUFDQTtNQUNBO01BQ0FJLGlCQUFpQixFQUFFO0lBTmIsQ0FoQlc7SUF5Qm5CO0lBQ0FOLE9BQU8sRUFBRSxLQUFLLEVBQUwsR0FBVSxFQUFWLEdBQWUsR0FBZixHQUFxQjtFQTFCWCxDQUFyQjtFQTZCQSxNQUFNTyxvQkFBb0IsR0FBRztJQUMzQjtJQUNBO0lBQ0E7SUFDQTtJQUNBWixPQUFPLEVBQUdJLElBQUQsSUFBVTtNQUNqQixPQUFPQSxJQUFQO0lBQ0QsQ0FQMEI7SUFTM0I7SUFDQVMsbUJBQW1CLEVBQUUsSUFWTTtJQVkzQlAsTUFBTSxFQUFFO01BQ047TUFDQVEsaUJBQWlCLEVBQUUsdUJBRmI7TUFHTjtNQUNBQyxpQkFBaUIsRUFBRSx1QkFKYjtNQUtOO01BQ0FDLGtCQUFrQixFQUFFLHdCQU5kO01BT047TUFDQUMsY0FBYyxFQUFFO0lBUlY7RUFabUIsQ0FBN0I7RUF3QkEsTUFBTUMsYUFBYSxHQUFHO0lBQ3BCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBbEIsT0FBTyxFQUFFLENBQUM7TUFBRW1CLFFBQUY7TUFBWUMsY0FBWjtNQUE0QkMsSUFBNUI7TUFBa0NDO0lBQWxDLENBQUQsS0FBd0Q7TUFDL0QsT0FBT3hCLEVBQUUsQ0FBQ00sSUFBSCxDQUFRbUIsTUFBUixDQUFlO1FBQ3BCQyxJQUFJLEVBQUU7VUFDSkMsS0FBSyxFQUFFTixRQURIO1VBRUpDLGNBQWMsRUFBRUEsY0FGWjtVQUdKQyxJQUFJLEVBQUVBLElBSEYsQ0FJSjs7UUFKSTtNQURjLENBQWYsQ0FBUDtJQVFELENBekJtQjtJQTJCcEJmLE1BQU0sRUFBRTtNQUNOO01BQ0FvQixZQUFZLEVBQUUsc0JBRlI7TUFHTkMsYUFBYSxFQUFFO0lBSFQ7RUEzQlksQ0FBdEI7RUFrQ0EsTUFBTUMsV0FBVyxHQUFHLElBQUk3QixhQUFKLENBQWtCRSxLQUFsQixFQUF5QkMsT0FBekIsRUFBa0M7SUFDcEQ7SUFDQUosRUFBRSxFQUFFQSxFQUZnRDtJQUlwRDtJQUNBO0lBQ0ErQixpQkFBaUIsRUFBRSxNQU5pQztJQVFwRDtJQUNBO0lBQ0E7SUFDQUMsVUFBVSxFQUFFO01BQ1ZDLEVBQUUsRUFBRSxJQURNO01BRVZaLFFBQVEsRUFBRSxPQUZBO01BR1ZDLGNBQWMsRUFBRSxnQkFITjtNQUlWQyxJQUFJLEVBQUUsTUFKSTtNQUtWVyxVQUFVLEVBQUUsWUFMRjtNQU1WQyxtQkFBbUIsRUFBRTtJQU5YLENBWHdDO0lBb0JwRDtJQUNBO0lBQ0FDLE1BQU0sRUFBRTtNQUNOQyxRQUFRLEVBQUUsSUFESjtNQUVOQyxJQUFJLEVBQUUsR0FGQTtNQUdOQyxRQUFRLEVBQUUsUUFISjtNQUlOQyxNQUFNLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLGFBQXpCLEdBQXlDLElBQXpDLEdBQWdELEtBSmxELENBTU47TUFDQTtNQUNBOztJQVJNLENBdEI0QztJQWlDcERDLGNBQWMsRUFBRXZDLHFCQWpDb0M7SUFrQ3BEd0MsS0FBSyxFQUFFbEMsWUFsQzZDO0lBbUNwRG1DLGFBQWEsRUFBRWhDLG9CQW5DcUM7SUFvQ3BEaUMsTUFBTSxFQUFFM0I7RUFwQzRDLENBQWxDLENBQXBCO0VBdUNBLE9BQU8sTUFBTVUsV0FBVyxDQUFDa0IsTUFBWixFQUFiO0FBQ0QsQ0E5Sk0ifQ==