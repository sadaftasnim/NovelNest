import { useState,useEffect } from "react";


// Genres
const genres = [
  "Action",
  "Comedy",
  "Adventure",
  "Mystery",
  "Romance",
  "Horror",
  "Fantasy",
  "Sci_Fi",
  "Drama",
  "Thriller",
  "Historical",
  "General Fiction",
];

// Sample novels per genre with real titles
const novelsData = {
  Action: [
    {
      name: "The Hunger Games",
      description:
        "Katniss Everdeen lives in a dystopian world where the Capitol forces children to compete in deadly games. " +
        "She volunteers to save her sister and enters the deadly arena. " +
        "Throughout the games, she faces physical and psychological challenges. " +
        "Alliances and betrayals shape her survival. " +
        "The story explores courage, sacrifice, and rebellion against oppression.",
      views: "5.2K Views",
      image: "/images/The_Hunger_Games.jpg",
    },
    {
      name: "The Maze Runner",
      description:
        "Thomas wakes up in a mysterious maze with no memory of his past. " +
        "Alongside other teenagers, he struggles to survive and solve the maze's secrets. " +
        "The maze is full of deadly creatures and traps. " +
        "Friendships and rivalries influence their chances of escape. " +
        "The novel explores bravery, teamwork, and survival under pressure.",
      views: "4.8K Views",
      image: "/images/TheMazeRunner.jpg",
    },
  ],
  Comedy: [
    {
      name: "The Hitchhiker's Guide to the Galaxy",
      description:
        "Arthur Dent's house is about to be demolished when Earth is destroyed. " +
        "He travels through space with Ford Prefect, a researcher for a galactic guidebook. " +
        "They encounter absurd planets, aliens, and improbable adventures. " +
        "The book mixes humor with satire on bureaucracy and human nature. " +
        "A funny yet thought-provoking journey across the galaxy unfolds.",
      views: "3.9K Views",
      image: "/images/TheHitchhiker'sGuidetotheGalaxy.jpg",
    },
    {
      name: "Good Omens",
      description:
        "An angel and a demon form an unlikely alliance to prevent the apocalypse. " +
        "They attempt to locate the Antichrist who is about to bring destruction. " +
        "The story humorously explores Heaven, Hell, and human behavior. " +
        "Characters encounter quirky and bizarre situations on Earth. " +
        "It’s a witty, satirical take on prophecy, friendship, and fate.",
      views: "4.1K Views",
      image: "/images/GoodOmens.jpg",
    },
  ],
  Adventure: [
    {
      name: "The Hobbit",
      description:
        "Bilbo Baggins, a quiet hobbit, is pulled into a dangerous quest by Gandalf. " +
        "He joins dwarves to reclaim their homeland from a fearsome dragon. " +
        "Along the journey, Bilbo faces trolls, goblins, and giant spiders. " +
        "He discovers courage, cleverness, and the thrill of adventure. " +
        "The novel blends fantasy, heroism, and personal growth beautifully.",
      views: "6.0K Views",
      image: "/images/TheHobbit.jpg",
    },
    {
      name: "Treasure Island",
      description:
        "Young Jim Hawkins finds a treasure map leading to hidden gold. " +
        "He sets sail on a voyage full of pirates and treacherous seas. " +
        "Betrayal and danger test his courage and wits. " +
        "The journey is filled with suspense, adventure, and mystery. " +
        "A classic tale of pirates, treasure, and coming-of-age excitement.",
      views: "4.5K Views",
      image: "/images/TreasureIsland.jpg",
    },
  ],
  Mystery: [
    {
      name: "Gone Girl",
      description:
        "Nick’s wife Amy mysteriously disappears on their wedding anniversary. " +
        "The media and police focus on Nick as the prime suspect. " +
        "Twists reveal secrets about their marriage and Amy’s true nature. " +
        "The story explores manipulation, lies, and psychological tension. " +
        "A gripping thriller about perception, love, and revenge.",
      views: "5.8K Views",
      image: "/images/GoneGirl.jpg",
    },
    {
      name: "The Girl with the Dragon Tattoo",
      description:
        "Journalist Mikael Blomkvist investigates a decades-old disappearance in Sweden. " +
        "He teams up with hacker Lisbeth Salander, a genius with a troubled past. " +
        "They uncover corruption, family secrets, and dark motives. " +
        "The investigation reveals a complex web of crime and deceit. " +
        "A gripping tale of mystery, intelligence, and suspense.",
      views: "5.5K Views",
      image: "/images/TheGirlWithTheDragonTattoo.jpg",
    },
  ],
  Romance: [
    {
      name: "Pride and Prejudice",
      description:
        "Elizabeth Bennet navigates love, family expectations, and social norms. " +
        "She meets the proud Mr. Darcy and initial misunderstandings occur. " +
        "They face societal pressures, personal prejudices, and family challenges. " +
        "Over time, understanding and love develop between them. " +
        "A classic tale of romance, social commentary, and personal growth.",
      views: "6.3K Views",
      image: "/images/PrideAndPrejudice.jpg",
    },
    {
      name: "Me Before You",
      description:
        "Louisa Clark becomes a caregiver for Will Traynor, a paralyzed man. " +
        "Will struggles with loss of purpose and despair. " +
        "Their bond grows, filled with love, challenges, and growth. " +
        "Louisa encourages Will to find joy despite his condition. " +
        "A heartwarming story of love, choices, and emotional transformation.",
      views: "4.9K Views",
      image: "/images/MeBeforeYou.jpg",
    },
  ],
  Horror: [
    {
      name: "It",
      description:
        "A terrifying entity, Pennywise, haunts the town of Derry. " +
        "Children vanish mysteriously, and a group of friends confronts the horror. " +
        "The story alternates between past and present, exploring trauma and fear. " +
        "Friendship, courage, and facing fears are central themes. " +
        "A chilling tale blending horror, suspense, and childhood memories.",
      views: "5.7K Views",
      image: "/images/It.jpg",
    },
    {
      name: "The Shining",
      description:
        "Jack Torrance takes a job as caretaker of the isolated Overlook Hotel. " +
        "The hotel’s supernatural forces drive him toward madness. " +
        "His family faces terrifying experiences as the past and present collide. " +
        "Isolation and evil amplify the psychological tension. " +
        "A classic horror story of obsession, ghosts, and human vulnerability.",
      views: "6.1K Views",
      image: "/images/TheShining.jpg",
    },
  ],
  Fantasy: [
    {
      name: "Harry Potter and the Sorcerer's Stone",
      description:
        "Harry discovers he is a wizard and is invited to Hogwarts. " +
        "He learns magic, forms friendships, and uncovers mysteries at school. " +
        "Dark forces, including Voldemort, threaten Harry’s world. " +
        "He faces challenges with courage, intelligence, and loyalty. " +
        "The story blends magic, adventure, and the power of friendship.",
      views: "8.2K Views",
      image: "/images/HarryPotterAndTheSorcerer'sStone.jpg",
    },
    {
      name: "A Game of Thrones",
      description:
        "Noble families vie for control of the Iron Throne. " +
        "Intrigue, betrayal, and alliances shape the political landscape. " +
        "Characters face war, dragons, and personal ambitions. " +
        "Power struggles reveal human greed and loyalty. " +
        "A sweeping fantasy epic of politics, war, and survival.",
      views: "7.9K Views",
      image: "/images/AGameOfThrones.jpg",
    },
  ],
  Sci_Fi: [
    {
      name: "Dune",
      description:
        "Paul Atreides moves to the desert planet Arrakis, source of the valuable spice. " +
        "He navigates political intrigue, betrayal, and survival. " +
        "Prophecies and visions guide him through personal and planetary challenges. " +
        "The story explores power, ecology, and destiny. " +
        "A complex sci-fi epic of politics, adventure, and heroism.",
      views: "6.8K Views",
      image: "/images/Dune.jpg",
    },
    {
      name: "Ender's Game",
      description:
        "Ender Wiggin is trained to fight alien invaders at a young age. " +
        "He excels in strategic thinking and military simulation games. " +
        "Friendship, rivalry, and leadership are central to his growth. " +
        "The story examines morality, war, and manipulation. " +
        "A thrilling sci-fi novel of genius, strategy, and survival.",
      views: "5.6K Views",
      image: "/images/Ender'sGame.jpg",
    },
  ],
  Drama: [
    {
      name: "To Kill a Mockingbird",
      description:
        "Scout Finch grows up in a racially divided Southern town. " +
        "Her father, Atticus, defends a black man accused of a crime. " +
        "She witnesses prejudice, injustice, and moral courage. " +
        "Childhood innocence contrasts with harsh realities of society. " +
        "A powerful story about empathy, morality, and human nature.",
      views: "7.1K Views",
      image: "/images/ToKillaMockingbird.jpg",
    },
    {
      name: "The Kite Runner",
      description:
        "Amir and Hassan share a childhood in Kabul, Afghanistan. " +
        "A betrayal changes their lives and haunts Amir for years. " +
        "The story follows guilt, redemption, and cultural upheaval. " +
        "Friendship and family bonds are central to the narrative. " +
        "A moving drama of personal and social consequences.",
      views: "6.5K Views",
      image: "/images/Kite_runner.jpg",
    },
  ],
  Thriller: [
    {
      name: "The Da Vinci Code",
      description:
        "Professor Robert Langdon investigates a murder at the Louvre. " +
        "He discovers hidden clues linked to religious secrets. " +
        "The chase uncovers a conspiracy involving the Holy Grail. " +
        "Twists, puzzles, and danger keep the tension high. " +
        "A fast-paced thriller blending history, religion, and mystery.",
      views: "7.3K Views",
      image: "/images/The_Da_Vinci_Code.jpg",
    },
    {
      name: "Angels & Demons",
      description:
        "Langdon is called to investigate a mysterious death and a secret society. " +
        "A threat against the Vatican unfolds, creating a race against time. " +
        "He encounters secret symbols, ancient conspiracies, and danger. " +
        "Allies and enemies blur as the mystery deepens. " +
        "A gripping thriller full of suspense and historical intrigue.",
      views: "6.9K Views",
      image: "/images/Angels&Demons.jpg",
    },
  ],
  Historical: [
    {
      name: "All the Light We Cannot See",
      description:
        "Marie-Laure, a blind French girl, and Werner, a German boy, live during WWII. " +
        "Their lives intersect amidst bombings, occupation, and survival struggles. " +
        "The novel explores human resilience and moral choices. " +
        "It portrays the impact of war on ordinary people. " +
        "A beautifully written story of courage, hope, and humanity.",
      views: "5.9K Views",
      image: "/images/AlltheLightWeCannotSee.jpg",
    },
    {
      name: "The Book Thief",
      description:
        "Liesel steals books in Nazi Germany and finds solace in words. " +
        "She befriends Max, a Jewish refugee hiding in her home. " +
        "The horrors of war are juxtaposed with the innocence of childhood. " +
        "Her family and neighbors shape her experiences during turmoil. " +
        "A poignant story about books, courage, and humanity during war.",
      views: "5.7K Views",
      image: "/images/TheBookThief.jpg",
    },
  ],
  "General Fiction": [
    {
      name: "The Catcher in the Rye",
      description:
        "Holden Caulfield narrates his experiences after being expelled from school. " +
        "He struggles with alienation, identity, and the hypocrisy of adults. " +
        "The novel explores teenage angst and mental health. " +
        "Holden’s journey is both reflective and rebellious. " +
        "A classic story of adolescence, self-discovery, and disillusionment.",
      views: "6.2K Views",
      image: "/images/TheCatcherintheRye.jpg",
    },
    {
      name: "Life of Pi",
      description:
        "Pi Patel survives a shipwreck and ends up on a lifeboat with a Bengal tiger. " +
        "He struggles with hunger, fear, and isolation while finding inner strength. " +
        "Faith, storytelling, and imagination help him endure. " +
        "The narrative explores the boundary between reality and belief. " +
        "An inspiring tale of survival, hope, and the human spirit.",
      views: "5.8K Views",
      image: "/images/LifeofPi.jpg",
    },
  ],
};

