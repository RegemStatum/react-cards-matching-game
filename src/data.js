import cardFaceDown from "./assets/images/card-face-down.png";
import img1 from "./assets/images/card-1.png";
import img2 from "./assets/images/card-2.png";
import img3 from "./assets/images/card-3.png";
import img4 from "./assets/images/card-4.png";
import img5 from "./assets/images/card-5.png";
import img6 from "./assets/images/card-6.png";
import img7 from "./assets/images/card-7.png";
import img8 from "./assets/images/card-8.png";

const cards = [
  { id: 1, isClicked: false, isGuessed: false, img: img1 },
  { id: 2, isClicked: false, isGuessed: false, img: img2 },
  { id: 3, isClicked: false, isGuessed: false, img: img3 },
  { id: 4, isClicked: false, isGuessed: false, img: img4 },
  { id: 5, isClicked: false, isGuessed: false, img: img5 },
  { id: 6, isClicked: false, isGuessed: false, img: img6 },
  { id: 7, isClicked: false, isGuessed: false, img: img7 },
  { id: 8, isClicked: false, isGuessed: false, img: img8 },
];

export { cards, cardFaceDown };
