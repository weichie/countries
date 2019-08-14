import Vue from 'vue'

Vue.filter('formatNumber', val => {
	if (!val) return;
	const number = (typeof val === 'number') ? val : val.match(/\d+/g).map(Number);

	return number.toLocaleString(
		undefined,
		{ minimumFractionDigits: 0 }
	);
});

Vue.filter('urlify', val => {
  return val.replace(/\s+/g, '-').toLowerCase();
});
