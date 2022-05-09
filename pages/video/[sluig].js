import { graphql } from "graphql";
import { gql, GraphQLClient } from "graphql-request";
export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const pageSlug = pageContext.query.sluig;
  const graphqlClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GQL_TOKEN}`,
    },
  });

  const query = gql`
      query($pageSlug: String!) {
        video(where: {
          slug:$pageSlug
        }){
          createdAt
          id,
          title,
          description,
          seen,
          slug,
          tags,
          thumbnail {
            url
          },
          mp4{
            url
          }
        }
      }
    
      const data = await graphqlClient.request(query);
      const videos = data.videos;
      return {
        props: {
          videos,
        },
      };
      `;
  const variables = {
    pageSlug,
  };

  const data = await graphqlClient.request(query, variables);
  const vide = data.Video;

  return {
    props: {
      video,
    },
  };
};

const Video = ({ video }) => {
  console.log(video);
  return <></>;
};

export default Video;
