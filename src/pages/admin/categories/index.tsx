import { NextPage } from "next";

import { AdminDashboardLayout } from "../../../layouts/adminLayout/AdminDashboardLayout";
import Category from "../../../components/admin/categories/Category";

const CategoryPage: NextPage = () => {
  return (
    <AdminDashboardLayout>
      <Category />
    </AdminDashboardLayout>
  );
};

/**
 * * These code is commented because it results to a vercel timeout error in production 
 * * Client side fetching will be used to avoid running into this error on production
 */
// export const getServerSideProps: GetServerSideProps = reduxWrapper.getServerSideProps((store) => async () => {
//   try {
//     await store.dispatch<any>(getCategories());

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

export default CategoryPage;
