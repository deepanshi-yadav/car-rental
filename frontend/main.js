new Vue({
  el: '#app',
  data: {
    vehicles: [],
    userId: '' // later set after registration/login
  },
  created() {
    fetch('http://localhost:5000/api/vehicles')
      .then(res => res.json())
      .then(data => { this.vehicles = data });
  },
  methods: {
    async bookVehicle(vehicleId) {
      if(!this.userId) {
        alert('Please set userId before booking.');
        return;
      }
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.userId, vehicleId })
      });
      const data = await res.json();
      alert(`Booking created with ID: ${data._id}`);
    }
  }
});
