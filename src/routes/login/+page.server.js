import {redirect} from '@sveltejs/kit';

export const actions = {
    login: async({ request, locals }) => {
        const loginFormData = await request.formData();
        const email = loginFormData.get('email') ?? '';
        const password = loginFormData.get('password')?.toString() ?? '';

        try {
            console.log('login: email, password', email, password);
            await locals.userPb.collection('users').authWithPassword(email, password);

            console.log('login: auth store', locals.userPb.authStore);
            console.log('login: isValid', locals.userPb.authStore.isValid);

            if (locals.userPb.authStore.isValid) {
                throw redirect(303, '/auth');
            }
        }
        finally {
            if (!locals.userPb.authStore.isValid) {
                return {
                    email,
                    error: true,
                    message: 'Unsuccessful login'
                }
            }
        }
    }
}