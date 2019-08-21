import {TYPES, CITIES, DESCRIPTIONS, DESCRIPTION_MAX_LENGTH, OPTIONS_MAX_COUNT, PRICE_MAX, PHOTOS_COUNT} from '../utils/constants.js';

const generateOptions = () => {
  const options = [
    {
      name: `Add luggage`,
      price: 10,
      isChecked: false,
    },
    {
      name: `Switch to comfort class`,
      price: 150,
      isChecked: false,
    },
    {
      name: `Add meal`,
      price: 2,
      isChecked: false,
    },
    {
      name: `Choose seats`,
      price: 9,
      isChecked: false,
    }
  ];

  let checkedOptions = 0;
  for (let i = 0; i < options.length; i++) {
    options[i].isChecked = Boolean(Math.round(Math.random()));
    if (options[i].isChecked) {
      checkedOptions++;
      if (checkedOptions >= OPTIONS_MAX_COUNT) {
        break;
      }
    }
  }

  return options;
};

export const createEvent = () => {
  const photos = [];
  for (let i = 0; i < PHOTOS_COUNT; i++) {
    photos[i] = `http://picsum.photos/300/150?r=${Math.random()}`;
  }

  const description = [];
  const DESCRIPTION_LENGTH = Math.floor(Math.random() * DESCRIPTION_MAX_LENGTH) + 1;
  for (let i = 0; i < DESCRIPTION_LENGTH; i++) {
    description.push(DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]);
  }

  const startTime = Date.now() + Math.floor(Math.random() * 7 * 24 * 60) * 60 * 1000;
  const endTime = startTime + Math.floor(Math.random() * 1 * 24 * 60) * 60 * 1000;

  return {
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    city: CITIES[Math.floor(Math.random() * CITIES.length)],
    startTime,
    endTime,
    price: Math.floor(Math.random() * PRICE_MAX) + 1,
    options: generateOptions(),
    description,
    photos
  };
};
