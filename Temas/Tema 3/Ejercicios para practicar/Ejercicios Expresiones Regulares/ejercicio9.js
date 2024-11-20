 "use strict";

//Selecciona un ejemplo entre los creados en el switch.
  function addExample (elem) {
 	var str = "";
 	var max = 5;
 	var min = 0;

 	switch (Math.floor(Math.random()*(max-min+1)+min)) {
 		case 0:
 			str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus nisl nec fringilla feugiat. Maecenas ut ex vulputate, gravida urna sit amet, elementum nibh. Integer vestibulum gravida ipsum, eget luctus lacus varius eu. Maecenas at lorem id metus pharetra venenatis. Cras porta, odio at sollicitudin commodo, ante turpis mattis mi, ac sollicitudin sapien nulla quis nunc. Mauris turpis mauris, porttitor ac vulputate vitae, hendrerit vel felis. Aenean placerat felis eu luctus pellentesque. Proin efficitur elit varius tortor posuere iaculis. Suspendisse potenti. Etiam metus mauris, sodales id elementum faucibus, cursus id neque. Vivamus eleifend convallis ipsum ut vulputate. Cras id arcu."; 			
 			break;
 		case 1:
 			str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut tellus urna. Aenean tempor egestas est, interdum consequat tellus efficitur at. Vestibulum volutpat efficitur mi tempor pharetra. Fusce ut condimentum quam. Donec non enim arcu. Nulla facilisi. Cras sed posuere orci. Aenean non porta ipsum. Nullam ut ullamcorper massa. Maecenas vitae magna velit. Nulla sollicitudin, augue ut faucibus egestas, odio nunc sodales est, sit amet venenatis nulla augue quis nulla. Maecenas vitae nulla in lectus mollis dignissim ut nec nunc. Donec eleifend suscipit lectus, eget fringilla odio dictum a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur non risus velit. Integer condimentum sem diam.";
 			break;
 		case 2:
 			str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet justo ac enim convallis euismod eu eu mi. Aliquam aliquam dolor neque, sed gravida neque porttitor in. Ut faucibus elit arcu, id finibus sem ullamcorper at. Fusce urna nisi, dapibus et mollis mattis, scelerisque at enim. Ut eget eros non ante facilisis congue. Sed mi nisl, auctor id nulla ac, accumsan maximus ipsum. Suspendisse iaculis nisi arcu, id bibendum magna sagittis ac. In in augue euismod, ornare urna vel, dignissim risus. Mauris ut odio quis augue molestie imperdiet. Vivamus consectetur ante et diam laoreet vestibulum. Integer ut neque sed mi mattis porta. Curabitur egestas enim id tortor viverra, nec fermentum metus semper. Quisque pharetra, ipsum id elementum volutpat, erat urna.";
 			break;
 		case 3:
 			str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, massa sodales malesuada euismod, justo sem condimentum felis, nec porta libero nisl at sem. Donec gravida ante non rutrum laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam vestibulum tincidunt arcu nec tempus. Praesent ante augue, sodales mattis nibh a, maximus viverra neque. Cras quis lacus lacinia, eleifend eros quis, euismod ligula. Ut elementum tellus felis, id molestie velit efficitur ac. Curabitur sem erat, vulputate non luctus ultrices, maximus sed neque. Quisque justo augue, tincidunt nec condimentum non, vestibulum sit amet lectus.\nProin ac dui ut leo vehicula viverra. Maecenas fermentum, magna vel dapibus maximus, magna eros tincidunt ipsum, ut consectetur dolor sem quis neque. Nullam vel congue urna. Vestibulum orci nulla, pellentesque eu.";
 			break;
 		case 4:
 			str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices lectus in erat fermentum, id viverra arcu ultrices. Cras nunc ante, consequat vitae arcu at, semper hendrerit sem. Phasellus id massa nec libero hendrerit euismod nec id ante. Donec scelerisque metus est. Curabitur luctus sollicitudin massa, sollicitudin accumsan lectus congue ut. Integer dignissim nisi sem, ut porta velit convallis quis. Integer ac finibus nulla, ut lacinia urna. Curabitur non mollis velit. Sed suscipit, ligula ut luctus rhoncus, mauris turpis ornare tortor, a dignissim tellus massa eget magna. Phasellus suscipit faucibus porta.\nMorbi eleifend varius lorem facilisis iaculis. Etiam ornare feugiat pulvinar. Etiam pulvinar metus ipsum, sed luctus metus bibendum mollis. Etiam mi neque, semper at finibus et, sagittis ac ligula. Etiam porttitor dui odio, at blandit mi sagittis a. Nunc tincidunt imperdiet varius. Ut mattis erat ut nisl aliquet pharetra.";
 			break; 			
 		default:
 			str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius nec tortor nec commodo. Nam non placerat sem. Curabitur tincidunt urna nec augue tempor aliquam. Duis congue, massa hendrerit ullamcorper iaculis, leo augue euismod eros, non dictum nibh justo vitae diam. Vestibulum sit amet ipsum nec tellus malesuada congue. Cras scelerisque efficitur justo, et condimentum mauris porttitor nec. Pellentesque vulputate sit amet arcu ac porta. Sed luctus sem risus, sodales bibendum felis suscipit vitae. Donec pretium feugiat mauris nec consequat. Aenean lacinia, odio quis tincidunt convallis, est mauris hendrerit dui, quis varius nunc velit nec turpis.\nUt dapibus interdum massa eu tempor. Pellentesque viverra mauris mattis nibh vulputate, ut faucibus libero tincidunt. Praesent eget felis nibh. Ut quis odio vulputate, vehicula metus a, sagittis magna. Vivamus in interdum orci, iaculis tempor leo. Praesent sed ligula ullamcorper, pellentesque massa nec, dictum arcu. Vivamus et sagittis arcu. Curabitur eget sollicitudin lectus. Donec.";
 	}
 	elem.value = str;
 }


 function validate () {
 	//Variable con el string del texto
 	var text = document.getElementById ("words").value;
 	//.match(/\b\w+\b/g);
 	var resultado = document.getElementById ("resultado"); 
 	var exp = /\b\w+\b/g; //Expresión que obtiene las palabras de un texto extrayendo espacios y símbolos de puntuación.
 	var word = exp.exec (text); //Método exec obtiene una coincidencia del patrón por cada ejecución retornándola.
 	delay (resultado, word, text, exp);
 }

//Función recursiva que obtienen una nueva palabra del texto y se vuelve a invocar cada 150 milisegundos.
function delay (tag, word, text, exp) {
	if (word !== null){ //Si no es null es que hemos obtenido una nueva coincidencia.
		tag.innerHTML = resultado.innerHTML + word +  " ";
		console.log ("Word: " + new Date () + " " + word);
		word = exp.exec (text); //Obtenemos una nueva coincidencia.
		setTimeout(delay, 150, tag, word, text, exp); //Ejecuta la función delay después de 150 milisegundos pasándole los parámetros restantes.	
	} else {
		rertun; //Si es null no hacemos nada.
	}
}