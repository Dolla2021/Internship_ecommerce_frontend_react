import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import PromoBanner from './Promobanner';
// src/components/ShopByCategory.jsx  
const ShopByCategory = () => {
  const categories = [
    { name: 'Watches', icon: 'https://i.pinimg.com/originals/17/da/1c/17da1c5c2e793059947298db0973d674.jpg' },
    { name: 'Headphones', icon: 'https://img.freepik.com/premium-photo/headphones-extreme-minimalism_863013-168414.jpg?w=2000' },
    { name: 'Cameras', icon: 'https://th.bing.com/th/id/R.47d6fa40c06c1fe0bc3927552e042697?rik=3sF7114dVMYkCQ&riu=http%3a%2f%2fecx.images-amazon.com%2fimages%2fI%2f71vBvZb3pYL._SL1500_.jpg&ehk=TiP%2bov29H2hio5vVY0m3Uoz9kGKih4mlUm42rcn8gqo%3d&risl=&pid=ImgRaw&r=0' },
    { name: 'Laptops', icon: 'https://tse1.mm.bing.net/th/id/OIP.ZCUNzf3dfmjNafkmIqr9eAHaF7?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'Tablets', icon: 'https://images.hothardware.com/contentimages/article/3027/content/small_angle-2-samsung-galaxy-tab-s7-plus.jpg' },
    { name: 'Accessories', icon: 'https://i5.walmartimages.com/asr/548e71cb-f2a4-4342-aac5-87f734a3990b_1.298a4aad169f0581faa88ec3a0d3974c.jpeg' },
    { name: 'Speakers', icon: 'https://tse3.mm.bing.net/th/id/OIP.uE4cwVajqtgMzh4iYwv7NAHaGk?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'Gaming', icon: 'https://tse1.mm.bing.net/th/id/OIP.l533EXQSYK_qONawiGmR9AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'Drones', icon: 'https://5.imimg.com/data5/SELLER/Default/2022/6/SQ/ZG/YG/151745012/xdynamics-evolve-2-drone-500x500.jpg' },
    { name: 'Smartphones', icon: 'https://tse3.mm.bing.net/th/id/OIP.5efkDI4nGP3TFe70qL20FwHaHa?pid=ImgDet&w=207&h=207&c=7&dpr=1.6&o=7&rm=3' },  ];
  const firstColumn = categories.slice(5);
  const secondColumn = categories.slice(0, 5);
  return (
    <div className="p-6 flex flex-col sm:flex-row items-start">
      <div className="w-20 sm:w-1/5 mb-4 sm:mb-0">
        <h2 className="text-lg font-semibold mb-4">SHOP BY BLOCK</h2>
        <div className="flex space-x-6">
          <div className="flex flex-col space-y-3">
            {firstColumn.map((category, index) => (
              <Link to={`/products/${category.name}`} key={index}>
                <button className=' p-2 rounded shadow hover:text-lg hobg-teal-200 transition'>
                  <div className="flex items-center transition">
                    <span className="text-black">{category.name}</span>
                  </div>
                </button>
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-3">
            {secondColumn.map((category, index) => (
              <Link to={`/products/${category.name}`} key={index}>
                <button className=' p-2 rounded shadow hover:text-lg transition'>
                  <div className="flex items-center transition">
                    <span className="text-black">{category.name}</span>
                  </div>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex justify-center">
        <Banner />
      </div>
      <div className="w-full sm:w-1/2 flex justify-center">
        <PromoBanner />
      </div>
    </div>
  );
};
export default ShopByCategory;