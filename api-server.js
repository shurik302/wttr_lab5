const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/weather', async (req, res) => {
	const { city } = req.body;

	if (!city) {
		return res.status(400).json({ error: 'City is required' });
	}

	try {
		const response = await axios.get(`https://wttr.in/${city}?format=j1`);
		const weatherData = response.data;

		const currentWeather = weatherData.current_condition[0];

		res.json({
			city: city,
			temperature: currentWeather.temp_C,
			description: currentWeather.weatherDesc[0].value,
		});
	} catch (error) {
		res.status(500).json({ error: 'Could not retrieve weather data. Please check the city name and try again.' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