const Library = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Disable scroll when showing genres, enable scroll when showing novels
  useEffect(() => {
    if (!selectedGenre) {
      document.body.style.overflow = "hidden"; // unscrollable for genre list
    } else {
      document.body.style.overflow = "auto"; // scrollable for novels
    }

    return () => {
      document.body.style.overflow = "auto"; // restore on unmount
    };
  }, [selectedGenre]);

  return (
    <div className="min-h-screen bg-gray-100 px-12 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Explore by Genre
      </h1>

      {!selectedGenre ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition"
              onClick={() => setSelectedGenre(genre)}
            >
              <h2 className="text-xl font-semibold text-center">{genre}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-auto max-h-screen">
          <button
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setSelectedGenre(null)}
          >
            Back to Genres
          </button>

          <h2 className="text-3xl font-bold mb-8">{selectedGenre} Novels</h2>

          {novelsData[selectedGenre]?.map((novel, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md mb-8 flex flex-col md:flex-row items-center md:items-start gap-6"
            >
              {/* Left side: name & description */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">{novel.name}</h3>
                <p className="text-lg text-gray-700">{novel.description}</p>
                <p className="text-lg text-gray-700"><b>{novel.views}</b></p>
                
              </div>

              {/* Right side: image */}
              <div className="w-40 h-40 md:w-60 md:h-60">
                <img
                  src={novel.image}
                  alt={novel.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
