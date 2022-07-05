<?php

$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$razonSocial = isset($_POST['razonSocial']) ? $_POST['razonSocial'] : '';
$rut = isset($_POST['rut']) ? $_POST['rut'] : '';
$tel = isset($_POST['tel']) ? $_POST['tel'] : '';
$direccion = isset($_POST['direccion']) ? $_POST['direccion'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$pass = isset($_POST['pass']) ? $_POST['pass'] : '';
$pass = hash('sha512', $pass);

try {

    $conex = new PDO("mysql:host=167.58.50.146;port=3306;dbname=distribuidoreswm", 'root', '');
    $conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    $verificarCorreo = $conex->query("SELECT * FROM usuarios WHERE email='$email'");
    $pdo = $conex->prepare("INSERT INTO usuarios(nombre,razonSocial,rut,telefono,direccion,email,pass) VALUES('$nombre','$razonSocial','$rut','$tel','$direccion','$email','$pass')");
    if($verificarCorreo->fetchColumn() > 0 ){
        echo json_encode('Ya existe un usuario registrado con ese correo');
        exit();
    }else{
        $pdo->execute() or die(print($pdo->errorInfo()));
        echo json_encode('Usuario registrado correctamente');
    };


} catch (PDOException $error) {

    echo $error->getMessage();
    die();
}
