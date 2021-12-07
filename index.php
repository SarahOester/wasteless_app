<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>WasteLess</title>
</head>

<body>
    <!-------------- Navigation -------------->
    <nav class="tabbar">
        <a class="nav-link" href="#/">Home</a>
        <a class="nav-link" href="#/products">Products</a>
        <a class="nav-link" href="#/create">Create</a>
        <a class="nav-link" href="#/profile">Profile</a>
        <a class="nav-link" href="#/login">Login</a>
    </nav>

    <main>
        <section>
            <!-------------- Sign Up -------------->
            <h2>Sign up for WasteLess Business</h2>
            <p><a href="#/login">Already a member?</a></p>
            <form action="backend.php" method="post">
                <input id="signup-bss-businessName" type="text" name="businessName" placeholder="Business Name">
                <input id="signup-bss-adress" type="text" name="adress" placeholder="Adress">
                <input id="signup-bss-zipcode" type="number" name="zipcode" placeholder="Zipcode">
                <input id="signup-bss-email" type="email" name="email" placeholder="E-mail">
                <input id="signup-bss-password" type="password" name="password" placeholder="Password">
                <input id="btn-signup" type="submit" value="Sign up for Business">
            </form>
        </section>
    </main>

    <script src="app.js"></script>
</body>

</html>