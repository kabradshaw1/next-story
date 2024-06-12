import React from 'react';

const plans = [
  {
    title: 'Integration with Upcoming Video Game',
    body: 'An exciting aspect of our platform is its integration with an upcoming video game set in the same universe. The best stories generated within the app have the potential to be featured in the game, giving writers not just an audience but a chance to see their creations come to life in an interactive format.',
  },
  {
    title: 'Goals and Vision',
    body: 'Our vision is to create not just a storytelling platform but a vibrant community of creators who, through cooperation and creativity, can construct a universe that is as boundless as space itself. We believe that through shared storytelling, we can explore complex themes like governance, survival, and human nature in a futuristic setting.',
  },
  {
    title: 'Sustainability and Evolution',
    body: 'Understanding the evolving nature of stories, our platform is designed to continuously adapt and expand, ensuring that it can support new ideas and technologies as they emerge. We are committed to maintaining an environment that is both user-friendly and innovative, encouraging ongoing participation and engagement.',
  },
  {
    title: 'Join Us',
    body: "This web application is more than just a place to tell stories; it's a community and a journey. Whether you're interested in exploring the depths of human conflict, building worlds, or simply telling a part of a grand interstellar voyage, this platform offers the tools, community, and opportunity to bring your stories to life. Join us to contribute to a narrative as vast as the cosmos and as intricate as the human spirit. Together, let's create not just stories, but legacies that span galaxies.",
  },
];

const Plans = (): JSX.Element => {
  return (
    <>
      {plans.map((plan) => (
        <div key={plan.title} className="flex-grow">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
            {plan.title}
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-3">{plan.body}</p>
        </div>
      ))}
    </>
  );
};

export default Plans;
