<?php headerAdmin($data) ?>

<div class="wrapper">

    <nav class="nav">
        <div class="nav-logo">
            <img src="<?= media() ?>/images/1630588198601.png" alt="logo" />
        </div>
        <div class="cintillo"></div>
        
    </nav>

    <main class="container">
           
        <!-------------Formulario inicio sesion----------->
        <section class="login-container " id="login">
        <h2 class="title ">Sistema de Gestión Técnico-Operativo</h2> 
            <div class="top">
                <p>Iniciar Sesión</p>
            </div>
            <form action="" class="d-flex justify-content-center flex-column" id="formLogin">
                <div class="input-box col-9">
                    <input type="number" class="input-field" placeholder="Cédula" name="cedula" id="cedula" />
                    <i><img src="<?= media() ?>/icon/usuario.png" alt="nombre"></i>
                </div>

                <div class="input-box input-container col-9">
                    <input type="password" class="input-field" placeholder="Clave" name="clave" id="claveInput"
                        autocomplete="new-password" maxlength="12" minlength="4" />
                    <i><img src="<?= media() ?>/icon/llave.png" alt="llave"></i>
                    <button type="button" id="visible" class="toggle-password" onclick="changeType()">
                        <i class="fa-solid fa-eye-slash"></i>
                    </button>
                    <button type="button" id="invisible" class="toggle-password visually-hidden" onclick="changeType()">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>

                <div class="input-box col-9">
                    <button type="submit" class="submit">Iniciar Sesión</button>
                </div>

            </form>
        </section>

    </main>
</div>

<?php footerAdmin($data) ?>