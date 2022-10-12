import { GetServerSideProps, NextPage } from "next";
import { reduxWrapper } from "../../../redux/store";

import { AdminDashboardLayout } from "../../../layouts/adminLayout/AdminDashboardLayout";
import Facility from "../../../components/admin/facilities/Facility";
import { getFacilities } from "../../../redux/features/facilities/faciltiesActions";

const CategoryPage: NextPage = () => {
  return (
    <AdminDashboardLayout>
      <Facility />
    </AdminDashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = reduxWrapper.getServerSideProps((store) => async () => {
  try {
    await store.dispatch<any>(getFacilities());

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
