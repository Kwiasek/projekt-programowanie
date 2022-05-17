var scroll = new SmoothScroll('a[href*="#"]', {
	speed: 500,
	speedAsDuration: true
});

let data = new Date;

let czas = data.getHours();

var dataHook = document.querySelector('#czas');
const hook = document.querySelector('#hook')


// Funkcja sprawdza czy w localStorage jest wpis 'imie', jeżeli tak wypisuje je w wyniku, jeżeli nie tworzy przycisk. Po kliknięciu przycisku wyskakuje prompt którego wartość zapisywana jest w localStorage.imie 
function imie(){
	var imie;
	if (!imie){
		if (window.localStorage){
			if (!window.localStorage.imie){
				var dodaj = document.createElement('button');
				hook.appendChild(dodaj);
				dodaj.textContent = 'Podaj imie';
				dodaj.addEventListener('click', function(){
					imie = prompt('Podaj imie');
					window.localStorage.setItem('imie', imie);
					dataHook.innerHTML += ', ' + window.localStorage.getItem('imie') + '!';
					hook.removeChild(dodaj);


				},false)
			}
			else {
				dataHook.innerHTML += ', ' + window.localStorage.getItem('imie') + '!'
			}
		}
		else {
			console.log("Błąd pamięci")
		}
	}
	else {
		hook.removeChild(dodaj)
		dataHook += ', ' + window.localStorage.getItem('imie') + '!'
	}
}

// Funkcja pobiera czas, sprawdza która jest godzina i printuje 'Dzień dobry' lub 'Dobry wieczór' zależnie od godziny 
function ustalCzas(){
	if (czas >= 6 && czas <= 19) {
		dataHook.innerHTML = 'Dzień dobry'
	}
	else {
		dataHook.innerHTML = 'Dobry wieczór'
	}
	showPage();
	imie();
	czcionka();
	pokazSlajdow();
	anim();
}


// Funkcja nasłuchuje element '<select>'. Po zmianie wartości funkcja przypisuje wartość do zmiennej :root zmieniając kolorystykę strony 
function zmienKolor(){
	var kolorSelect = document.querySelector('#kolor');
	var kolor = window.sessionStorage.getItem('kolor');
	if (sessionStorage){
		if (sessionStorage.kolor){
			if(kolorSelect.value == 'white'){
				kolor = '#2E5EAA'
			}
			else if(kolorSelect.value == 'black'){
				kolor = 'black'
			}
			else if(kolorSelect.value == 'red'){
				kolor = 'red'
			}
			else if(kolorSelect.value == 'green'){
				kolor = 'green'
			}
			else if(kolorSelect.value == 'yellow'){
				kolor = 'yellow'
			}
			else if(kolorSelect.value == 'blue'){
				kolor = 'blue'
			}
			window.sessionStorage.setItem('kolor', kolor)
		}
		else {
			window.sessionStorage.setItem('kolor', kolor)
		}
	}
	else {
		console.log('blad pamieci')
	}
	document.documentElement.style.setProperty('--clr-primary', kolor);
}

// Funkcja nasłuchuje zmiany w checkboxach i zmienia styl strony zależnie od zaznaczonego checkboxa 
function czcionka(){
	var czcionka = document.querySelector('#czcionka');
	czcionka.addEventListener('change', function(){
		if (czcionka[0].checked){
			document.body.style.fontWeight ='bold'
		}
		if (!czcionka[0].checked){
			document.body.style.fontWeight ='normal'
		}
		if (czcionka[1].checked){
			document.body.style.fontStyle = 'italic'
		}
		if (!czcionka[1].checked){
			document.body.style.fontStyle = 'normal'
		}
		if (czcionka[2].checked){
			document.body.style.textDecoration = 'line-through'
		}
		if (!czcionka[2].checked){
			document.body.style.textDecoration = 'none'
		}
	},false)
}

// Funkcja losuje wartosc z tablicy oraz zamienia ja w :root dokumentu 
function pokazSlajdow(){
	var images = ['url(img/background.jpg)', 'url(img/kontakt.jpg)', 'url(img/olscustoms.jpg)', 'url(img/pic1.jpg)', 'url(img/pic2.jpg)', 'url(img/pic3.jpg)', 'url(img/serwis.jpg)', 'url(img/stacja.jpg)']
	document.documentElement.style.setProperty('--header-img', images[parseInt(Math.random()*7)])
}
setInterval(pokazSlajdow, 2000);

// Funckja losuje lewy margines od krawędzi strony i przypisuje go samochodzikowi
function anim(){
	var car = document.querySelector('#car')
	var numer = Math.floor((Math.random()*800)+ 50);
	car.style.left = numer + 'px';
}
setInterval(anim, 30)

function showPage(){
	setTimeout(showPage, 3000)
}

function showPage(){
	document.querySelector('#loader').style.display = 'none';
	document.querySelector('#page').style.display = 'block';

}

document.querySelector('#oblicz').addEventListener('click', Oblicz, false);

// Funkcja po kliknięciu przycisku pobiera wartość z formularza, mnoży wartość oraz wyświetla ją w paragrafie o id wynik 
function Oblicz(){
	var x = document.querySelector('#obliczenie').value;
	var wynik = document.querySelector('#wynik');
	if (isNaN(x)){
		alert('To nie jest liczba')
	}
	else {
		wynik.innerHTML = x * x;
	}
}

window.addEventListener('load', ustalCzas, false);



