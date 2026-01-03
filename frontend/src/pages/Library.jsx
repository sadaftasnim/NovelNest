import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [realStories, setRealStories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch real stories from backend
  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/stories");
        const data = await res.json();
        const storiesData = Array.isArray(data) ? data : data.stories || [];
        setRealStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
      setLoading(false);
    };
    fetchStories();
  }, []);

  // Merging and Filtering Logic
  const getNovelsForGenre = (genre) => {
    // Start with hardcoded (sample) ones
    const sampleNovels = (novelsData[genre] || []).map((n) => ({
      ...n,
      id: `sample-${n.name}`,
      isReal: false,
    }));

    // Add real ones from database
    const dynamicNovels = realStories
      .filter((s) => s.genre === genre)
      .map((s) => {
        // Fallback between 'image' and 'coverImage', ignoring empty strings
        let imgSource = (s.image && s.image.trim() !== "") ? s.image :
          (s.coverImage && s.coverImage.trim() !== "") ? s.coverImage : "";

        let imagePath = imgSource || "https://via.placeholder.com/300x450?text=No+Cover";

        // If it's a simple filename (no http and doesn't start with /), assume it's in /images/
        if (imagePath && !imagePath.startsWith("http") && !imagePath.startsWith("/")) {
          imagePath = `/images/${imagePath}`;
        }

        return {
          id: s._id,
          name: s.title,
          description: s.description,
          views: `${s.views || 0} Views`,
          image: imagePath,
          isReal: true,
          author: s.author,
        };
      });

    return [...dynamicNovels, ...sampleNovels];
  };

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
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-10">
      <h1 className="text-4xl font-black text-center mb-12 text-slate-800 tracking-tight">
        Explore Library
      </h1>

      {!selectedGenre ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center"
              onClick={() => setSelectedGenre(genre)}
            >
              <h2 className="text-xl font-bold text-center text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                {genre}
              </h2>
              <div className="mt-4 flex justify-center">
                <div className="w-10 h-1 bg-blue-100 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <button
                className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition"
                onClick={() => setSelectedGenre(null)}
              >
                ← Back to Genres
              </button>
              <h2 className="text-4xl font-black mt-4 text-slate-800">
                {selectedGenre} Collection
              </h2>
            </div>
            {loading && (
              <span className="text-blue-600 font-bold animate-pulse">
                Syncing Library...
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8">
            {getNovelsForGenre(selectedGenre).length > 0 ? (
              getNovelsForGenre(selectedGenre).map((novel) => (
                <div
                  key={novel.id}
                  className="bg-white p-0 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Part */}
                  <div className="w-full md:w-56 lg:w-64 h-72 md:h-auto overflow-hidden bg-slate-100 flex-shrink-0 border-r border-gray-50 flex items-center justify-center">
                    <img
                      src={novel.image}
                      alt={novel.name}
                      className="w-full h-full object-cover min-h-[250px]"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=No+Cover" }}
                    />
                  </div>

                  {/* Content Part */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {selectedGenre}
                        </span>
                        {novel.isReal && (
                          <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                            Database Entry
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-2">
                        {novel.name}
                      </h3>
                      {novel.author && (
                        <p className="text-slate-500 font-medium mb-4 italic">
                          by {novel.author}
                        </p>
                      )}
                      <p className="text-slate-600 leading-relaxed font-medium line-clamp-3 md:line-clamp-4">
                        {novel.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Popularity
                          </span>
                          <span className="text-lg font-black text-slate-700">
                            {novel.views}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/novel/${novel.id}`)}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-100 transition-all">
                        Read Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-slate-400 text-xl font-medium">
                  No stories found in this genre yet.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
