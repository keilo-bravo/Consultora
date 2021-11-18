// import { useEffect } from "react";
import CardAbogado from "../cardAbogado/CardAbogado";
import Navbar from "../home-page/Navbar/Navbar";
// import { getAbogados } from "../../redux/actions/index";
import { useSelector } from "react-redux";

export default function Perfiles() {
  // const dispatch = useDispatch();
  const { abogados } = useSelector((state) => state);

  // useEffect(() => {
  //   getAbogados().then(({ data }) => {
  //     setAbogados(data);
  //   })
  // }, []);

  // const getAbogados = async (id) => {
  //   return await axios.get(`/abogados`)
  // };

  return (
    <>
      <Navbar navId={"menu"} />

      <div className="container">
        <div className="mt-1 row row-cols-2 row-cols-lg-4 row-cols-xl-5 row-cols-md-2 g-5 animate__animated animate__fadeIn animate__faster">
          {abogados.map((a, i) => {
            return <CardAbogado key={i} abogado={a}></CardAbogado>;
          })}
        </div>
      </div>
    </>
  );
}
