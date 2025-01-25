<script>
    export let form;
</script>

<div>
    <h1>Rajsavac admin login</h1>
    <form action="?/login" method="POST">
        <input type="email" name="email" id="email"/>
        <input type="password" name="password" id="password"/>
        <button type="submit">login</button>
    </form>
    <a href="/logout">Logout</a>
    {#if form?.notVerified}
        <h1>You need to verify email!</h1>
    {/if}
</div>

