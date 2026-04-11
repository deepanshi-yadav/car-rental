const vehicles = [
  { id: 1, name: 'Honda Activa 125', type: 'Bike', price: 200 },
  { id: 2, name: 'Maruti Swift', type: 'Car', price: 800 },
];

exports.getVehicles = (req, res) => {
  res.json(vehicles);
};
