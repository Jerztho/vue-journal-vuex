import axios from 'axios';
import cloudinary from 'cloudinary'

import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.config({
  cloun_name: 'dq7jqpwcw',
  api_key: '358619652325924',
  api_secret: 'Sik5qOPoo4Yx39ULFboWl7mwJkA'
})


describe('Pruebas en el upload image', () => {
    jest.setTimeout(60000)

  test('Debe de cargar un archivo y retornar el url', async (done) => {    
    const { data } = await axios.get(
      'https://res.cloudinary.com/dq7jqpwcw/image/upload/v1689736710/cld-sample-5.jpg',
      {
        responseType: 'arraybuffer',
      }
    );
    
    const file = new File([data], 'image.jpg');
    const url = await uploadImage(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length-1].replace('.jpg', '');
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done()
    })
  });
});
