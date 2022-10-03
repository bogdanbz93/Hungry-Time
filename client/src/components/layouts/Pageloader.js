import Notiflix from "notiflix-react";

const Pageloader = props => {
  Notiflix.Loading.Circle("Preparăm pagina curentă.. 🍕");
  Notiflix.Loading.Remove(props.timer);
};

export default Pageloader;
