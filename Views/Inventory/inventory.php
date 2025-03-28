<?php headerAdmin($data);
sideBar();

include("database.php");
  $conexion = new Database();
  $ObjInventario = new Inventario();

  $nombre="";
  $cantidad="";
  $fecha_adquisicion="";
  $ubicacion="";
  $proveedor="";
  $estado="";

  if(isset($_POST["enviar"])){

	  $nombre=$_POST["nombre_item"];
	  $cantidad=$_POST["cantidad"];
	  $fecha_adquisicion=$_POST["fecha_adquisicion"];
	  $ubicacion=$_POST["ubicacion"];
	  $proveedor=$_POST["proveedor"];
	  $estado=$_POST["estado"];

	  $datos = $ObjInventario->agregar($nombre, $cantidad, $fecha_adquisicion, $ubicacion, $proveedor, $estado);
  }

?>

    <div class="main">
      <div class="header-wrap">
        <div class="header-title">
          <h2>Inventario</h2>
        </div>
        <div class="user-info">
          <div class="input-box">
            <input type="text" class="input-field" placeholder="Búsqueda" />
            <i><img src="icon/buscar.png" alt="búsqueda" /></i>
          </div>
          <div class="username"><h5>Natha Ferreira</h5></div>
        </div>
      </div>
<!--FOMRULARIO-->
	<div style="width: 800px; height:100px;">
		<form action="?" method="post" class="all-form">
			<label for="nombre_item">Nombre</label>
				<input type="text" name="nombre_item" require>
			<label for="cantidad">Cantidad</label>
				<input type="number" name="cantidad" require>
			<label for="fecha_adquisicion">Fecha Adquisicion</label>
				<input type="date" name="fecha_adquisicion" require>
			<label for="ubicacion">Ubicacion</label>
				<select name="ubicacion" id="ubicacion" require>
    				<option value="Almacen A">Almacen A</option>
    				<option value="Almacen B">Almacen B</option>
    				<option value="Almacen C">Almacen C</option>
				</select>
			<label for="proveedor">Proveedor</label>
				<input type="text" name="proveedor" require>
			<label for="estado">Estado</label>
				<select name="estado" id="estado" require>
					<option value=""></option>
    				<option value="Disponible">Disponible</option>
    				<option value="En Uso">En Uso</option>
				</select>
			<input type="submit" require name="enviar" value="Enviar">
		</form>
	</div>	 

    <div class="cont_table">
      <div class="add"><a href="#"><img src="icon/add.png" alt="icono"></a></div>

		<table id="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nombre</th> 
					<th>Cantidad</th> 
					<th>Fecha Adquisicion</th>
          			<th>Ubicacion</th>  
					<th>Proveedor</th>
					<th>Estado</th>	
					<th>Acciones</th>   
				</tr>
			</thead>
		<tbody>
			<?php  
        $Obj_Lista = new Inventario();
        $lista = $Obj_Lista->listar();
				while($row = mysqli_fetch_assoc($lista))
					{
				?>	
<!---DATOS DE LA TABLA--->
			<tr>					
				<td><?php echo $row['id_item']; ?></td>
				<td><?php echo $row['nombre_item']; ?></td>
				<td><?php echo $row['cantidad']; ?></td>
				<td><?php echo $row['fecha_adquisicion']; ?></td>
				<td><?php echo $row['ubicacion']; ?></td>
				<td><?php echo $row['proveedor']; ?></td>
        <td><?php echo $row['estado']; ?></td>
				<td>
			<div>
				<div>
        <a href="inventario.php?id=<?php echo $row['id_item']; ?>"><img src="icon/ocultar.png" alt="ocultar">
				</div>
				<a href="editar.php?ID=<?php echo $row['id_item']; ?>"><img src="icon/actualizar.png" alt="editar" id="icon">
				</a></div>
			</div>
				</td>
			</tr>
          <?php } //CIERRE DEL WHILE?>
			</tbody>
		</table>
	</div>

  <?php
		if (isset($_GET['id']))
		{
			$id = $_GET['id'];
			$ObjOcultar = new Inventario();
			$ObjOcultar->ocultar($id);
		}
	?>

    </div>
<?php footerAdmin($data) ?>
