import { NextPage } from "next";

import { AdminDashboardLayout } from "../../../layouts/adminLayout/AdminDashboardLayout";
import Facility from "../../../components/admin/facilities/Facility";

const CategoryPage: NextPage = () => {
  return (
    <AdminDashboardLayout>
      <Facility />
    </AdminDashboardLayout>
  );
};

export default CategoryPage;
