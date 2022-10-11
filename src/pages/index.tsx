import type { GetServerSideProps, NextPage } from "next";
import { Context } from "next-redux-wrapper";
import Home from "../components/Home";
import { getLoggedInUser } from "../redux/features/auth/authActions";
import { reduxWrapper } from "../redux/store";

const HomePage: NextPage = () => {
  return (
    <>
      <Home />
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = reduxWrapper.getServerSideProps((store) => async ({ req }) => {
//   try {
//     const { payload } = await store.dispatch<any>(getLoggedInUser());

//     // console.log("loggedInUser --> ", payload);

//     return {
//       props: {},
//     };
//   } catch (error: any) {
//     console.log("ERROR", error);
//     return {
//       props: {
//         error: error.message,
//       },
//     };
//   }
// });

export default HomePage;
