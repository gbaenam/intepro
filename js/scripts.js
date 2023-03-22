// Captura de elementos principales.
const header = document.getElementById('main-header'),
	nav = document.getElementById('main-nav'),
	main = document.getElementById('main'),
	footer = document.getElementById('main-footer')


// Captura de elementos secundarios.
const burgerButton = document.querySelector('.burger-button'),
	burgerLine = document.querySelector('.burger-button__line'),
	iconMail = document.getElementById('contact-bar-mail'),
	socialBar = document.getElementById('social-bar'),
	socialBarWrapper = document.getElementById('social-bar-wrapper'),
	buttonBanner = document.getElementById('banner-button')


// Captura de elementos del formulario
const form = document.getElementById('form'),
	formContainer = document.getElementById('form-container'),
	formContHeight = document.querySelector('.form__container-height'),
	iconFormClose = document.getElementById('form-icon-close'),
	inputs = document.querySelectorAll('.input'),
	email = document.getElementById('email'),
	emailConfirm = document.getElementById('emailconfirm'),
	terms = document.getElementById('terms'),
	submitButton = document.getElementById('submit-button')


// Captura de elementos para la función cleanForm()
const iconFonts = document.querySelectorAll('.form__wrapper-input i'),
	messages = document.querySelectorAll('.form__box p')


// Captura elementos Modal confirmación envío mail de contacto.
const formModal = document.getElementById('form-modal'),
	formModalContent = document.getElementById('form-modal-content'),
	iconFormModal = document.querySelector('.form__modal-content i')


// Consulta de medios.
const mql = matchMedia('(min-width: 1024px)')


// Función hamburger button animation
function buttonAnimation() {
    burgerLine.classList.toggle('cruz')
    nav.classList.toggle('main-nav__move')
}
// Evento 'click' hamburger button animation.
burgerButton.addEventListener('click', buttonAnimation)


// Creación elemento 'h3' de socialBar.
const h3 = document.createElement('h3')
h3.textContent = '¡Síguenos en redes sociales!'
h3.classList.add('social-bar__title')
h3.id = 'bar-text'


// Función mover la Barra Social.
const moveSocialBar = () => {
    if (mql.matches) {
        footer.insertAdjacentElement('afterbegin', socialBar)
        socialBarWrapper.insertAdjacentElement('afterbegin', h3)
    } else if (socialBarWrapper.firstElementChild.id === 'bar-text') {
        socialBarWrapper.firstElementChild.remove()
        nav.insertAdjacentElement('beforeend', socialBar)
    }
}
// Ejecución de la función mover la Barra Social.
moveSocialBar()
// Evento 'change'
mql.addEventListener('change', moveSocialBar)


// Función Altura Elemento.
const elementHeight = () => {

    // Altura interna del viewport.
    const vh = innerHeight,

    // Leyendo y asignando la variable CSS '--height-header' con JavaScript.
    heightHeader = getComputedStyle(header).getPropertyValue('--height-header')


    if (mql.matches) {
		// Altura del NAV
        nav.style.height = 'auto'
		// padding-top formContainer
		formContHeight.style.paddingTop = '20px'

		if (vh <= formContHeight.clientHeight) {
			// padding-top formContainer
			formContainer.style.paddingTop = '20px'
			// padding-top formContainerHeight
			formContHeight.style.paddingTop = 0
		} else {
			// Calculando padding-top para formContainer
			formContainer.style.paddingTop =  `calc(${(vh-formContHeight.clientHeight)/2}px)`
		}

    } else {
        // Altura del NAV
        const navHeight = `height: calc(${vh/16}rem - ${heightHeader})`
        nav.setAttribute('style', navHeight)
		// padding-top formContainer
		formContainer.style.paddingTop = '50px'
		// padding-top formContainerHeight
		formContHeight.style.paddingTop = 0
    }
}
// Ejecución de la función Altura Elemento.
elementHeight()
// Evento 'resize' función Altura Elemento.
addEventListener('resize', elementHeight)




/* ================= BEGIN FORMULARIO =====================*/

