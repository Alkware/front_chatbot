import ReactPixel from 'react-facebook-pixel';
const PIXEL_FACEBOOK = import.meta.env.PIXEL_FACEBOOK;

ReactPixel.init(PIXEL_FACEBOOK);

export default ReactPixel; 
