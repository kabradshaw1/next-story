import Logo from '@/components/Logo/Logo';

const AboutSection = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-between">
        <div className="mb-4 mr-2 xl:mb-0 xl:flex-shrink-0">
          <Logo />
        </div>
        <div className="flex-grow">
          <h2
            className="text-blue-400 text-l xl:text-x font-bold mb-1 tracking-wider whitespace-nowrap"
            style={{ textTransform: 'uppercase' }}
          >
            <u>About Galaxy Voyagers</u>
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-5">
            Welcome to a revolutionary new platform for storytelling where
            imagination meets the infinite possibilities of collaboration. Our
            web application, designed for those who relish long, complex, and
            ever-evolving narratives, is not just a tool but a universe unto
            itself. Set half a million years into the future, it offers a canvas
            for storytellers to weave tales about a fleet of interstellar ships
            embarking on a 10,000-year voyage to a habitable star. Here, human
            civilization has transcended the constraints of mortality, creating
            societies fraught with the challenges of overpopulation and diverse
            socio-political responses to it.
          </p>
        </div>
      </div>

      <div className="flex-grow">
        <h2
          className="text-blue-400 text-l xl:text-l font-bold mb-1 tracking-wider whitespace-nowrap"
          style={{ textTransform: 'uppercase' }}
        >
          <u>Unique Features of this Site</u>
        </h2>
        <p className="text-gray-300 text-sm md:text-base mb-5">
          At its core, our application thrives on the power of collective
          creativity. Users can contribute their unique stories, characters,
          conflicts, and settings. Whether you are a novice writer or an
          experienced novelist, your voice is valuable in shaping this expansive
          universe. Each contribution feeds into a larger narrative, painting a
          rich tapestry of interconnected stories.
        </p>
      </div>
      <div className="flex-grow">
        <h2
          className="text-blue-400 text-l xl:text-l font-bold mb-1 tracking-wider whitespace-nowrap"
          style={{ textTransform: 'uppercase' }}
        >
          <u>Community Governance</u>
        </h2>
        <p className="text-gray-300 text-sm md:text-base mb-5">
          The community plays a pivotal role in determining the course of the
          narrative. Through a democratic process, contributors can vote on
          which aspects of the story become canon. This ensures that while
          individual creativity is celebrated, the overarching narrative remains
          cohesive and engaging.
        </p>
      </div>
      <div className="flex-grow">
        <h2
          className="text-blue-400 text-l xl:text-l font-bold mb-1 tracking-wider whitespace-nowrap"
          style={{ textTransform: 'uppercase' }}
        >
          <u>Dynamic Setting</u>
        </h2>
        <p className="text-gray-300 text-sm md:text-base mb-5">
          Set on a fleet of 400 diverse ships, each vessel has its own unique
          culture, conflicts, and characteristics. These ships serve not just as
          settings but as characters in their own right, each contributing to
          the narrative&apos;s depth and complexity. From governmental ships
          with strict reproductive laws to rebellious vessels embroiled in
          constant conflict, the settings are as varied as the stories they
          inspire.
        </p>
      </div>
    </>
  );
};

export default AboutSection;
