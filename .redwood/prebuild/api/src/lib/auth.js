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
      id: true,
      name: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBdXRoZW50aWNhdGlvbkVycm9yIiwiRm9yYmlkZGVuRXJyb3IiLCJjb250ZXh0IiwiZGIiLCJnZXRDdXJyZW50VXNlciIsInNlc3Npb24iLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJzZWxlY3QiLCJuYW1lIiwiaXNBdXRoZW50aWNhdGVkIiwiY3VycmVudFVzZXIiLCJoYXNSb2xlIiwicm9sZXMiLCJjdXJyZW50VXNlclJvbGVzIiwic29tZSIsImFsbG93ZWRSb2xlIiwicmVxdWlyZUF1dGgiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcGkvc3JjL2xpYi9hdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhlbnRpY2F0aW9uRXJyb3IsIEZvcmJpZGRlbkVycm9yIH0gZnJvbSAnQHJlZHdvb2Rqcy9ncmFwaHFsLXNlcnZlcidcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9kYidcblxuLyoqXG4gKiBUaGUgc2Vzc2lvbiBvYmplY3Qgc2VudCBpbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gZ2V0Q3VycmVudFVzZXIoKSB3aWxsXG4gKiBoYXZlIGEgc2luZ2xlIGtleSBgaWRgIGNvbnRhaW5pbmcgdGhlIHVuaXF1ZSBJRCBvZiB0aGUgbG9nZ2VkIGluIHVzZXJcbiAqICh3aGF0ZXZlciBmaWVsZCB5b3Ugc2V0IGFzIGBhdXRoRmllbGRzLmlkYCBpbiB5b3VyIGF1dGggZnVuY3Rpb24gY29uZmlnKS5cbiAqIFlvdSdsbCBuZWVkIHRvIHVwZGF0ZSB0aGUgY2FsbCB0byBgZGJgIGJlbG93IGlmIHlvdSB1c2UgYSBkaWZmZXJlbnQgbW9kZWxcbiAqIG5hbWUgb3IgdW5pcXVlIGZpZWxkIG5hbWUsIGZvciBleGFtcGxlOlxuICpcbiAqICAgcmV0dXJuIGF3YWl0IGRiLnByb2ZpbGUuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGVtYWlsOiBzZXNzaW9uLmlkIH0gfSlcbiAqICAgICAgICAgICAgICAgICAgIOKUgOKUgOKUgOKUrOKUgOKUgOKUgCAgICAgICAgICAgICAgICAgICAgICAg4pSA4pSA4pSs4pSA4pSAXG4gKiAgICAgIG1vZGVsIGFjY2Vzc29yIOKUgOKUmCAgICAgIHVuaXF1ZSBpZCBmaWVsZCBuYW1lIOKUgOKUmFxuICpcbiAqICEhIEJFV0FSRSAhISBBbnl0aGluZyByZXR1cm5lZCBmcm9tIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhdmFpbGFibGUgdG8gdGhlXG4gKiBjbGllbnQtLWl0IGJlY29tZXMgdGhlIGNvbnRlbnQgb2YgYGN1cnJlbnRVc2VyYCBvbiB0aGUgd2ViIHNpZGUgKGFzIHdlbGwgYXNcbiAqIGBjb250ZXh0LmN1cnJlbnRVc2VyYCBvbiB0aGUgYXBpIHNpZGUpLiBZb3Ugc2hvdWxkIGNhcmVmdWxseSBhZGQgYWRkaXRpb25hbFxuICogZmllbGRzIHRvIHRoZSBgc2VsZWN0YCBvYmplY3QgYmVsb3cgb25jZSB5b3UndmUgZGVjaWRlZCB0aGV5IGFyZSBzYWZlIHRvIGJlXG4gKiBzZWVuIGlmIHNvbWVvbmUgd2VyZSB0byBvcGVuIHRoZSBXZWIgSW5zcGVjdG9yIGluIHRoZWlyIGJyb3dzZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50VXNlciA9IGFzeW5jIChzZXNzaW9uKSA9PiB7XG4gIHJldHVybiBhd2FpdCBkYi51c2VyLmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLmlkIH0sXG4gICAgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlIH0sXG4gIH0pXG59XG5cbi8qKlxuICogVGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBpZiB0aGVyZSBpcyBhIGN1cnJlbnRVc2VyIGluIHRoZSBjb250ZXh0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IC0gSWYgdGhlIGN1cnJlbnRVc2VyIGlzIGF1dGhlbnRpY2F0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQXV0aGVudGljYXRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuICEhY29udGV4dC5jdXJyZW50VXNlclxufVxuXG4vKipcbiAqIFdoZW4gY2hlY2tpbmcgcm9sZSBtZW1iZXJzaGlwLCByb2xlcyBjYW4gYmUgYSBzaW5nbGUgdmFsdWUsIGEgbGlzdCwgb3Igbm9uZS5cbiAqIFlvdSBjYW4gdXNlIFByaXNtYSBlbnVtcyB0b28gKGlmIHlvdSdyZSB1c2luZyB0aGVtIGZvciByb2xlcyksIGp1c3QgaW1wb3J0IHlvdXIgZW51bSB0eXBlIGZyb20gYEBwcmlzbWEvY2xpZW50YFxuICovXG50eXBlIEFsbG93ZWRSb2xlcyA9IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkXG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50VXNlciBpcyBhdXRoZW50aWNhdGVkIChhbmQgYXNzaWduZWQgb25lIG9mIHRoZSBnaXZlbiByb2xlcylcbiAqXG4gKiBAcGFyYW0gcm9sZXM6IEFsbG93ZWRSb2xlcyAtIENoZWNrcyBpZiB0aGUgY3VycmVudFVzZXIgaXMgYXNzaWduZWQgb25lIG9mIHRoZXNlIHJvbGVzXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IC0gUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50VXNlciBpcyBsb2dnZWQgaW4gYW5kIGFzc2lnbmVkIG9uZSBvZiB0aGUgZ2l2ZW4gcm9sZXMsXG4gKiBvciB3aGVuIG5vIHJvbGVzIGFyZSBwcm92aWRlZCB0byBjaGVjayBhZ2FpbnN0LiBPdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1JvbGUgPSAocm9sZXM6IEFsbG93ZWRSb2xlcyk6IGJvb2xlYW4gPT4ge1xuICBpZiAoIWlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBjdXJyZW50VXNlclJvbGVzID0gY29udGV4dC5jdXJyZW50VXNlcj8ucm9sZXNcblxuICBpZiAodHlwZW9mIHJvbGVzID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2YgY3VycmVudFVzZXJSb2xlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHJvbGVzIHRvIGNoZWNrIGlzIGEgc3RyaW5nLCBjdXJyZW50VXNlci5yb2xlcyBpcyBhIHN0cmluZ1xuICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyUm9sZXMgPT09IHJvbGVzXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRVc2VyUm9sZXMpKSB7XG4gICAgICAvLyByb2xlcyB0byBjaGVjayBpcyBhIHN0cmluZywgY3VycmVudFVzZXIucm9sZXMgaXMgYW4gYXJyYXlcbiAgICAgIHJldHVybiBjdXJyZW50VXNlclJvbGVzPy5zb21lKChhbGxvd2VkUm9sZSkgPT4gcm9sZXMgPT09IGFsbG93ZWRSb2xlKVxuICAgIH1cbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHJvbGVzKSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRVc2VyUm9sZXMpKSB7XG4gICAgICAvLyByb2xlcyB0byBjaGVjayBpcyBhbiBhcnJheSwgY3VycmVudFVzZXIucm9sZXMgaXMgYW4gYXJyYXlcbiAgICAgIHJldHVybiBjdXJyZW50VXNlclJvbGVzPy5zb21lKChhbGxvd2VkUm9sZSkgPT5cbiAgICAgICAgcm9sZXMuaW5jbHVkZXMoYWxsb3dlZFJvbGUpXG4gICAgICApXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGV4dC5jdXJyZW50VXNlci5yb2xlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHJvbGVzIHRvIGNoZWNrIGlzIGFuIGFycmF5LCBjdXJyZW50VXNlci5yb2xlcyBpcyBhIHN0cmluZ1xuICAgICAgcmV0dXJuIHJvbGVzLnNvbWUoXG4gICAgICAgIChhbGxvd2VkUm9sZSkgPT4gY29udGV4dC5jdXJyZW50VXNlcj8ucm9sZXMgPT09IGFsbG93ZWRSb2xlXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLy8gcm9sZXMgbm90IGZvdW5kXG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIFVzZSByZXF1aXJlQXV0aCBpbiB5b3VyIHNlcnZpY2VzIHRvIGNoZWNrIHRoYXQgYSB1c2VyIGlzIGxvZ2dlZCBpbixcbiAqIHdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIGFzc2lnbmVkIGEgcm9sZSwgYW5kIG9wdGlvbmFsbHkgcmFpc2UgYW5cbiAqIGVycm9yIGlmIHRoZXkncmUgbm90LlxuICpcbiAqIEBwYXJhbSByb2xlczogQWxsb3dlZFJvbGVzIC0gV2hlbiBjaGVja2luZyByb2xlIG1lbWJlcnNoaXAsIHRoZXNlIHJvbGVzIGdyYW50IGFjY2Vzcy5cbiAqXG4gKiBAcmV0dXJucyAtIElmIHRoZSBjdXJyZW50VXNlciBpcyBhdXRoZW50aWNhdGVkIChhbmQgYXNzaWduZWQgb25lIG9mIHRoZSBnaXZlbiByb2xlcylcbiAqXG4gKiBAdGhyb3dzIHtBdXRoZW50aWNhdGlvbkVycm9yfSAtIElmIHRoZSBjdXJyZW50VXNlciBpcyBub3QgYXV0aGVudGljYXRlZFxuICogQHRocm93cyB7Rm9yYmlkZGVuRXJyb3J9IElmIHRoZSBjdXJyZW50VXNlciBpcyBub3QgYWxsb3dlZCBkdWUgdG8gcm9sZSBwZXJtaXNzaW9uc1xuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3JlZHdvb2Rqcy9yZWR3b29kL3RyZWUvbWFpbi9wYWNrYWdlcy9hdXRoIGZvciBleGFtcGxlc1xuICovXG5leHBvcnQgY29uc3QgcmVxdWlyZUF1dGggPSAoeyByb2xlcyB9OiB7IHJvbGVzOiBBbGxvd2VkUm9sZXMgfSkgPT4ge1xuICBpZiAoIWlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEF1dGhlbnRpY2F0aW9uRXJyb3IoXCJZb3UgZG9uJ3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGRvIHRoYXQuXCIpXG4gIH1cblxuICBpZiAocm9sZXMgJiYgIWhhc1JvbGUocm9sZXMpKSB7XG4gICAgdGhyb3cgbmV3IEZvcmJpZGRlbkVycm9yKFwiWW91IGRvbid0IGhhdmUgYWNjZXNzIHRvIGRvIHRoYXQuXCIpXG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBU0EsbUJBQVQsRUFBOEJDLGNBQTlCLEVBaUNXQyxPQWpDWCxRQUFvRCwyQkFBcEQ7QUFDQSxTQUFTQyxFQUFULFFBQW1CLE1BQW5CO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxPQUFPLE1BQU1DLGNBQWMsR0FBRyxNQUFPQyxPQUFQLElBQW1CO0VBQy9DLE9BQU8sTUFBTUYsRUFBRSxDQUFDRyxJQUFILENBQVFDLFVBQVIsQ0FBbUI7SUFDOUJDLEtBQUssRUFBRTtNQUFFQyxFQUFFLEVBQUVKLE9BQU8sQ0FBQ0k7SUFBZCxDQUR1QjtJQUU5QkMsTUFBTSxFQUFFO01BQUVELEVBQUUsRUFBRSxJQUFOO01BQVlFLElBQUksRUFBRTtJQUFsQjtFQUZzQixDQUFuQixDQUFiO0FBSUQsQ0FMTTtBQU9QO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsT0FBTyxNQUFNQyxlQUFlLEdBQUcsTUFBZTtFQUM1QyxPQUFPLENBQUMsQ0FBQ1YsT0FBTyxDQUFDVyxXQUFqQjtBQUNELENBRk07QUFJUDtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxNQUFNQyxPQUFPLEdBQUlDLEtBQUQsSUFBa0M7RUFDdkQsSUFBSSxDQUFDSCxlQUFlLEVBQXBCLEVBQXdCO0lBQ3RCLE9BQU8sS0FBUDtFQUNEOztFQUVELE1BQU1JLGdCQUFnQixHQUFHZCxPQUFPLENBQUNXLFdBQVIsRUFBcUJFLEtBQTlDOztFQUVBLElBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtJQUM3QixJQUFJLE9BQU9DLGdCQUFQLEtBQTRCLFFBQWhDLEVBQTBDO01BQ3hDO01BQ0EsT0FBT0EsZ0JBQWdCLEtBQUtELEtBQTVCO0lBQ0QsQ0FIRCxNQUdPLElBQUksZUFBY0MsZ0JBQWQsQ0FBSixFQUFxQztNQUMxQztNQUNBLE9BQU9BLGdCQUFnQixFQUFFQyxJQUFsQixDQUF3QkMsV0FBRCxJQUFpQkgsS0FBSyxLQUFLRyxXQUFsRCxDQUFQO0lBQ0Q7RUFDRjs7RUFFRCxJQUFJLGVBQWNILEtBQWQsQ0FBSixFQUEwQjtJQUN4QixJQUFJLGVBQWNDLGdCQUFkLENBQUosRUFBcUM7TUFDbkM7TUFDQSxPQUFPQSxnQkFBZ0IsRUFBRUMsSUFBbEIsQ0FBd0JDLFdBQUQsSUFDNUIsMEJBQUFILEtBQUssTUFBTCxDQUFBQSxLQUFLLEVBQVVHLFdBQVYsQ0FEQSxDQUFQO0lBR0QsQ0FMRCxNQUtPLElBQUksT0FBT2hCLE9BQU8sQ0FBQ1csV0FBUixDQUFvQkUsS0FBM0IsS0FBcUMsUUFBekMsRUFBbUQ7TUFDeEQ7TUFDQSxPQUFPLHNCQUFBQSxLQUFLLE1BQUwsQ0FBQUEsS0FBSyxFQUNURyxXQUFELElBQWlCaEIsT0FBTyxDQUFDVyxXQUFSLEVBQXFCRSxLQUFyQixLQUErQkcsV0FEdEMsQ0FBWjtJQUdEO0VBQ0YsQ0E3QnNELENBK0J2RDs7O0VBQ0EsT0FBTyxLQUFQO0FBQ0QsQ0FqQ007QUFtQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxPQUFPLE1BQU1DLFdBQVcsR0FBRyxDQUFDO0VBQUVKO0FBQUYsQ0FBRCxLQUF3QztFQUNqRSxJQUFJLENBQUNILGVBQWUsRUFBcEIsRUFBd0I7SUFDdEIsTUFBTSxJQUFJWixtQkFBSixDQUF3Qix1Q0FBeEIsQ0FBTjtFQUNEOztFQUVELElBQUllLEtBQUssSUFBSSxDQUFDRCxPQUFPLENBQUNDLEtBQUQsQ0FBckIsRUFBOEI7SUFDNUIsTUFBTSxJQUFJZCxjQUFKLENBQW1CLG1DQUFuQixDQUFOO0VBQ0Q7QUFDRixDQVJNIn0=