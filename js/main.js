const tarjeta=document.querySelector('#tarjeta');

const btnAbrirFormulario=document.getElementById('bt-abrir-formulario');
const formulario=document.getElementById('formulario-tarjeta');

const numeroTargeta=document.querySelector('#tarjeta .numero')//etiqueta p de la tarjeta delantera q contiene #########
const nombreTargeta=document.querySelector('#tarjeta .nombre')//etiqueta p de la terjeta delantera q tiene nombre de tarjeta
const logoMarca=document.querySelector('#tarjeta .logo-marca')
console.log(logoMarca)

// cuando el usuario escribe en  un input como el nuemor de tarjeta o el nombre se de vuelta donde esta esa informacion
// osea la ponemos de frente
const mostrarFrenteTarjeta=()=>
{
    // si la tergeta tiene active entonces esta dada vuelta entonces ponemos esta funcion cuando escribimos en el input
    // para sacarle el active y se de veulta y muestre el frente de la tergeta pero si se encuentra en el frente no hace nada
    if(tarjeta.classList.contains('active'))
    {
        tarjeta.classList.remove('active')
    }
}
const mostrarTraseraTarjeta=()=>
{
    // si la tergeta tiene active entonces esta dada vuelta entonces ponemos esta funcion cuando escribimos en el input
    // para sacarle el active y se de veulta y muestre el frente de la tergeta pero si se encuentra en el frente no hace nada
    if(!tarjeta.classList.contains('active'))
    {
        tarjeta.classList.add('active')
    }
}


// rotacion de la targeta
tarjeta.addEventListener('click',()=>
{
    tarjeta.classList.toggle('active');
    
})

// abrir formulario
btnAbrirFormulario.addEventListener('click',(e)=>
{
    btnAbrirFormulario.classList.toggle('active')
    formulario.classList.toggle('active')
})


// rellenar el select del mes
for (let i=1;i<=12;i++ ) 
{
    const fragment=document.createDocumentFragment();
    const option=document.createElement('option')
    option.value=i;
    option.textContent=i;
    fragment.appendChild(option)
    // no hace falta declarar una variable para capturar el lect solo accedemos al id del formulario y como el select es el hijo
    // accedemos atraves del punto y el id del selct
    formulario.selecMes.appendChild(fragment)
}

// SELECT DEL AÑO
const añoActual=new Date().getFullYear();//guardamos el año dentro de esta variable

// le decimos que vayadel año actual hasta 8 años en adelante
for (let i=añoActual;i<= añoActual + 8;i++ ) 
{
    const fragment=document.createDocumentFragment();
    const option=document.createElement('option')
    option.value=i;
    option.textContent=i;
    fragment.appendChild(option)
    formulario.selecAño.appendChild(fragment)
}
    

// ----------LO Q ESCRIBIMOS EN EL FORMULARIO LOS IMPRIMIMOS EN LA TERJETA--------------------------
// INPUT NUMERO DE TARJETA
formulario.inputNumero.addEventListener('keyup',(e)=>
{

    let valorInput=e.target.value;
      
    // en el replace cada ves que encuentra un esapcidado en el input /\s/g lo remplazamos por un espacio en blanco
    formulario.inputNumero.value=valorInput.replace(/\s/g,'')
    // /\D/ busca todos los digitos menos los numeros y lo remplazamos por nada
    .replace(/\D/g,'')
     // /([0-9]{4})/g agrupamos todos los numeros y  le decimos q cada 4 numeros lo remplace por un espacio para que cada
    // 4 numeros no me remplace por nada y se borre dentro de las comilaas ponemos '$1 ' despues del $1 agregamos el espacio
    .replace(/([0-9]{4})/g,'$1 ')
    .trim()//elimina el ultimo espaciado

    numeroTargeta.textContent=valorInput;
    if(formulario.inputNumero.value=='')//si borramos el input que ponga los numerales por defecto
    {
        numeroTargeta.textContent='#### #### #### ####';
        logoMarca.innerHTML='';
    }
    
    // console.log(formulario.inputNumero.value[0])
    if(formulario.inputNumero.value[0]==4)//si la primero digito es un 4 ponemos la imgen de visa
    {
        logoMarca.innerHTML='';//para que no se repita cadaves que escribimos el numero 4
        const img=document.createElement('img');
        img.src='img/logos/visa.png';
        logoMarca.appendChild(img)
    }
    if(formulario.inputNumero.value[0]==5)//si la primero digito es un 4 ponemos la imgen de visa
    {
        logoMarca.innerHTML='';//para que no se repita cadaves que escribimos el numero 4
        const img=document.createElement('img');
        img.src='img/logos/mastercard.png';
        logoMarca.appendChild(img)
    }

    mostrarFrenteTarjeta()

})

// PONER EL NOMBRE EN LA TERGETA
formulario.inputNombre.addEventListener('keyup',(e)=>{
    const nombreInput=e.target.value;
    const nombreDeTargeta=document.getElementById('nombre').children[1];
    if(nombreInput){
        nombreDeTargeta.textContent=nombreInput
    }
    if(!nombreInput)nombreTargeta.textContent='Jhon Doe'
    mostrarFrenteTarjeta();
})

// PONER EL AÑO EN LA TARJETA
formulario.selecAño.addEventListener('change',()=>{
    mostrarFrenteTarjeta();
    const ElementSpanAño=document.getElementById('año');
    const año=formulario.selecAño.value;
    año!=='' ? ElementSpanAño.textContent=año : ElementSpanAño.textContent='AA'; 
})

// PONER MES EN LA TARJETA
formulario.selecMes.addEventListener('change',()=>{
    mostrarFrenteTarjeta();
    const ElementSpanMes=document.getElementById('mes');
    const mes =formulario.selecMes.value;
    mes!=='' ? ElementSpanMes.textContent=mes : ElementSpanMes.textContent='AA'; 
})

// PASAR EL CVV A LA TARJETA
formulario.inputCCV.addEventListener('keyup',(e)=>{
    mostrarTraseraTarjeta()
    const ElelemntoCvvParrafo=document.getElementById('parafoCvv')
    const ElementoCvvInput=e.target.value;
    formulario.inputCCV.value=ElementoCvvInput.replace(/\s/g,'')

    if(ElementoCvvInput.split('').length > 3) 
    {
        //enc aso de superar mas de tres digitos guardamos lo que venia digitando
        //y se lo ponemos  remplazando en el replace
        const ultimoValor=ElementoCvvInput
        formulario.inputCCV.value=ElementoCvvInput.replace(/([0-9]{3,3})/g,ultimoValor)
    }

    ElementoCvvInput!==''
        ?
            ElelemntoCvvParrafo.textContent=ElementoCvvInput 
        : 
            ElelemntoCvvParrafo.textContent='';
})
