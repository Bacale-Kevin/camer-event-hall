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

export default CategoryPage;
