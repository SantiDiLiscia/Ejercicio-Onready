class Vehiculo { 
  constructor(marca, modelo, precio){
    this.marca = marca;
    this.modelo = modelo;
    this._precio = precio;
  }

  get precio() { 
    // formatea el precio
    let precioFormateado = new Intl.NumberFormat('es-AR', {
      style: "currency", 
      currency: "ARS",
      currencyDisplay: "symbol",
      useGrouping: true
    }).format(this._precio)

    return precioFormateado
  }
  
  //  defino lo que sucede cuando JS requiera pasar una instancia a string
  //  sirve para el metodo de la concesionaria que lista todos los vehiculos entre otros
  toString() {
    let arr = [];
    for(let propiedad of this) {
      let titulo = propiedad[0].toUpperCase() + propiedad.slice(1)
      arr.push(`${titulo}: ${this[propiedad]} `)
    }
    return arr.join(' // ') 
  }

}

class Auto extends Vehiculo {
  constructor(marca, modelo, puertas, precio){
    super(marca, modelo, precio);
    this.puertas = puertas;
  }

  // para determinar el orden de la iteracion en los for/of y ... spread operator
  // me sirve para loggear los datos tal cual lo pide el ejercicio
  *[Symbol.iterator](){
    yield 'marca'
    yield 'modelo'
    yield 'puertas'
    yield 'precio'
  }
}

class Moto extends Vehiculo{
  constructor(marca, modelo, cilindrada, precio){
    super(marca, modelo, precio);
    this.cilindrada = cilindrada;
  }

  *[Symbol.iterator](){
    yield 'marca'
    yield 'modelo'
    yield 'cilindrada'
    yield 'precio'
  }
}

class Concesionaria {
  // puedo agregar vehiculos tanto en la creacion de una instancia
  // o luego con el metodo .agregarVehiculo()
  constructor(...vehiculos){
    this.vehiculos = [...vehiculos]
  }
  
  agregarVehiculo(vehiculo){
    this.vehiculos.push(vehiculo)
  }

  listarVehiculos(){
    let lista = [];
    this.vehiculos.forEach(vehiculo => {
      lista.push(vehiculo.toString())
    })
    return lista.join('\n')
  }

  vehiculoMasCaro(){
    const elMasCaro = this.vehiculos.reduce((x,y) => (x._precio > y._precio) ? x : y)
    return `Vehiculo más caro: ${elMasCaro.marca} ${elMasCaro.modelo}`
  }

  vehiculoMasBarato(){
    const elMasBarato = this.vehiculos.reduce((x,y) => (x._precio < y._precio) ? x : y)
    return `Vehiculo más barato: ${elMasBarato.marca} ${elMasBarato.modelo}`
  }

  modeloIncluyeLetra(letra){
    let expresion = new RegExp(letra)
    let resultado = this.vehiculos.filter(vehiculo => expresion.test(vehiculo.modelo))
    if(resultado.length === 0){
      return `No hay vehiculos con modelos con ${letra}`
    }else if(resultado.length > 1){
      return `Vehículos que contiene en el modelo la letra ${letra}:\n${resultado.join('\n')}`
    }else{
      let {marca, modelo, precio} = resultado[0]
      return `Vehículo que contiene en el modelo la letra ${letra}: ${marca} ${modelo} ${precio}`
    }
  }

  ordenadosPorPrecio(){
    let resultado = this.vehiculos.sort((x,y) => y._precio - x._precio)
    return resultado.join('\n')
  }

  listarTodo(){
    return (
    `${this.listarVehiculos()}
=============================
${this.vehiculoMasCaro()}
${this.vehiculoMasBarato()}
${this.modeloIncluyeLetra('Y')}
=============================
${this.ordenadosPorPrecio()}
    `)
  }
}

//  Marca: Peugeot // Modelo: 206 // Puertas: 4 // Precio: $200.000,00
let vehiculo1 = new Auto('Peugeot', '206', 4, 200000)
//  Marca: Honda // Modelo: Titan // Cilindrada: 125c // Precio: $60.000,00
let vehiculo2 = new Moto('Honda', 'Titan', '125c', 200000)
//  Marca: Peugeot // Modelo: 208 // Puertas: 5 // Precio: $250.000,00
let vehiculo3 = new Auto('Peugeot', '208', 5, 250000)
//  Marca: Yamaha // Modelo: YBR // Cilindrada: 160c // Precio: $80.500,50
let vehiculo4 = new Moto('Yamaha', 'YBR', '160c', 80500.50)

let concesionaria = new Concesionaria(vehiculo1, vehiculo2, vehiculo3, vehiculo4)

//  console.log(concesionaria.listarVehiculos())
//  console.log(concesionaria.vehiculoMasCaro())
//  console.log(concesionaria.vehiculoMasBarato())
//  console.log(concesionaria.modeloIncluyeLetra('Y'))
console.log(concesionaria.listarTodo())
