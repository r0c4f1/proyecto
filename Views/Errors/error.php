<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 Pagina no encontrada</title>
        <link rel="stylesheet" href="<?= media() ?>/css/plugins/bootstrap.min.css">
    </head>


    <body>
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Ooops!</span> Página no encontrada.</p>
                <p class="lead">
                    La página que estás buscando no existe.
                </p>
                <a href="<?= base_url() ?>" class="btn btn-primary">Inicio</a>
            </div>
        </div>
    </body>


</html>