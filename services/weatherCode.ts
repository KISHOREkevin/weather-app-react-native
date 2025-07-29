const getWeatherIconAndDescription = (code: number) => {
    switch (code) {
        case 0: return { icon: 'sunny', description: 'Clear' };
        case 1: return { icon: 'partly-sunny', description: 'Clear' };
        case 2: return { icon: 'cloudy', description: 'Cloudy' };
        case 3: return { icon: 'cloud', description: 'Overcast' };
        case 45: return { icon: 'cloudy-night', description: 'Fog' };
        case 48: return { icon: 'cloudy-night', description: 'Fog' };
        case 51: return { icon: 'rainy', description: 'Drizzle' };
        case 53: return { icon: 'rainy', description: 'Drizzle' };
        case 55: return { icon: 'rainy', description: 'Drizzle' };
        case 56: return { icon: 'rainy', description: 'Drizzle' };
        case 57: return { icon: 'rainy', description: 'Drizzle' };
        case 61: return { icon: 'rainy', description: 'Rain' };
        case 63: return { icon: 'rainy', description: 'Rain' };
        case 65: return { icon: 'rainy', description: 'Rain' };
        case 66: return { icon: 'snow', description: 'Freezing Rain' };
        case 67: return { icon: 'snow', description: 'Freezing Rain' };
        case 71: return { icon: 'snow', description: 'Snow' };
        case 73: return { icon: 'snow', description: 'Snow' };
        case 75: return { icon: 'snow', description: 'Snow' };
        case 77: return { icon: 'snow', description: 'Snow' };
        case 80: return { icon: 'rainy', description: 'Rain' };
        case 81: return { icon: 'rainy', description: 'Rain' };
        case 82: return { icon: 'rainy', description: 'Rain' };
        case 85: return { icon: 'snow', description: 'Snow' };
        case 86: return { icon: 'snow', description: 'Snow' };
        case 95: return { icon: 'thunderstorm', description: 'Thunderstorm' };
        case 96: return { icon: 'thunderstorm', description: 'Thunderstorm' };
        case 99: return { icon: 'thunderstorm', description: 'Thunderstorm' };
        default: return { icon: 'cloud', description: 'N/A' };
    }
};

export default getWeatherIconAndDescription;
