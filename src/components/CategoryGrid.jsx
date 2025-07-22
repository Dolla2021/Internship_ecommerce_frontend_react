import React from 'react';
import { products } from '../data/products';

const Categories = () => {
    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <div className="font-lato">
            {/* Heading + Subheading */}
            <div className="ms-10 mb-8">
                <h3 className="text-3xl font-bold text-gray-800">Discover Our Best-Selling </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Explore top-rated gadgets, phones, accessories, and smart devices trusted by customers.
                </p>
            </div>

            {/* Products grouped by category */}
            {Object.entries(groupedProducts).map(([category, items]) => (
                <div key={category} className="mb-12">
                   
                    <div className="p-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {items.map((product) => (
                            <a
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="group block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-44 w-full object-cover sm:h-56"
                                />
                                <div className="p-3">
                                    <p className="text-xs text-gray-500">{product.description}</p>
                                    <div className="mt-3 flex justify-between text-sm">
                                        <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4 font-semibold">
                                            {product.name}
                                        </h3>
                                        {product.price && (
                                            <p className="text-gray-900">${product.price}</p>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Categories;
