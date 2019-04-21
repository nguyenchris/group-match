const axios = require('axios');
const fs = require('fs');

const authHeader = { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}` } };

axios.get('https://www.eventbriteapi.com/v3/categories/', authHeader).then(result => {
  const { categories } = result.data;
  const newArray = categories.map(category => {
    return {
      id: category.id,
      name: category.name
    };
  });

  console.log(newArray);
  fs.writeFile('event-categories.json', JSON.stringify(newArray), 'utf8', () => {
    console.log('file created');
  });
});
