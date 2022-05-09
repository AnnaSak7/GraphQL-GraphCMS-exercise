import { gql, GraphQLClient } from "graphql-request";

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
  return <div>Hello</div>;
}
