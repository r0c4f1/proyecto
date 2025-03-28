<script src="<?= media() ?>/js/plugins/bootstrap.bundle.min.js"></script>
<script src="<?= media() ?>/js/plugins/all.min.js"></script>
<!-- <script src="<?= media() ?>/js/plugins/color-modes.js"></script> -->
<script src="<?= media() ?>/js/plugins/datatables/datatables.min.js"></script>
<script src="<?= media() ?>/js/plugins/sweetalert2.js"></script>
<script src="<?= media() ?>/js/plugins/chart.js"></script>
<script src="<?= media() ?>/js/plugins/validator.min.js"></script>

<!-- <script src="<?= media() ?>/js/plugins/select2.min.js"></script> -->


<script>
const userId = "<?= count($_SESSION) == "0" ? "0" : $_SESSION["id_usuario"]; ?>";
const unidad = "<?= count($_SESSION) == "0" ? "0" : $_SESSION["id_unidad"]; ?>";
const userLevel = "<?= count($_SESSION) == "0" ? "0" : $_SESSION["nivel"]; ?>";
const base_url = "<?= base_url(); ?>";
</script>
<script src="<?= media() ?>/js/<?= $data['page_functions'] ?>"></script>
</body>

</html>