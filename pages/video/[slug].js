import { graphql } from "graphql";
import { gql, GraphQLClient } from "graphql-request";
import Link from "next/link";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;

  const graphqlClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GQL_TOKEN}`,
    },
  });

  const pageSlug = pageContext.query.slug;
  console.log(pageSlug);

  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
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

  const variables = {
    pageSlug,
  };

  const data = await graphqlClient.request(query, variables);
  const video = data.video;

  return {
    props: {
      video,
    },
  };
};

const Video = ({ video }) => {
  console.log(video);
  return (
    <>
      <img
        className="video-image"
        src={video.thumbnail.url}
        alt={video.title}
      />
      <div className="info">
        <p>{video.tags.join(", ")}</p>
        <p>{video.description}</p>
        <Link href="/">
          <p>Go Back</p>
        </Link>
        <button className="video-overlay">PLAY</button>
      </div>
    </>
  );
};

export default Video;
