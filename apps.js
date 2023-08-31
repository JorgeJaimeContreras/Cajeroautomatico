const user = document.getElementById("user");
const password = document.getElementById("password");
const tipoMovimiento = document.getElementById("tipoMovimiento");
const saldo = document.getElementById("saldo");
const monto = document.getElementById("monto")
const etiquetaAlerta = document.getElementById('alertaAcceso');
const etiquetaAlertaMovimiento = document.getElementById('alertaMovimiento');

// Establece el tiempo en milisegundos
const tiempo = 3000; // 3 segundos

let indice = -1;
let cuentas = [
    {
        nombre: 'Mali',
        password: 'Mali',
        saldo: 200,
    },
    {
        nombre: 'Gera',
        password: 'Gera',
        saldo: 290,
    },
    {
        nombre: 'Maui',
        password: 'Maui',
        saldo: 67,
    }
]

function validarAcceso(usuario, contrasena) {

    indice = cuentas.findIndex(elemento => elemento.nombre === usuario);
    // console.log(indice);
    // console.log(cuentas[indice].saldo);

    if (indice >= 0 && cuentas[indice].password === contrasena) {
        return indice;
    } else {
        return -1;
    }
}

btnLogin.addEventListener("click", (e) => {

    if (validarAcceso(user.value, password.value) >= 0) {
        user.value = "";
        password.value = "";

        document.getElementById("divlogin").style.display = "none";
        document.getElementById("movimientoCuenta").style.display = "block";
        document.getElementById("bienvenida").textContent = `Hola ${cuentas[indice].nombre} Bienvenido a su cajero automático`;
        saldo.textContent = `Saldo $ ${cuentas[indice].saldo}`;

    } else {
        user.value = "";
        password.value = "";
        etiquetaAlerta.textContent = "Credenciales Invalidas";

        // Crea el temporizador
        let temporizador = setTimeout(() => {
            // Borra el contenido de la etiqueta
            etiquetaAlerta.textContent = "";
        }, tiempo);
    };

})


btnConsultar.addEventListener("click", (e) => {
    btnDepositar.classList.add("disabled");
    btnRetirar.classList.add("disabled");
    tipoMovimiento.textContent = "Consulta de Saldo";

})

btnDepositar.addEventListener("click", (e) => {
    btnConsultar.classList.add("disabled");
    btnRetirar.classList.add("disabled");
    tipoMovimiento.textContent = "Deposito";
    registroMonto.style = "block";
    document.getElementById("monto").focus();

})

btnRetirar.addEventListener("click", (e) => {
    btnConsultar.classList.add("disabled");
    btnDepositar.classList.add("disabled");
    tipoMovimiento.textContent = "Retiro";
    registroMonto.style = "block";
    document.getElementById("monto").focus();



})

btnRegistrar.addEventListener("click", (e) => {
    btnConsultar.classList.remove("disabled");
    btnDepositar.classList.remove("disabled");
    btnRetirar.classList.remove("disabled");
    if (tipoMovimiento.textContent === "Deposito") {
        if (cuentas[indice].saldo + Number(monto.value) <= 990) {
            cuentas[indice].saldo += Number(monto.value);
            saldo.textContent = `Saldo $ ${cuentas[indice].saldo}`;
        } else {
            etiquetaAlertaMovimiento.textContent = "Tu cuenta no puede recibir mas de $990.00";
            // Crea el temporizador
            let temporizador = setTimeout(() => {
                // Borra el contenido de la etiqueta
                etiquetaAlertaMovimiento.textContent = "";
            }, tiempo);


        }
    } else if (tipoMovimiento.textContent === "Retiro") {
        if (cuentas[indice].saldo - Number(monto.value) >= 10) {
            cuentas[indice].saldo -= Number(monto.value);
            saldo.textContent = `Saldo $ ${cuentas[indice].saldo}`;
        } else {
            etiquetaAlertaMovimiento.textContent = "No puedes dejar tu cuenta con menos de $10.00";
            // Crea el temporizador
            let temporizador = setTimeout(() => {
                // Borra el contenido de la etiqueta
                etiquetaAlertaMovimiento.textContent = "";
            }, tiempo);

        }
    }
    monto.value = "";
    tipoMovimiento.textContent = "";
    document.getElementById("registroMonto").style.display = "none";

})


btnCerrar.addEventListener("click", (e) => {
    btnConsultar.classList.remove("disabled");
    btnDepositar.classList.remove("disabled");
    btnRetirar.classList.remove("disabled");
    tipoMovimiento.textContent = "***";
    document.getElementById("movimientoCuenta").style.display = "none";
    document.getElementById("divlogin").style.display = "block";
})

