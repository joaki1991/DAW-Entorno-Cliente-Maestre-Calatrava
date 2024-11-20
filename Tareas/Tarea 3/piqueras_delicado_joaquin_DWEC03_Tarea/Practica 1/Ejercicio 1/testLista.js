"use strict";
// Vamos a crear una función que nos permita testear todas las funciones creadas:
function testList(){
    //Aquí creamos el tipo de datos lista, con el cual podremos testear nuestras funciones
    //Primero creamos la lista vacía
    let list = create();
    //Luego probamos las funciones de lista vacía, llena y tamaño de lsita:
	console.log("¿Está la lista vacía?: " + isEmpty(list));
    console.log("¿Está la lista llena?: " + isFull(list));
    console.log("Tamaño de nuestra lista: " + size(list));
     
    
    // Para comprobar que la función add funciona correctamente, podemos probar adicionando los siguientes libros
    try{
        add(list, book);
        add(list, book1);
        add(list, book3);//Si adicionamos el book2, nos mostrará el mensaje de error ya que a este le falta el título
        
        
       
            console.log("Tamaño de nuestra lista: " + add(list, book4))} 
        catch (err) {
            console.log(err);
        }   
    console.log(list);//Mostramos la lista para comprobar que han sido adicionados correctamente
    //Ahora voy a probar introduciendo un entero en lugar de un Book, para comprobar que salta el error
    try{
        add(list, 2);            
            console.log("Tamaño de nuestra lista: " + size(list))} 
        catch (err) {
            console.log(err);
        }
    //Ahora voy a probar introduciendo el book2 el cual carece de título y el ISBN es incorrecto, para comprobar que salta el error
    //Salta primero el error del formato del ISBN ya que es el primero que se lee
    try{
        add(list, book2);            
            console.log("Tamaño de nuestra lista: " + size(list))} 
        catch (err) {
            console.log(err);
        }          

     // Para comprobar que la función addAtt funciona correctamente, podemos probar adicionando el libro 5 en la posición 1
     try{
        addAtt(list, book5, 1);              
            console.log("Tamaño de nuestra lista: " + size(list))} 
        catch (err) {
            console.log(err);
        }   
    console.log(list);//Mostramos la lista para comprobar que el libro se ha añadido en la posición correctamente
    try{
        add(list, book);//Podemos probar a adicionar otro libro para comprobar que nos salte el error                   
            console.log("Tamaño de nuestra lista: " + size(list))} 
        catch (err) {
            console.log(err);
        }   
    console.log("El libro situado en la posición 3 de la lista es: ")
    console.log(get(list, 3));//Utilizamos la función get
    try{
    console.log(get(list, 7))}//Comprobamos que salte el error
    catch (err) {
        console.log(err);
    }       
    console.log("La lista de libros es: " + toString(list));//Probamos la función toString
    console.log("La primera posición del libro con ISBN '558-34-2344-536-2' es: " + indexOf(list, '558-34-2344-536-2'))//Ahora la función indexOf
    try{
        console.log("La primera posición del libro con ISBN '558-34-2344-536-2' es: " + indexOf(list, 2143))}//Comprobamos que salte el error
        catch (err) {
            console.log(err);
        }   
    //Ahora la función lastIndexOf, la cual no vamos a comprobar el error ya que es la misma excepción que la función anterior    
    console.log("La última posición del libro con ISBN '558-34-2344-536-2' es: " + lastIndexOf(list, '558-34-2344-536-2'))
    console.log("El número máximo de libros que se pueden almacenar en nuestra lista es de: " + capacity(list))//Utilizamos la función de capacidad
    clear(list);//Ahora borramos todos los elementos de la lista con la función clear()
    console.log("Tamaño de nuestra lista: " + size(list));//Podemos comprobar que se ha borrado todo conprobando el tamaño de la lista (=0)
    //Aprovechando que la lista está vacía, voy a comprobar los errores de las dos siguientes funciones
    try{
        console.log("El primer libro de la lista es : ");
        console.log(firstElement(list))} 
        catch (err) {
            console.log(err);
        } 
    try{
        console.log("El último libro de la lista es : ");
        console.log(lastElement(list))} 
        catch (err) {
            console.log(err);
        }                  
    //Para poder seguir trabajando con una lista de libros, volvemos a introducir 5 libros   
    try{
        add(list, book);
        add(list, book1);
        add(list, book3);
        add(list, book4);
        add(list, book5);
       
            console.log("Tamaño de nuestra lista: " + size(list))} 
        catch (err) {
            console.log(err);
        } 
    //Ahora probaremos que la función del primer y último elemento de la lista funcione correctamente   
    console.log("El primer libro de la lista es : ");  
    console.log(firstElement(list));
    console.log("El último libro de la lista es : ");
    console.log(lastElement(list));
    //A continuación comprobaremos la función de remove
    console.log (remove(list, 2));
    console.log("Tamaño de nuestra lista: " + size(list)); //llamamos a esta función para comprobar que se haya eliminado el elemento
    console.log(list);
    //También vamos a comprobar que se muestre el error de los límites de la lista
    try{       
        console.log (remove(list, 8))}         
        catch (err) {
            console.log(err);
        }
    //A continuación, comprobaremos la función de removeElement()     
    console.log ("¿Se ha borrado el libro?: " + removeElement(list, book));
    console.log("Tamaño de nuestra lista: " + size(list));//Comprobamos que realmente el libro ha sido eliminado
    console.log(list);// Y que realmente se ha eliminado el libro introducido
    //Ahora probaremos el error:
    try{       
        console.log ("¿Se ha borrado el libro?: " + removeElement(list, 'libro1'))}         
        catch (err) {
            console.log(err);
        }
    //Por último, vamos a probar la función set()
    console.log("Reemplazando libro...  El libro anterior era: ");  
    console.log(set(list, book, 2));
    //Y de nuevo comprobamos el error
    try{       
        console.log ("Reemplazando libro...  El libro anterior era: ");  
        console.log(set(list, 'libro2', 8));}         
        catch (err) {
            console.log(err);
        }   
}
window.onload = testList;