<?php
$fecha = new DateTime();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            font-family: 'Arial', sans-serif;
        }

        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .content {
            flex: 1;
        }

        .title-container, p {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        hr.styled {
            height: 2px;
            margin: 2rem;
           
        }

        table {
            max-width: 100%;
            overflow-x: auto;
            padding: 4rem;
            border: none;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin: 2rem;
        }

        td {
            border: 1px solid #c9c9c9;
            text-align: center;
        }

        th {
            background-color: rgb(179, 179, 179);
            border: 1px solid #c9c9c9;
            text-align: center;
        }

        footer {
            padding: 1rem;
            background-color: #f1f1f1;
            text-align: center;
        }
    </style>
</head>
<body>
    <header>
        <img src="<?= media() ?>/images/cintillo.jpg" alt="cerrar">
    </header>

    <div class="content">
        <div class="title-container">
            <h2>MEMORANDO INTERNO</h2>
            <h3><?= $data['datos'][0]['tema']; ?></h3>
        </div>
        
        <h4>DE:</h4>
        <h4>PARA:</h4>
        <h4>ASUNTO:</h4>
        <h4>FECHA: <span><?php echo $fecha->format('d/m/Y'); ?></span></h4> 
        
        <hr class="styled">

        <table>
            <thead>
                <tr>
                    <th>Tema</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Sexo</th>
                </tr>
            </thead>
            <tbody>
                <?php for ($i=0; $i < count($data['datos']); $i++) { ?>
                    <tr>
                        <td><?= $data['datos'][$i]['id_usuario']; ?></td>
                        <td><?= $data['datos'][$i]['nombres']; ?></td>
                        <td><?= $data['datos'][$i]['apellidos']; ?></td>
                        <td>
                            <?php 
                            if ($data['datos'][$i]['sexo'] === 'M') {
                                echo 'Masculino';
                            } elseif ($data['datos'][$i]['sexo'] === 'F') {
                                echo 'Femenino';
                            } else {
                                echo 'Otro'; // En caso de que haya un valor diferente a 'M' o 'F'
                            }
                            ?>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

    <footer>
        <hr class="styled">
        <p>Universidad Politécnica Territorial del Oeste de Sucre "Clodosbaldo Russián", Carretera Cumaná-Cumanacoa Km.4</p>
        <p>Tel: (0293) 4672136 / 467138 / 4672150 Fax (0293) 4672153</p>
        <p>Cumaná, Estado Sucre</p>
    </footer>
</body>
</html>
