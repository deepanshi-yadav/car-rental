const plans = [
  { _id: '1', name: '1 Day', days: 1, multiplier: 1 },
  { _id: '3', name: '3 Days', days: 3, multiplier: 2.8 },
  { _id: '7', name: '7 Days', days: 7, multiplier: 6.5 },
  { _id: '15', name: '15 Days', days: 15, multiplier: 13 },
  { _id: '30', name: '1 Month', days: 30, multiplier: 25 }
];

exports.getPlans = (req, res) => {
  res.json(plans);
};
