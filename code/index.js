window.onload = inicio;

function inicio() {
    verificarSesion();
    document.getElementById('buscar').addEventListener('keyup', listar);
    document.getElementById('logout').onclick = cerrarSesion;
    listar();
}

function listar() {

    vaciar();
    fetch('./apis/listar.php')
        .then(res => res.json())
        .then(datas => {

            datas.map(elem => {
                let busqueda = document.getElementById('buscar').value;
                if (elem.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1) {
                    if(container.innerHTML == ''){
                        container.setAttribute('style', '');
                        container.innerHTML = `
                            <div class="card text-center">
                                <img class="card-img-top" src="${elem.imagen}" alt="${elem.nombre}" style="object-fit:cover;height:100px;">
                                <div class="card-body">
                                    <h5 class="card-title">${elem.nombre}</h5>
                                    <span id="idProd" class="visually-hidden">${elem.id}</span>
                                    <span class="text-primary" style="font-weight:800;">$${elem.precio}</span>
                                    <p class="card-text" style="font-size:14px;">${elem.descripcion}</p>
                                </div>
                                <div class="card-footer">
                                    <button type="agregarCarrito button" class="btn btn-success">Agregar al Carrito</button>
                                </div>
                            </div>`;
                    }else{
                    container.setAttribute('style', '');
                    container.innerHTML += `
                        <div class="card text-center">
                            <img class="card-img-top" src="${elem.imagen}" alt="${elem.nombre}" style="object-fit:cover;height:100px;">
                            <div class="card-body">
                                <h5 class="card-title">${elem.nombre}</h5>
                                <span id="idProd" class="visually-hidden">${elem.id}</span>
                                <span class="text-primary" style="font-weight:800;">$${elem.precio}</span>
                                <p class="card-text" style="font-size:14px;">${elem.descripcion}</p>
                            </div>
                            <div class="card-footer">
                                <button type="agregarCarrito button" class="btn btn-success">Agregar al Carrito</button>
                            </div>
                        </div>`;
                    }
                }

            })
            if (container.innerHTML == '') {
                container.setAttribute('style', 'display:block;text-align:center;font-size:30px;vertical-align:middle;');
                container.innerHTML = 'No se encontraron productos para su busqueda...';
            }

        })
}
function verificarSesion() {
    let btnLogIn = document.getElementById('login');
    let btnSignUp = document.getElementById('signup');
    let btnLogOut = document.getElementById('logout');
    fetch('./apis/verifSesion.php')
        .then(res => res.json())
        .then(data => {
            if (data == 'true') {
                btnLogOut.classList.toggle('visually-hidden')
                btnLogIn.classList.toggle('visually-hidden')
                btnSignUp.classList.toggle('visually-hidden')
            }
        })
}
function cerrarSesion(){
if(confirm('¿Cerrar sesión?')){
    fetch('./apis/cerrarSesion.php')
    .then(res => res.json())
    .then(data => {
        if (data == 'sesion cerrada') {
            location.href = './index.html'
        }
    })
}
}
function vaciar(){
    let container = document.getElementById('gridCont');
    container.innerHTML = '';
}