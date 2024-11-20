"use strict";
// Vamos a crear una función que nos permita testear todas las funciones creadas:
function testSet(){
    //Aquí creamos el tipo de datos conjunto, con el cual podremos testear nuestras funciones
    //Primero creamos la conjunto vacía
    let set = create();
    //Luego probamos las funciones de conjunto vacío y tamaño de conjunto:
	console.log("¿Está el conjunto vacío?: " + isEmpty(set));    
    console.log("Tamaño de nuestro conjunto: " + size(set));
     
    
    // Para comprobar que la función add funciona correctamente, podemos probar adicionando los siguientes libros
    try{
        add(set, book);
        add(set, book1);
        add(set, book3);//Si adicionamos el book2, nos mostrará el mensaje de error ya que a este le falta el título y el ISBN es incorrecto
        add(set, book4);              
        console.log("Tamaño de nuestro conjunto: " + add(set, book5))} 
        catch (err) {
            console.log(err);
        }   
    console.log(set);//Mostramos el conjunto para comprobar que han sido adicionados correctamente
    //Ahora voy a probar introduciendo un entero en lugar de un Book, para comprobar que salta el error
    try{
        add(set, 2);            
            console.log("Tamaño de nuestro conjunto: " + size(set))} 
        catch (err) {
            console.log(err);
        }       
    try{
        add(set, book);//Podemos probar a adicionar un libro ya introducido para comprobar que nos salte el nuevo error                   
            console.log("Tamaño de nuestro conjunto: " + size(set))} 
        catch (err) {
            console.log(err);
        }  
    try{
        add(set, book2);//Podemos probar a adicionar un libro con formato de ISBN diferente para comprobar que nos salte el error                   
            console.log("Tamaño de nuestro conjunto: " + size(set))} 
        catch (err) {
            console.log(err);
        }               
    console.log("El conjunto de libros es: " + toString(set));//Probamos la función toString
    console.log("¿El libro con ISBN '558-34-2344-536-2' está en el conjunto? " + has(set, '558-34-2344-536-2'))//Ahora la función has
    console.log("¿El libro con ISBN '558-34-2344-536-1' está en el conjunto? " + has(set, '558-34-2344-536-1'))//Verificamos si realmente encuentra o no el ISBN
    try{
        console.log("¿El libro 2143 está en el conjunto? " + has(set, 2143))}//Comprobamos que salte el error
        catch (err) {
            console.log(err);
        }       
    clear(set);//Ahora borramos todos los elementos del conjunto con la función clear()
    console.log("Tamaño de nuestro conjunto: " + size(set));//Podemos comprobar que se ha borrado todo conprobando el tamaño del conjunto (=0)
    
    //Para poder seguir trabajando con una conjunto de libros, volvemos a introducir 5 libros   
    try{
        add(set, book);
        add(set, book1);
        add(set, book3);
        add(set, book4);              
        console.log("Tamaño de nuestro conjunto: " + add(set, book5))} 
        catch (err) {
            console.log(err);
        }         
    //A continuación, comprobaremos la función de remove()     
    console.log ("¿Se ha borrado el libro?: " + remove(set, '558-34-2344-536-2'));
    console.log("Tamaño de nuestro conjunto: " + size(set));//Comprobamos que realmente el libro ha sido eliminado
    console.log(set);// Y que realmente se ha eliminado el libro introducido
    //Ahora probaremos el error:
    try{       
        console.log ("¿Se ha borrado el libro?: " + remove(set, 'libro1'))}         
        catch (err) {
            console.log(err);
        }                 
}
window.onload = testSet;