import { GetServerSideProps, NextPage } from "next";
import { reduxWrapper } from "../../../redux/store";

import { AdminDashboardLayout } from "../../../layouts/adminLayout/AdminDashboardLayout";
import Category from "../../../components/admin/categories/Category";
import { getCategories } from "../../../redux/features/categories/categoriesActions";

const CategoryPage: NextPage = () => {
  return (
    <AdminDashboardLayout>
      <Category />
    </AdminDashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = reduxWrapper.getServerSideProps((store) => async () => {
  try {
    await store.dispatch<any>(getCategories());

    return {
      props: {},
    };
  } catch (error: any) {
    console.log("ERROR", error);
    return {
      props: {
        error: error.message,
      },
    };
  }
});

export default CategoryPage;
