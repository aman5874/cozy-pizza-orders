
import DashboardLayout from '@/components/DashboardLayout';
import PizzaOrdersTable from '@/components/PizzaOrdersTable';

const PizzaOrders = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pizza Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all pizza orders in real-time
          </p>
        </div>
        <PizzaOrdersTable />
      </div>
    </DashboardLayout>
  );
};

export default PizzaOrders;
