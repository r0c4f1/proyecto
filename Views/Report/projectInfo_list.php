<?php
$data = [
    'datos' => $this->model->ReportProject($estadoP, $fecha1, $fecha2),
    'estadoP' => $estadoP !== 'x' ? $estadoP : null,
    'fecha1' => $fecha1 !== 'x' ? $fecha1 : null,
    'fecha2' => $fecha2 !== 'x' ? $fecha2 : null,
];

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
            margin: 1rem;
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
    <header class="cmt">
        <img src="<?= media() ?>/images/cintillo.jpg" alt="cerrar">
    </header>

    <div class="content">
    <div class="title-container">
        <h2>Informe Interno OTIC</h2>
        <h2>Proyectos<?php if (isset($data['estadoP']) && $data['estadoP'] !== 'x'): ?>
            <?= $data['estadoP']; ?>
        <?php endif; ?></h2>
        
        <?php if (isset($data['fecha1']) && $data['fecha1'] !== 'x'): ?>
            <h5>Desde: <?= $data['fecha1']; ?></h5>
        <?php endif; ?>
        <?php if (isset($data['fecha2']) && $data['fecha2'] !== 'x'): ?>
            <h5>Hasta: <?= $data['fecha2']; ?></h>
        <?php endif; ?>
    </div>
</div>


        
        
        <h4>FECHA: <span><?php echo $fecha->format('d/m/Y'); ?></span></h4> 
        
        <hr class="styled">

        <table>
            <thead>
            <tr>
    <th style="width: 15%;">Título</th>
    <th style="width: 20%;">Descripción</th>
    <th style="width: 13%;">F. Asignación</th>
    <th style="width: 13%;">F. Inicio</th> <!-- Asigna un ancho mayor a esta columna -->
    <th style="width: 13%;">F. Fin</th>
    <th style="width: 15%;">Asignado</th>
    <th style="width: 11%;">Estado</th>
</tr>

            </thead>
            <tbody>
                <?php for ($i=0; $i < count($data['datos']); $i++) { ?>
                <tr>
                    <td style="width: 15%;"><?= $data['datos'][$i]['nombre']; ?></td>
                    <td style="width: 20%;"><?= $data['datos'][$i]['descripcion']; ?></td>
                    <td style="width: 13%;"><?= $data['datos'][$i]['fecha_asignacion']; ?></td>
                    <td style="width: 13%;"><?= $data['datos'][$i]['fecha_asignacion']; ?></td>
                    <td style="width: 13%;"><?= $data['datos'][$i]['fecha_fin']; ?></td>
                    <td style="width: 15%;"><?= $data['datos'][$i]['nombre_equipo']; ?></td>
                    <td style="width: 11%; font-size:10px;"><?= $data['datos'][$i]['estado']; ?></td>


                  
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
