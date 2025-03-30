<?php headerAdmin($data);

	include ("../database.php");
    $Objeto = new usuario();
	$lista = $Objeto->listar();

	/*CONSULTA
	CREATE VIEW VW_USUARIO AS
	SELECT id_usuario, id_unidad,nombres, apellidos,fecha_nacimiento, YEAR(CURDATE()) - YEAR(fecha_nacimiento) AS edad , telefono,cargo, sexo, email FROM usuario;
	*/

	/*if (isset($_POST["consulta_asistencias"])) {
	$cedula = $_POST["cedula"];
	$fecha_1 = $_POST["fecha_1"];
	$fecha_2 = $_POST["fecha_2"];
	$Cambiofecha_1 = date("d/m/Y", strtotime($fecha_1));
	$Cambiofecha_2 = date("d/m/Y", strtotime($fecha_2));
	
	$lista = $Objeto->consultaAsistencias($cedula, $fecha_1, $fecha_2);
}*/ 																	/*Esto es del T2 para acomodar la fecha*/
?>
	<div>
		<div><img src="../image/barrauptos.png" alt="Imagen"></div>
		<div class="title">
		<h2>Listado de Empleados</h2>
		</div>
		<div class="date">
		<div><h3>20-10-2024</h3></div>
		</div>
			<table class="table">
					<thead>
							<tr>
								<th>Cedula</th>  
								<th>Unidad</th>
								<th>Nombres</th>
								<th>Apellidos</th>
								<th>Fecha de Nacimiento</th>
								<th>Edad</th>
								<th>Telefono</th>
								<th>Cargo</th>
								<th>Sexo</th>
								<th>Email</th>
							</tr>
					</thead>
					<tbody>
					<?php	
					while($row = mysqli_fetch_assoc($lista))
						{
				?>	
						<tr>					
							<td><?php echo $row['id_usuario']; ?></td>
							<td><?php echo $row['id_unidad']; ?></td>
							<td><?php echo $row ['nombres']; ?></td>
							<td><?php echo $row['apellidos']; ?></td>
							<td><?php echo $row['fecha_nacimiento']; ?></td>
							<td><?php echo $row['edad']; ?></td>	
							<td><?php echo $row['telefono']; ?></td>	
							<td><?php echo $row['cargo']; ?></td>	
							<td><?php echo $row['sexo']; ?></td>	
							<td><?php echo $row['email']; ?></td>		
						</tr>
				<?php
					} //CIERRE DEL WHILE
				?>
			</tbody>
		</table>
	</div>
<?php footerAdmin($data) ?>

<?php 
		$CSS = file_get_contents('../estilos/report.css');
		$html = ob_get_clean();
    
		require_once '../librerias/vendor/autoload.php';

		$mpdf = new \Mpdf\Mpdf();
		$mpdf->WriteHTML($CSS,\Mpdf\HTMLParserMode::HEADER_CSS);
		$mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
		$mpdf->Output();
    
?>