// Objeto Expresiones Regulares.
const er = {
	erName: /^(([A-ZÁÉÍÓÚa-zñáéíóú])[\s]?)+$/,
	erEmail: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/,
	erTextArea: /^([\w]\s?)([\w\,\.\$\&\#\%\"\¡\!\¿\?\(\)\@\ñ\á\é\í\ó\ú]\s?)+$/
}



// Objeto validar entradas
const validateInputs = {
	name: false,
	email: false,
	emailconfirm: false,
	textarea: false
}



// Objeto mensajes de error.
const errorMessage = {
	nameError: 'Ingrese únicamente letras',
	emailError: 'Formato de correo inválido',
	emailConfirmError: 'Los correos no son iguales',
	textareaError: 'Máximo 300 caracteres; algunos caracteres especiales están restringidos'
}



// Función limpiar formulario
const cleanForm = () => {
	form.reset()
	submitButton.toggleAttribute('disabled', true)

	iconFonts.forEach(icon => {
		icon.style.color = '#646464'
	})

	messages.forEach(message => {
		message.innerText = ''
	})

	for (let validateInput in validateInputs) {
		validateInputs[validateInput] = false
	}
}
cleanForm()



// Función cerrar formulario
const closeForm = () => {
	if (nav.classList.contains('main-nav__move')) {
		burgerLine.classList.toggle('cruz')
		nav.classList.toggle('main-nav__move')
	}
	formContainer.classList.remove('form--show')
	setTimeout(() => form.style.visibility = 'hidden',1500)
}



// Función cerrar modal de confirmación
const closeModal = () => {
	formModalContent.classList.remove('form--modal-open')
	setTimeout(() => formModal.style.visibility = 'hidden',1000)
}



// Función abrir formulario
const openForm = e => {
    e.stopPropagation()
    form.style.visibility = 'visible'
	formContainer.classList.add('form--show')
}


// Función cerrar
const close = e => {
    e.stopPropagation()
    if (e.target === iconFormClose)  {
		cleanForm()
        closeForm()
    } else if (e.target === formModal || e.target === iconFormModal) {
		cleanForm()
		closeModal()
		closeForm()
	}
}

// Evento abrir formulario
iconMail.addEventListener('click', openForm)

// Evento abrir formulario
buttonBanner.addEventListener('click', openForm)

// Evento cerrar formulario
formContainer.addEventListener('click', close)

// Evento cerrar Modal de confirmación
formModal.addEventListener('click', close)



// Función validar formulario.
const validarFormulario = e => {

	// Nombre
	if (e.target.name === 'name') validarDatos(er.erName, e.target.value, e.target)

	// Email
	if (e.target.name === 'email') {
		validarDatos(er.erEmail, e.target.value, e.target)
		validarMail2()
	}

	// Confirm-Email
	if (e.target.name === 'emailconfirm') validarMail2()

	// Mensaje
	if (e.target.name === 'textarea') {
		if (e.target.value.trim().length <= 300) validarDatos(er.erTextArea, e.target.value, e.target)
		else changeState(false, e.target)
	}
}



// Función validar datos.
const validarDatos = (expression, valor, elemento) => {
	if (expression.test(valor)) changeState(true, elemento)
	else changeState(false, elemento)
}



// Función confirmar correo.
const validarMail2 = () => {
	if (email.value !== '') {
		if (email.value === emailConfirm.value) changeState(true, emailConfirm)
		else changeState(false, emailConfirm)
	} else changeState(false, emailConfirm)
}



// Función cambiar de estado.
const changeState = (condition, elemento) => {

	const formBox = elemento.parentElement.parentElement,
		icon = elemento.parentElement.querySelector('i'),
		label = formBox.querySelector('label'),
		message = formBox.querySelector('p')

	message.classList.add('form__error-message')

	if (condition) {
		message.innerText = ''
		icon.style.color = '#0099ff'
		message.style.marginBottom = 0
		validateInputs[elemento.name] = true
		label.style.marginBottom = '8px'
	} else {
		icon.style.color = '#cc0000'
		showError(elemento, message)
		label.style.marginBottom = '2px';
		validateInputs[elemento.name] = false
		message.style.marginBottom = '8px'
	}
	elementHeight()
	submitController()
}



// Función mostrar error.
const showError = (elemento, message) => {
	if (elemento.name === 'name') message.innerText = errorMessage.nameError

	else if (elemento.name === 'email') message.innerText = errorMessage.emailError

	else if (elemento.name === 'emailconfirm') {
		if (email.value !== '') message.innerText = errorMessage.emailConfirmError
	} else if (elemento.name === 'textarea') message.innerText = errorMessage.textareaError
}



// Función controlar botón de envío.
const submitController = () => {
	if (validateInputs.name && validateInputs.email && validateInputs.emailconfirm && validateInputs.textarea && terms.checked) {
		submitButton.toggleAttribute('disabled', false)
	} else submitButton.toggleAttribute('disabled', true)
}


// Evento click sobre Términos y Condiciones.
terms.addEventListener('click', submitController)


// Eventos keyup y blur sobre los inputs.
inputs.forEach(input => {
	input.addEventListener('keyup', validarFormulario)
	input.addEventListener('blur', validarFormulario)
})


// Función envío del formulario
async function handleSubmit(event) {
	event.preventDefault()
	const $form = new FormData(this)
	const response = await fetch(this.action, {
		method: this.method,
		body: $form,
		headers: {
			'Accept': 'application/json'
		}
	})

	if (response.ok) {
		formModal.style.visibility = 'visible'
		formModalContent.classList.add('form--modal-open')
	}
}

// Evento submit del formulario.
form.addEventListener('submit', handleSubmit)


