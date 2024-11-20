function testObjects(mc, title){
    console.log(`########## Inicio testeo: ${title} #############`);
    console.log("########## entidades #############");
    let a1 = new Fridge("Acme", "a1", 1250, "red");
    let a2 = new Television("Acme", "a2", 100, 60);
    let a3 = new Fridge("Acme", "a3", 2500, "white");
    let a4 = new Television("Acme", "a4", 500, 55);
    console.log(a1.toString());
    console.log(a2.toString());
    console.log(a3.toString());
    console.log(a4.toString());

    try {
        let a = new Appliance("Acme", "a1", 1250);
    } catch (error){
        console.error(error.toString());
    }

    console.log("########## insert #############");    
    mc.insert(a1, a4, a2).insert(a3);
    console.log(mc.toString());
    
    try {
        mc.insert(a1, a2, a3, a4);
    } catch (error) {
        console.log(error);
    }

    console.log("########## toString() #############");
    console.log("Ordenados por precio.");
    console.log(mc.toString((a, b) => a.price - b.price));

    console.log("########## filter() #############");
    console.log("Objetos Television");
    for (let tv of mc.filter((a) => (a instanceof Television))){
        console.log(tv.toString());
    }
    console.log("precio > 500");
    for (let tv of mc.filter((a) => (a.price > 500))){
        console.log(tv.toString());
    }

    console.log("########## Iterable #############");
    for (let appliance of mc){
        console.log(appliance.toString());
    }
    
    console.log("########## delete() #############");
    console.log("a1, a3");
    mc.delete(a1.id).delete(a3.id);
    console.log(mc.toString());

    try {
        mc.delete("11111111");
    } catch (error) {
        console.log(error);
    }

    try {
        mc.delete(a1.id);
    } catch (error) {
        console.log(error);
    }
}

function test(){
    testObjects(MaestreComponentesArray.getInstance(), 'Implementación con array');
    console.log('##################################################################')
    testObjects(MaestreComponentesMap.getInstance(), 'Implementación con map');
}

window.onload = test;