import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
    if (!locals.userPb.authStore.token) throw redirect(303, '/login');

    const user = {
        firstname: locals.userPb.authStore.baseModel.firstname
    }

    return {
        user
    }
}
