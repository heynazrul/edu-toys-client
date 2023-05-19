import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ToyCard from "./ToyCard";


const ShopByCategory = () => {
    const [activeTab, setActiveTab] = useState('science');
    const [categories, setCategories] = useState([])
    const [toys, setToys] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/toys/${activeTab}`)
        .then(res => res.json())
        .then(data => setToys(data))
    },[activeTab])

    useEffect(() => {
        fetch('http://localhost:5000/categories')
        .then(res => res.json())
        .then(data => setCategories(data));
    },[])
 

    return (
      <div className="mx-auto mt-12 max-w-7xl px-8">
        <h2 className="mb-12 text-center text-3xl font-bold">Shop By Category</h2>
        <Tabs
          id="custom-animation"
          value={activeTab}>
          <TabsHeader
            className="rounded border-b border-blue-gray-50  "
            indicatorProps={{
              className: 'bg-transparent border-b-2 border-blue-500 shadow-none rounded-none',
            }}>
            {categories.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? 'text-blue-500' : ''}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toys.map((toy) => (
                <ToyCard
                  key={toy._id}
                  toy={toy}></ToyCard>
              ))}
            </div>
          </TabsBody>
        </Tabs>
      </div>
    );
};

export default ShopByCategory;