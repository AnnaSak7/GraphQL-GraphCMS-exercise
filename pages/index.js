import { gql, GraphQLClient } from "graphql-request";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import Image from "next/Image";
import disneyLogo from "../public/disney0.png";
import ghibliLogo from "../public/ghibli.png";
import marvelLogo from "../public/marvel.png";
import starwarsLogo from "../public/starwars.png";
import pixarLogo from "../public/pixar.png";

const url = process.env.ENDPOINT;

export const getStaticProps = async () => {
  const graphqlClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GQL_TOKEN}`,
    },
  });

  const videoQuery = gql`
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

  const accountQuery = gql`
    query {
      account(where: { id: "cl2z2fdyaigb80btc846b1xjp" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await graphqlClient.request(videoQuery);
  const videos = data.videos;
  const accountData = await graphqlClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account,
    },
  };
};
export default function Home({ videos, account }) {
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
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>

        <div className="video-feed">
          <Link href="#disney">
            <div className="franchise" id="disney">
              <Image src={disneyLogo} />
            </div>
          </Link>
          <Link href="#pixar">
            <div className="franchise" id="pixar">
              <Image src={pixarLogo} />
            </div>
          </Link>
          <Link href="#star-wars">
            <div className="franchise" id="star-wars">
              <Image src={starwarsLogo} />
            </div>
          </Link>
          <Link href="#marvel">
            <div className="franchise" id="marvel">
              <Image src={marvelLogo} />
            </div>
          </Link>
          <Link href="#animation">
            <div className="franchise" id="ghibli">
              <Image src={ghibliLogo} over />
            </div>
          </Link>
        </div>
        <Section genre={"Recommended for you"} videos={useSeenVideos(videos)} />
        <Section genre={"Family"} videos={filterVideos(videos, "Family")} />
        <Section genre={"Drama"} videos={filterVideos(videos, "Drama")} />
        <Section
          id="star-wars"
          genre={"Crime"}
          videos={filterVideos(videos, "Crime")}
        />
        <Section
          id="pixar"
          genre={"Action"}
          videos={filterVideos(videos, "Action")}
        />
        <Section
          id="marvel"
          genre={"Adventure"}
          videos={filterVideos(videos, "Adventure")}
        />
        <Section
          id="animation"
          genre={"Animation"}
          videos={filterVideos(videos, "Animation")}
        />
        <Section genre={"Classic"} videos={filterVideos(videos, "Classic")} />
        <Section
          id="disney"
          genre={"Disney"}
          videos={filterVideos(videos, "Disney")}
        />
      </div>
    </>
  );
}
