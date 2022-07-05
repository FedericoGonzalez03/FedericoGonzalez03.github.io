window.onload = inicio;

function inicio() {
    verificarSesion()
    document.getElementById('btn').onclick = registrar;
}

function registrar() {

    let razonSocial = document.getElementById('razonSocial').value;
    if(razonSocial == ''){
        document.getElementById('razonSocial').value = 'No aplica';
    }
    let form = document.getElementById('formId');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let formulario = new FormData(form);

        fetch('../../apis/registrar.php', { method: 'POST', body: formulario })
            .then(res => res.json())
            .then(data => {
                alert(data)
                location.href = './login.html';
            })
        })
}
function verificarSesion() {

    fetch('../../apis/verifSesion.php')
        .then(res => res.json())
        .then(data => {
            if (data == 'true') {
                alert('Ya hay una sesion iniciada')
                location.href = '../../index.html'
            }
        })
}