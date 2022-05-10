import { gql, GraphQLClient } from "graphql-request";
import Navbar from "../components/Navbar";
import Section from "../components/Section";

const url = process.env.ENDPOINT;

export const getStaticProps = async () => {
  const graphqlClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GQL_TOKEN}`,
    },
  });

  const query = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const data = await graphqlClient.request(query);
  const videos = data.videos;
  return {
    props: {
      videos,
    },
  };
};
export default function Home({ videos }) {
  console.log(videos);

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const useSeenVideos = (videos) => {
    return videos.filter(
      (video) => video.seen === false || video.seen === null
    );
  };

  return (
    <>
      <Navbar />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>

        <div className="video-feed">
          <Section
            genre={"Recommended for you"}
            videos={useSeenVideos(videos)}
          />
          <Section genre={"Family"} videos={filterVideos(videos, "Family")} />
          <Section genre={"Drama"} videos={filterVideos(videos, "Drama")} />
          <Section genre={"Crime"} videos={filterVideos(videos, "Crime")} />
          <Section genre={"Action"} videos={filterVideos(videos, "Action")} />
          <Section
            genre={"Adventure"}
            videos={filterVideos(videos, "Adventure")}
          />
          <Section
            genre={"Animation"}
            videos={filterVideos(videos, "Animation")}
          />
          <Section genre={"Classic"} videos={filterVideos(videos, "Classic")} />
          <Section genre={"Disney"} videos={filterVideos(videos, "Disney")} />
        </div>
      </div>
    </>
  );
}
