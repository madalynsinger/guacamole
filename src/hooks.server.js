import PocketBase from 'pocketbase'
import {SECRET_EMAIL, SECRET_PASSWORD, PB_URL} from '$env/static/private';

export const handle = async ({event, resolve}) => {
    const adminPb = new PocketBase(PB_URL);
    const userPb = new PocketBase(PB_URL);

    // Sign in
    await adminPb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    event.locals.adminPb = adminPb;
    event.locals.userPb = userPb;

    // Load the authStore from the cookie
    event.locals.userPb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // Refresh the auth if it is invalid
        if (event.locals.userPb.authStore.isValid) {
            await event.locals.userPb.collection('users').authRefresh();
        }

        // Spread the model to locals.user to be available in all pages
        event.locals.user = {...event.locals.userPb.authStore.model};
    } catch (err) {
        console.log("error in hooks", err);
        event.locals.userPb.authStore.clear();
    }

    const response = await resolve(event);

    // Set the cookie
    response.headers.set(
        'set-cookie',
        event.locals.userPb.authStore.exportToCookie()
    );

    return response;
}
