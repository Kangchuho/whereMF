import Realm from 'realm';
import getRealm from '../realm';

export async function createImage(image) {
  const realm = await getRealm();

  image.id = await generateImageId();
  image.name += `.${image.id}`;
  try {
    realm.write(async () => {
      await realm.create('Image', image);
    });
    console.log('Create new image successful!', image);

    //realm.close();

    return image;
  } catch (e) {
    return console.log(e);
  }
}

export async function generateImageId() {
  //let images = realm.objects('Image');
  const realm = await getRealm();
  const images = realm.objects('Image').sorted('id', true);
  if (images.length == 0) return 1;
  //realm.close();
  return images[0].id + 1; // id max + 1
}

export async function getImage(id) {
  const realm = await getRealm();
  const seletedImage = realm.objectForPrimaryKey('Image', id);
  //realm.close();
  return seletedImage;
}
