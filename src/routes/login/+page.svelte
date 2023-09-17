<script>
    export let form;

    let thisForm, showPassword = false, email;

    $: { if (email && form?.error) email.focus() }

    function handleShowPassword(event) {
        showPassword = !showPassword;
        setTimeout(() => event.target.checked = showPassword, 0);
    }
</script>

<div class="container">
    <article>
        <form bind:this={thisForm} method="post" action="?/login">
            <div>
                <label for="email" required><b>Email</b></label>
                <input
                    bind:this={email}
                    class:fieldError={form?.error}
                    value={form?.email ?? ''}
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    required
                />

                <label for="switch">
                    <input type="checkbox" id="switch" role="switch" on:click|preventDefault={handleShowPassword}>
                    Show Password
                </label>

                <input type={showPassword? 'text' : 'password'} id="password" name="password" placeholder="Enter Pasword" required />


                <button class="btn primary" type="submit">Login</button>
                <label>
                    <input role="switch" type="checkbox" checked name="remember" /> Remember
                    me
                </label>
            </div>

            <div style="background-color:#f1f1f1">
                <button class="btn secondary" type="button">Cancel</button>
                <a href="/forgotPassword"><small>>Forgot Password?</small></a>
            </div>
        </form>
    </article>
</div>
