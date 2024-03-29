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
	socialBarWrapper = document.getElementById('social-bar-wrapper')


// Captura de elementos del formulario
const form = document.getElementById('form'),
	formContainer = document.getElementById('form-container'),
	formContHeight = document.querySelector('.form__container-height'),
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
	formModalContent = document.getElementById('form-modal-content')


// Creando consulta de medios para ancho mínimo de 1024px
const mql1024 = matchMedia('(min-width: 1024px)')

// Creando consulta de medios para ancho mínimo de 1600px
const mql1600 = matchMedia('(min-width: 1600px)')



//  Función Animación botón hamburguesa y NAV
const animation = e => {
	e.stopPropagation
	burgerLine.classList.toggle('cruz')
    nav.classList.toggle('main-nav__move')
}

// Evento Animación botón hamburguesa y NAV
burgerButton.addEventListener('click', animation)


// Evento captura de los enlaces del NAV.
const menuLinks = document.querySelectorAll('.main-nav__menu a[href^="#"]')
menuLinks.forEach(menuLink => {
	menuLink.addEventListener('click', e => {
		if (nav.classList.contains('main-nav__move')) setTimeout(() => animation(e),600)
	})
})


// Evento Animación botón hamburguesa y NAV
// document.querySelector('.main-nav__menu').addEventListener('click', e => {
// 	if (nav.classList.contains('main-nav__move')) setTimeout(() => animation(e),600)
// })

// document.querySelector('.main-nav__menu').addEventListener('click', e => {
// 	if (nav.classList.contains('main-nav__move')) animation(e)
// })


// Creación elemento 'h3' de socialBar.
const h3 = document.createElement('h3')
h3.textContent = '¡Síguenos en redes sociales!'
h3.classList.add('social-bar__title')
h3.id = 'bar-text'



// Función mover la Barra Social.
const moveSocialBar = () => {
    if (mql1024.matches) {
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
mql1024.addEventListener('change', moveSocialBar)



// Función ajustar altura del NAV
const navHeight = () => {
	const heightHeader = getComputedStyle(header).getPropertyValue('--height-header')
	if (mql1024.matches) nav.style.height = 'auto'
	else nav.style.height = `calc(${innerHeight/16}rem - ${heightHeader})`
}
navHeight()
addEventListener('resize', navHeight)



// Captura de Cards Modal
const cardsModal = document.querySelector('.cards__modal')

// Función mostrar Cards Modal.
const showCardsModal = () => setTimeout(() => document.querySelector('.cards__template-content').style.transform = 'scale(1)',300)


// Función cerrar Cards Modal
const closeCardsModal = () => {

	document.querySelector('.cards__template-content').style.transform = 'scale(0)'

	setTimeout(() => {
		cardsModal.style.opacity = '0'
		cardsModal.style.visibility = 'hidden'
		document.querySelector('.cards__template-content').remove()
	},1500)
}

// Evento abrir Cards Modal.
document.querySelector('.cards__articles').addEventListener('click', e => {
	e.stopPropagation()
	if (e.target.id) {
		cardsModal.style.opacity = '1'
		cardsModal.style.visibility = 'visible'
	}

	switch (e.target.id) {
        case 'cards-budget':
            cardsModal.appendChild(document.getElementById('cards-template1').content.cloneNode(true))
			showCardsModal()
        break;

        case 'cards-credit':
            cardsModal.appendChild(document.getElementById('cards-template2').content.cloneNode(true))
			showCardsModal()
        break;

        case 'cards-certificate':
            cardsModal.appendChild(document.getElementById('cards-template3').content.cloneNode(true))
			showCardsModal()
        break;
    }
})

// Evento cerrar Cards Modal / Abrir formulario.
cardsModal.addEventListener('click', e => {
	e.stopPropagation()
	if (e.target.classList.contains('cards__template-button')) openForm(e)
	else if (e.target.classList.contains('cards__modal') || e.target.classList.contains('cards__template-close')) closeCardsModal()
})


// Evento apertura de formulario para "cards__footer-button"
document.querySelector('.cards__footer').addEventListener('click', e => {
	if (e.target.classList.contains('cards__footer-button')) openForm(e)
})



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



// Función ajustar altura del formulario
const formHeight = () => {
	if (innerHeight > formContHeight.clientHeight) {
		formContainer.style.padding = `calc(${(innerHeight-formContHeight.clientHeight)/2}px) 0 0`
	} else formContainer.style.padding = '1.5625rem 0'
}
formHeight()
addEventListener('resize', formHeight)



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

	formContainer.classList.remove('form--show')

	// if (nav.classList.contains('main-nav__move')) animation()

	// Todo: Corregir este código llamando únicamente a la función animation()
	if (nav.classList.contains('main-nav__move')) {
		burgerLine.classList.toggle('cruz')
		nav.classList.toggle('main-nav__move')
	}

	setTimeout(() => {
		form.style.opacity = 0
		form.style.visibility = 'hidden'
	},1000)
}



// Función cerrar modal de confirmación
const closeModal = () => {
	setTimeout(() => {
		formModal.style.opacity = 0
		formModal.style.visibility = 'hidden'
	},1000)

	formModalContent.classList.remove('form--modal-open')
}



// Función abrir formulario
const openForm = e => {
    e.stopPropagation()
	form.style.opacity = 1
	form.style.visibility = 'visible'
	formContainer.classList.add('form--show')
}


// Función cerrar
const close =  e => {
	e.stopPropagation()
	const elementVisibility = getComputedStyle(formModal).getPropertyValue('visibility')

	if (e.target.classList.contains('form__icon-close') || e.target === formModal || e.target.classList.contains('form__modal-close')) {
		cleanForm()
		closeForm()

		if (elementVisibility === 'visible') {
			closeModal()
			if (document.querySelector('.cards__template-content') !== null) closeCardsModal()
		}
	}
}



// Evento abrir formulario
iconMail.addEventListener('click', openForm)

// Evento cerrar formulario
document.querySelector('.form__icon-close').addEventListener('click', close)

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
	formHeight()
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
		formModal.style.opacity = 1
		formModal.style.visibility = 'visible'
		formModalContent.classList.add('form--modal-open')
	}
}

// Evento submit del formulario.
form.addEventListener('submit', handleSubmit)


