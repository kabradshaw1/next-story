import React from "react"; // Make sure React is imported if JSX is being used.

import FeaturedHP from "@/components/FeaturedHP/FeaturedHP";
import Logo from "@/components/Logo/Logo";
import NonFeatured from "@/components/NonFeatured/NonFeatured";

export default function Home() {
  const categories = [
    {
      category: "Characters",
      description: "Galaxy Voyagers has a lot of characters",
      image: "/images/characters.png",
      featured: true,
    },
    {
      category: "Scenes",
      description: "Galaxy Voyagers has a lot of planets",
      image: "/images/scenes.png",
      featured: true,
    },
    {
      category: "Locations",
      description: "Galaxy Voyagers has a lot of species",
      image: "/images/locations.png",
      featured: false,
    },
    {
      category: "Ships",
      description: "Galaxy Voyagers has a lot of starships",
      image: "/images/ships.png",
      featured: false,
    },
    {
      category: "Conflicts",
      description: "Galaxy Voyagers has a lot of species",
      image: "/images/conflicts.png",
      featured: false,
    },
    {
      category: "Organizations",
      description: "Galaxy Voyagers has a lot of organizations",
      image: "/images/organizations.png",
      featured: false,
    },
  ];

  const featuredCategories = categories.filter((category) => category.featured);
  const regularCategories = categories.filter((category) => !category.featured);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row">
      <div className="flex-1">
        <section className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-white text-lg font-bold mb-3">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeaturedHP items={featuredCategories} />
          </div>
        </section>

        <section className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-white text-lg font-bold mb-3">More Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NonFeatured items={regularCategories} />
          </div>
        </section>
      </div>
      <div className="flex-1 hidden sm:block">
        <section className="mb-8 bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col">
          <div className="flex flex-col xl:flex-row items-center justify-between">
            <div className="mb-4 mr-2 xl:mb-0 xl:flex-shrink-0">
              <Logo />
            </div>
            <div className="flex-grow">
              <h1 className="text-white text-xl xl:text-2xl font-bold mb-4">
                About Galaxy Voyagers
              </h1>
              <p className="text-gray-300 text-sm xl:text-base mb-3">
                Welcome to a revolutionary new platform for storytelling where
                imagination meets the infinite possibilities of collaboration.
                Our web application, designed for those who relish long,
                complex, and ever-evolving narratives, is not just a tool but a
                universe unto itself. Set half a million years into the future,
                it offers a canvas for storytellers to weave tales about a fleet
                of interstellar ships embarking on a 10,000-year voyage to a
                habitable star. Here, human civilization has transcended the
                constraints of mortality, creating societies fraught with the
                challenges of overpopulation and diverse socio-political
                responses to it.
              </p>
            </div>
          </div>

          <div className="flex-grow">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
              Unique Features of this site
            </h2>
            <p className="text-gray-300 text-sm md:text-base mb-3">
              At its core, our application thrives on the power of collective
              creativity. Users can contribute their unique stories, characters,
              conflicts, and settings. Whether you are a novice writer or an
              experienced novelist, your voice is valuable in shaping this
              expansive universe. Each contribution feeds into a larger
              narrative, painting a rich tapestry of interconnected stories.
            </p>
          </div>
          <div className="flex-grow">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
              Community Governance
            </h2>
            <p className="text-gray-300 text-sm md:text-base mb-3">
              The community plays a pivotal role in determining the course of
              the narrative. Through a democratic process, contributors can vote
              on which aspects of the story become canon. This ensures that
              while individual creativity is celebrated, the overarching
              narrative remains cohesive and engaging.
            </p>
          </div>
          <div className="flex-grow">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
              Dynamic Setting
            </h2>
            <p className="text-gray-300 text-sm md:text-base mb-3">
              Set on a fleet of 400 diverse ships, each vessel has its own
              unique culture, conflicts, and characteristics. These ships serve
              not just as settings but as characters in their own right, each
              contributing to the narrative&apos;s depth and complexity. From
              governmental ships with strict reproductive laws to rebellious
              vessels embroiled in constant conflict, the settings are as varied
              as the stories they inspire.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
