import { NextPage } from "next";

import Venues from "../../../components/admin/venues/Venues";
import { AdminDashboardLayout } from "../../../layouts/adminLayout/AdminDashboardLayout";

const VenuesPage: NextPage = () => {
  return (
    <AdminDashboardLayout>
      <Venues />
    </AdminDashboardLayout>
  );
};

export default VenuesPage;
