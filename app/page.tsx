import React from 'react'; // Make sure React is imported if JSX is being used.

import AboutSection from '@/components/home/AboutSection/AboutSection';
import FeaturedHP from '@/components/home/Featured/Featured';
import NonFeatured from '@/components/home/NonFeatured/NonFeatured';
import Tools from '@/components/home/Tools/Tools';

export default function Home(): React.ReactElement {
  const categories = [
    {
      category: 'Characters',
      description: 'See the characters of Galaxy Voyagers',
      image: '/images/characters.png',
      featured: true,
    },
    {
      category: 'Scenes',
      description: 'See the scenes of Galaxy Voyagers',
      image: '/images/scenes.png',
      featured: true,
    },
    {
      category: 'Locations',
      description: 'See the locations of Galaxy Voyagers',
      image: '/images/locations.png',
      featured: false,
    },
    {
      category: 'Ships',
      description: 'See the ships of Galaxy Voyagers',
      image: '/images/ships.png',
      featured: false,
    },
    {
      category: 'Conflicts',
      description: 'See the conflicts of Galaxy Voyagers',
      image: '/images/conflicts.png',
      featured: false,
    },
    {
      category: 'Organizations',
      description: 'See the organizations of Galaxy Voyagers',
      image: '/images/organizations.png',
      featured: false,
    },
  ];

  const featuredCategories = categories.filter((category) => category.featured);
  const regularCategories = categories.filter((category) => !category.featured);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row">
      <div className="flex-1 mr-2">
        <section className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2
            className="text-blue-400 text-lg font-bold mb-3"
            style={{ textTransform: 'uppercase' }}
          >
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeaturedHP items={featuredCategories} />
          </div>
        </section>

        <section className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-white text-lg font-bold mb-3">More Categories</h2>
          <div className="flex flex-wrap">
            <NonFeatured items={regularCategories} />
          </div>
        </section>
        <section className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <Tools />
        </section>
      </div>
      <div className="flex-1 hidden sm:block">
        <section className="mb-8 bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col">
          <AboutSection />
        </section>
      </div>
    </div>
  );
}
