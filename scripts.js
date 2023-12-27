// initial conditions
cps = 0; // coins per second
let totalcoins = 500;
document.getElementById('totalcoins').textContent = 'Total Coins: ' + Math.floor(totalcoins).toLocaleString() + 'c';

let totalanimals = 0;
let animalcapacity = 8;
document.getElementById('animalCapacity').textContent = 'Capacity: ' + totalanimals + '/' + animalcapacity;

let lvl = 1;
let landcost = 1000;
let totalbuildings = 0;
let buildingcapacity = 0;
document.getElementById('buildingCapacity').textContent = 'Capacity: ' + totalbuildings + '/' + buildingcapacity;

let builds = [
	{ name: 'lemonade', qty: 0, price: 1000, cps: 15},
	{ name: 'icecream', qty: 0, price: 12e3, cps: 50},
	{ name: 'gift', qty: 0, price: 70e3, cps: 100},
	{ name: 'diner', qty: 0, price: 150e3, cps: 200},
	{ name: 'bowling', qty: 0, price: 400e3, cps: 400},
	{ name: 'cinema', qty: 0, price: 1.2e6, cps: 1000},
	{ name: 'amusement', qty: 0, price: 3e6, cps: 3000},
	
];

let animals = [
	{ name: 'duck', qty: 0, price: 200, cps: 5},
	{ name: 'otter', qty: 0, price: 600, cps: 12},
	{ name: 'parrot', qty: 0, price: 1400, cps: 25},
	{ name: 'snake', qty: 0, price: 3500, cps: 40},
	{ name: 'dolphin', qty: 0, price: 6e3, cps: 80},
	{ name: 'buffalo', qty: 0, price: 10e3, cps: 120},
	{ name: 'toucan', qty: 0, price: 14e3, cps: 150},
	{ name: 'alligator', qty: 0, price: 20e3, cps: 250},
	{ name: 'lion', qty: 0, price: 45e3, cps: 400},
	{ name: 'squid', qty: 0, price: 60e3, cps: 500},
	{ name: 'moose', qty: 0, price: 80e3, cps: 600},
	{ name: 'turtle', qty: 0, price: 130e3, cps: 800},
	{ name: 'giraffe', qty: 0, price: 150e3, cps: 900},
	{ name: 'rhino', qty: 0, price: 250e3, cps: 1200},
	{ name: 'whale', qty: 0, price: 550e3, cps: 2000},
	{ name: 'tiger', qty: 0, price: 900e3, cps: 4000},
];


// update coins over time
let intervalId = setInterval(updatecoins, 1000);
function updatecoins() {
	totalcoins = totalcoins + cps;
	console.log('update');
	document.getElementById('totalcoins').textContent = 'Total Coins: ' + Math.floor(totalcoins).toLocaleString() + 'c';
}

// animals
function buyAnimal(animalName) {
	let animal = animals.find(a => a.name === animalName);
	let amt = animal.price;
	
	if (totalcoins >= amt && (totalanimals<animalcapacity)) {
		// update total coins
		totalcoins = totalcoins - amt; // subtract for buying one
		document.getElementById('totalcoins').textContent = 'Total Coins: ' + Math.floor(totalcoins).toLocaleString() + 'c';
		
		// update animal cost
		updateCostanimal(animal);
		document.getElementById(animal.name + 'p').textContent = animal.price.toLocaleString() + 'c';
		
		// update animal quantities
		animal.qty += 1;
		document.getElementById(animal.name + 'q').textContent = 'Qty: ' + animal.qty;
		totalanimals++;
		document.getElementById('animalCapacity').textContent = 'Capacity: ' + totalanimals + '/' + animalcapacity;
		
		// update cps
		cps = cps + animal.cps;
		updateAnimalcps(animal);
	} 
	else {
	return; }	
}

function updateCostanimal(animal) {
	let oldPrice = animal.price;
	let newPrice = Math.floor(oldPrice**1.02 * 1.5);
	animal.price = newPrice;
}

function updateAnimalcps(animal) {
	let oldcps = animal.cps;
	let newcps = oldcps*1.2;
	animal.cps = newcps;
}


// land
function expandland() {
	if (totalcoins >= landcost) {
		// update total coins
		totalcoins = totalcoins - landcost; // subtract for buying one
		document.getElementById('totalcoins').textContent = 'Total Coins: ' + Math.floor(totalcoins).toLocaleString() + 'c';

		// update land cost
		landcost = landcost*10;
		document.getElementById('landp').textContent = Math.floor(landcost).toLocaleString() + 'c';
		
		// update level
		lvl++;
		document.getElementById('landlvl').textContent = 'Level ' + lvl;

		// update capacities
		animalcapacity = animalcapacity + 8;
		buildingcapacity = buildingcapacity + 2;
		document.getElementById('animalCapacity').textContent = 'Capacity: ' + totalanimals + '/' + animalcapacity;
		document.getElementById('buildingCapacity').textContent = 'Capacity: ' + totalbuildings + '/' + buildingcapacity;

	} 
	else {
	return; }
}

// buildings
function buyBuilding(buildingName) {
	let build = builds.find(b => b.name === buildingName);
	let amt = build.price;
	
	if (totalcoins >= amt && (totalbuildings<buildingcapacity)) {
		// update total coins
		totalcoins = totalcoins - amt; // subtract for buying one
		document.getElementById('totalcoins').textContent = 'Total Coins: ' + Math.floor(totalcoins).toLocaleString() + 'c';
		
		// update building cost
		updateCostbuilding(build);
		document.getElementById(build.name + 'p').textContent = build.price.toLocaleString() + 'c';
		
		// update building quantities
		build.qty += 1;
		document.getElementById(build.name + 'q').textContent = 'Qty: ' + build.qty;
		totalbuildings++;
		document.getElementById('buildingCapacity').textContent = 'Capacity: ' + totalbuildings + '/' + buildingcapacity;
		
		// update cps
		cps = cps + build.cps;
		updateBuildingcps(build);
	} 
	else {
	return; }	
}

function updateCostbuilding(build) {
	let oldPrice = build.price;
	let newPrice = Math.floor(oldPrice**1.06 * 2);
	build.price = newPrice;
}

function updateBuildingcps(build) {
	let oldcps = build.cps;
	let newcps = oldcps*1.5;
	build.cps = newcps;
}
