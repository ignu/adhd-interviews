import _Array$isArray from "@babel/runtime-corejs3/core-js/array/is-array";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js/instance/includes";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js/instance/some";
import { AuthenticationError, ForbiddenError, context } from '@redwoodjs/graphql-server';
import { db } from './db';
/**
 * The session object sent in as the first argument to getCurrentUser() will
 * have a single key `id` containing the unique ID of the logged in user
 * (whatever field you set as `authFields.id` in your auth function config).
 * You'll need to update the call to `db` below if you use a different model
 * name or unique field name, for example:
 *
 *   return await db.profile.findUnique({ where: { email: session.id } })
 *                   ───┬───                       ──┬──
 *      model accessor ─┘      unique id field name ─┘
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the `select` object below once you've decided they are safe to be
 * seen if someone were to open the Web Inspector in their browser.
 */

export const getCurrentUser = async session => {
  return await db.user.findUnique({
    where: {
      id: session.id
    },
    select: {
      id: true
    }
  });
};
/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */

export const isAuthenticated = () => {
  return !!context.currentUser;
};
/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles: AllowedRoles - Checks if the currentUser is assigned one of these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = roles => {
  if (!isAuthenticated()) {
    return false;
  }

  const currentUserRoles = context.currentUser?.roles;

  if (typeof roles === 'string') {
    if (typeof currentUserRoles === 'string') {
      // roles to check is a string, currentUser.roles is a string
      return currentUserRoles === roles;
    } else if (_Array$isArray(currentUserRoles)) {
      // roles to check is a string, currentUser.roles is an array
      return currentUserRoles?.some(allowedRole => roles === allowedRole);
    }
  }

  if (_Array$isArray(roles)) {
    if (_Array$isArray(currentUserRoles)) {
      // roles to check is an array, currentUser.roles is an array
      return currentUserRoles?.some(allowedRole => _includesInstanceProperty(roles).call(roles, allowedRole));
    } else if (typeof context.currentUser.roles === 'string') {
      // roles to check is an array, currentUser.roles is a string
      return _someInstanceProperty(roles).call(roles, allowedRole => context.currentUser?.roles === allowedRole);
    }
  } // roles not found


  return false;
};
/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param roles: AllowedRoles - When checking role membership, these roles grant access.
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 * @throws {ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */

export const requireAuth = ({
  roles
}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.");
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.");
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBdXRoZW50aWNhdGlvbkVycm9yIiwiRm9yYmlkZGVuRXJyb3IiLCJjb250ZXh0IiwiZGIiLCJnZXRDdXJyZW50VXNlciIsInNlc3Npb24iLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJzZWxlY3QiLCJpc0F1dGhlbnRpY2F0ZWQiLCJjdXJyZW50VXNlciIsImhhc1JvbGUiLCJyb2xlcyIsImN1cnJlbnRVc2VyUm9sZXMiLCJzb21lIiwiYWxsb3dlZFJvbGUiLCJyZXF1aXJlQXV0aCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwaS9zcmMvbGliL2F1dGgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aGVudGljYXRpb25FcnJvciwgRm9yYmlkZGVuRXJyb3IgfSBmcm9tICdAcmVkd29vZGpzL2dyYXBocWwtc2VydmVyJ1xuaW1wb3J0IHsgZGIgfSBmcm9tICcuL2RiJ1xuXG4vKipcbiAqIFRoZSBzZXNzaW9uIG9iamVjdCBzZW50IGluIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBnZXRDdXJyZW50VXNlcigpIHdpbGxcbiAqIGhhdmUgYSBzaW5nbGUga2V5IGBpZGAgY29udGFpbmluZyB0aGUgdW5pcXVlIElEIG9mIHRoZSBsb2dnZWQgaW4gdXNlclxuICogKHdoYXRldmVyIGZpZWxkIHlvdSBzZXQgYXMgYGF1dGhGaWVsZHMuaWRgIGluIHlvdXIgYXV0aCBmdW5jdGlvbiBjb25maWcpLlxuICogWW91J2xsIG5lZWQgdG8gdXBkYXRlIHRoZSBjYWxsIHRvIGBkYmAgYmVsb3cgaWYgeW91IHVzZSBhIGRpZmZlcmVudCBtb2RlbFxuICogbmFtZSBvciB1bmlxdWUgZmllbGQgbmFtZSwgZm9yIGV4YW1wbGU6XG4gKlxuICogICByZXR1cm4gYXdhaXQgZGIucHJvZmlsZS5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZW1haWw6IHNlc3Npb24uaWQgfSB9KVxuICogICAgICAgICAgICAgICAgICAg4pSA4pSA4pSA4pSs4pSA4pSA4pSAICAgICAgICAgICAgICAgICAgICAgICDilIDilIDilKzilIDilIBcbiAqICAgICAgbW9kZWwgYWNjZXNzb3Ig4pSA4pSYICAgICAgdW5pcXVlIGlkIGZpZWxkIG5hbWUg4pSA4pSYXG4gKlxuICogISEgQkVXQVJFICEhIEFueXRoaW5nIHJldHVybmVkIGZyb20gdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGF2YWlsYWJsZSB0byB0aGVcbiAqIGNsaWVudC0taXQgYmVjb21lcyB0aGUgY29udGVudCBvZiBgY3VycmVudFVzZXJgIG9uIHRoZSB3ZWIgc2lkZSAoYXMgd2VsbCBhc1xuICogYGNvbnRleHQuY3VycmVudFVzZXJgIG9uIHRoZSBhcGkgc2lkZSkuIFlvdSBzaG91bGQgY2FyZWZ1bGx5IGFkZCBhZGRpdGlvbmFsXG4gKiBmaWVsZHMgdG8gdGhlIGBzZWxlY3RgIG9iamVjdCBiZWxvdyBvbmNlIHlvdSd2ZSBkZWNpZGVkIHRoZXkgYXJlIHNhZmUgdG8gYmVcbiAqIHNlZW4gaWYgc29tZW9uZSB3ZXJlIHRvIG9wZW4gdGhlIFdlYiBJbnNwZWN0b3IgaW4gdGhlaXIgYnJvd3Nlci5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRVc2VyID0gYXN5bmMgKHNlc3Npb24pID0+IHtcbiAgcmV0dXJuIGF3YWl0IGRiLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgaWQ6IHNlc3Npb24uaWQgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfSxcbiAgfSlcbn1cblxuLyoqXG4gKiBUaGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIGlmIHRoZXJlIGlzIGEgY3VycmVudFVzZXIgaW4gdGhlIGNvbnRleHRcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBJZiB0aGUgY3VycmVudFVzZXIgaXMgYXV0aGVudGljYXRlZFxuICovXG5leHBvcnQgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gISFjb250ZXh0LmN1cnJlbnRVc2VyXG59XG5cbi8qKlxuICogV2hlbiBjaGVja2luZyByb2xlIG1lbWJlcnNoaXAsIHJvbGVzIGNhbiBiZSBhIHNpbmdsZSB2YWx1ZSwgYSBsaXN0LCBvciBub25lLlxuICogWW91IGNhbiB1c2UgUHJpc21hIGVudW1zIHRvbyAoaWYgeW91J3JlIHVzaW5nIHRoZW0gZm9yIHJvbGVzKSwganVzdCBpbXBvcnQgeW91ciBlbnVtIHR5cGUgZnJvbSBgQHByaXNtYS9jbGllbnRgXG4gKi9cbnR5cGUgQWxsb3dlZFJvbGVzID0gc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWRcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGN1cnJlbnRVc2VyIGlzIGF1dGhlbnRpY2F0ZWQgKGFuZCBhc3NpZ25lZCBvbmUgb2YgdGhlIGdpdmVuIHJvbGVzKVxuICpcbiAqIEBwYXJhbSByb2xlczogQWxsb3dlZFJvbGVzIC0gQ2hlY2tzIGlmIHRoZSBjdXJyZW50VXNlciBpcyBhc3NpZ25lZCBvbmUgb2YgdGhlc2Ugcm9sZXNcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnRVc2VyIGlzIGxvZ2dlZCBpbiBhbmQgYXNzaWduZWQgb25lIG9mIHRoZSBnaXZlbiByb2xlcyxcbiAqIG9yIHdoZW4gbm8gcm9sZXMgYXJlIHByb3ZpZGVkIHRvIGNoZWNrIGFnYWluc3QuIE90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxuICovXG5leHBvcnQgY29uc3QgaGFzUm9sZSA9IChyb2xlczogQWxsb3dlZFJvbGVzKTogYm9vbGVhbiA9PiB7XG4gIGlmICghaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IGN1cnJlbnRVc2VyUm9sZXMgPSBjb250ZXh0LmN1cnJlbnRVc2VyPy5yb2xlc1xuXG4gIGlmICh0eXBlb2Ygcm9sZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBjdXJyZW50VXNlclJvbGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gcm9sZXMgdG8gY2hlY2sgaXMgYSBzdHJpbmcsIGN1cnJlbnRVc2VyLnJvbGVzIGlzIGEgc3RyaW5nXG4gICAgICByZXR1cm4gY3VycmVudFVzZXJSb2xlcyA9PT0gcm9sZXNcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY3VycmVudFVzZXJSb2xlcykpIHtcbiAgICAgIC8vIHJvbGVzIHRvIGNoZWNrIGlzIGEgc3RyaW5nLCBjdXJyZW50VXNlci5yb2xlcyBpcyBhbiBhcnJheVxuICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyUm9sZXM/LnNvbWUoKGFsbG93ZWRSb2xlKSA9PiByb2xlcyA9PT0gYWxsb3dlZFJvbGUpXG4gICAgfVxuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocm9sZXMpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY3VycmVudFVzZXJSb2xlcykpIHtcbiAgICAgIC8vIHJvbGVzIHRvIGNoZWNrIGlzIGFuIGFycmF5LCBjdXJyZW50VXNlci5yb2xlcyBpcyBhbiBhcnJheVxuICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyUm9sZXM/LnNvbWUoKGFsbG93ZWRSb2xlKSA9PlxuICAgICAgICByb2xlcy5pbmNsdWRlcyhhbGxvd2VkUm9sZSlcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb250ZXh0LmN1cnJlbnRVc2VyLnJvbGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gcm9sZXMgdG8gY2hlY2sgaXMgYW4gYXJyYXksIGN1cnJlbnRVc2VyLnJvbGVzIGlzIGEgc3RyaW5nXG4gICAgICByZXR1cm4gcm9sZXMuc29tZShcbiAgICAgICAgKGFsbG93ZWRSb2xlKSA9PiBjb250ZXh0LmN1cnJlbnRVc2VyPy5yb2xlcyA9PT0gYWxsb3dlZFJvbGVcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvLyByb2xlcyBub3QgZm91bmRcbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogVXNlIHJlcXVpcmVBdXRoIGluIHlvdXIgc2VydmljZXMgdG8gY2hlY2sgdGhhdCBhIHVzZXIgaXMgbG9nZ2VkIGluLFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgYXNzaWduZWQgYSByb2xlLCBhbmQgb3B0aW9uYWxseSByYWlzZSBhblxuICogZXJyb3IgaWYgdGhleSdyZSBub3QuXG4gKlxuICogQHBhcmFtIHJvbGVzOiBBbGxvd2VkUm9sZXMgLSBXaGVuIGNoZWNraW5nIHJvbGUgbWVtYmVyc2hpcCwgdGhlc2Ugcm9sZXMgZ3JhbnQgYWNjZXNzLlxuICpcbiAqIEByZXR1cm5zIC0gSWYgdGhlIGN1cnJlbnRVc2VyIGlzIGF1dGhlbnRpY2F0ZWQgKGFuZCBhc3NpZ25lZCBvbmUgb2YgdGhlIGdpdmVuIHJvbGVzKVxuICpcbiAqIEB0aHJvd3Mge0F1dGhlbnRpY2F0aW9uRXJyb3J9IC0gSWYgdGhlIGN1cnJlbnRVc2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkXG4gKiBAdGhyb3dzIHtGb3JiaWRkZW5FcnJvcn0gSWYgdGhlIGN1cnJlbnRVc2VyIGlzIG5vdCBhbGxvd2VkIGR1ZSB0byByb2xlIHBlcm1pc3Npb25zXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVkd29vZGpzL3JlZHdvb2QvdHJlZS9tYWluL3BhY2thZ2VzL2F1dGggZm9yIGV4YW1wbGVzXG4gKi9cbmV4cG9ydCBjb25zdCByZXF1aXJlQXV0aCA9ICh7IHJvbGVzIH06IHsgcm9sZXM6IEFsbG93ZWRSb2xlcyB9KSA9PiB7XG4gIGlmICghaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICB0aHJvdyBuZXcgQXV0aGVudGljYXRpb25FcnJvcihcIllvdSBkb24ndCBoYXZlIHBlcm1pc3Npb24gdG8gZG8gdGhhdC5cIilcbiAgfVxuXG4gIGlmIChyb2xlcyAmJiAhaGFzUm9sZShyb2xlcykpIHtcbiAgICB0aHJvdyBuZXcgRm9yYmlkZGVuRXJyb3IoXCJZb3UgZG9uJ3QgaGF2ZSBhY2Nlc3MgdG8gZG8gdGhhdC5cIilcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFTQSxtQkFBVCxFQUE4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