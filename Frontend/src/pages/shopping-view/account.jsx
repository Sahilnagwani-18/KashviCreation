import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <div className="relative h-[250px] sm:h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="Account"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-6 text-white z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-md">My Account</h1>
          <p className="text-sm sm:text-base text-gray-200">
            View and manage your orders & address
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4 sm:px-8 py-10">
        <div className="rounded-xl border border-gray-200 shadow-md bg-white dark:bg-gray-950 p-6 sm:p-8">
          <Tabs defaultValue="orders" className="w-full">
            {/* Tab List */}
            <TabsList className="flex space-x-4 mb-6">
              <TabsTrigger
                value="orders"
                className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-[#F1D7F5] data-[state=active]:text-[#4B2A3A] data-[state=inactive]:text-gray-600"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-[#F1D7F5] data-[state=active]:text-[#4B2A3A] data-[state=inactive]:text-gray-600"
              >
                Address
              </TabsTrigger>
            </TabsList>

            {/* Orders */}
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>

            {/* Address */}
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
