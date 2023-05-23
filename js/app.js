const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');


//
document.addEventListener('DOMContentLoaded', () => {
    eventos();
    platillos();
});
// Function declaration
const eventos = () => {
    menu.addEventListener('click', abrirMenu);
}
const abrirMenu = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
}
const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    const body = document.querySelector('body');
    //El usuario ya no podrá generar más overlays
    if (document.querySelectorAll('pantalla-completa').length > 0) {
        return;
    }
    overlay.classList.add('pantalla-completa');
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    /*para evitar crear parráfos innecesarios
    while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5])
    }*/
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);
}
const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
        //Para que el botón cerrar solo se cree en el momento adecuado
        boton.remove();
    });
    //Quita el overlay al pulsar en cualquier parte de la pantalla  y activa el btn de  cerrar
    overlay.onclick = function () {
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}
//Desplegar imagenes de forma asincrona
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen => {
    observer.observe(imagen);
});

const platillos = () => {
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');
    platillos.forEach(platillo => platillosArreglo = [...platillosArreglo, platillo]);

    const ensaladas = platillosArreglo.filter(ensalada => ensalada.getAttribute('data-platillo') === 'ensalada');
    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'pasta');
    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo') === 'pizza');
    const postres = platillosArreglo.filter(postre => postre.getAttribute('data-platillo') === 'postre');

    mostrarPlatillos(ensaladas, pastas, pizzas, postres,platillosArreglo);
}
//Mostrarlo en el html al presionar cada categoría.
const mostrarPlatillos = (ensaladas, pastas, pizzas, postres,todos) => {
    btnEnsaladas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        ensaladas.forEach(ensalada => contenedorPlatillos.appendChild(ensalada))
    });
    btnPasta.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        pastas.forEach(pasta => contenedorPlatillos.appendChild(pasta))
    });
    btnPizza.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza => contenedorPlatillos.appendChild(pizza))
    });
    btnPostres.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        postres.forEach(postre => contenedorPlatillos.appendChild(postre))
    });
    btnTodos.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo => contenedorPlatillos.appendChild(todo))
    });
}
const limpiarHtml = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}
