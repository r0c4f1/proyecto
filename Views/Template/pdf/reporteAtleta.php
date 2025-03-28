<img src="<?= BASE_URL ?>/Assets/images/cintillo.jpg" alt="">

<h2><?= $nombre ?></h2>

<style>
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
    }

    th, td {
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #67000C; /* Color morado de Material Design */
      color: white;
      text-transform: uppercase;
      font-size: 12px;
    }

    td {
      border-bottom: 1px solid #e0e0e0;
      color: #424242;
      font-size: 12px;
    }
</style>

<table style="width: 100%;">
    <thead>
        <tr>
            <?php 
                for ($i=0; $i < count($campos); $i++) {
            ?>

                <th style="text-align: left;"><?= ucfirst(str_replace("_", " ", $campos[$i])) ?></th>
                
            <?php  
                }
            ?>
        </tr>
    </thead>
    <tbody>
        <?php          
        
        for ($i=0; $i < count($datos); $i++) { 
        
        ?>
            <tr>
                <?php 
                    for ($a=0; $a < count($campos); $a++) {
                ?>

                    <td style="text-align: left;"><?= $datos[$i][$campos[$a]] ?></td>

                <?php  
                    }
                ?>
            </tr>

        <?php } ?>
    </tbody>
</table>